define(['PEG', 'passes/relax','utils'], function (PEG, relax, utils) {

  var plugin = {
    use: function (config, options) {
      config.passes.transform.unshift(relax);
    }
  };

  function makeVisitor(structure, visiting) {
    function factory(definition) {
      if (definition.length==0) {
        return visiting;
      } else {
        return function(node) {
          visiting(node);
          definition.forEach(function(d){
            if (Array.isArray(node[d])) {
              node[d].forEach(visitor);
            } else {
              visitor(node[d]);
            }
          });
        }
      }
    }
    var functions = {};
    Object.keys(structure).map(function(e){
      functions[e] = factory(structure[e]);
    });
    functions['error'] = factory([]);
    var visitor = utils.buildNodeVisitor(functions);
    return visitor;
  }

  return {
    build: function (project) {
      var parser = PEG.buildParser(
        project.grammar, {
          output: 'parser',
          plugins: [plugin],
          pegace: project.options
        });

      function filterNodes(ast, nodes) {
        var result = [];
        var filter = makeVisitor(project.structure, function(node){
          if (nodes.indexOf(node.type) > -1) {
            result.push(node);
          }
        });
        filter(ast);
        return result;
      }

      return {
        parse: function (source) {
          parser.parse(source);
        },
        verify: function(source) {
          try {
            var ast  = parser.parse(source, {
              lax: true
            });
            return filterNodes(ast,['error']);
          } catch (e) {
            console.log(e);
          }
        },
        suggest: function(source, cursor) {
          try {
            parser.parse(source.substr(0, cursor) + '%');
          } catch (e) {
            if (e.offset == cursor) {
              var ast = parser.parse(source, {
                lax: true
              });
              var completions = [];
              e.expected.forEach(function(ex) {
                if (project.complete[ex.description]) {
                  Array.prototype.push.apply(completions,
                    filterNodes(ast, project.complete[ex.description]));
                }
              });
              return completions.map(function(k){
                return k.name
              });
            }
          }
        }
      };
    }
  };
});