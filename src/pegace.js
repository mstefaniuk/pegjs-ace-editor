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

      function filterErrors(ast) {
        var errors = [];
        var filter = makeVisitor(project.structure, function(node){
          if (node.type == 'error') {
            errors.push(node);
          }
        });
        filter(ast);
        return errors;
      }

      return {
        parse: function (source) {
          parser.parse(source);
        },
        verify: function(source, nodes) {
          try {
            var ast  = parser.parse(source, {
              lax: true
            });
            return filterErrors(ast);
          } catch (e) {
            console.log(e);
          }
        },
        suggest: function(source, cursor) {
          try {
            parser.parse(source.substr(0,cursor));
          } catch (e) {
            if (e.offset==source.length) {
              var complete = this.verify(source, ['rule']);
            }
          }
        }
      };
    }
  };
});