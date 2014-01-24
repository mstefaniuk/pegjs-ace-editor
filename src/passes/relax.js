define(['utils', 'parser/pegjs'], function (utils, pegjs) {
  return function (ast, options) {

    var added = [];

    function relax(node, relaxed) {
      // compile relaxing
      var name = "_lax_" + node.name;
      var lax = pegjs.parse(name + "=" + relaxed + " {return {type: 'error', on: '"+node.name+"', text: text(), offset: offset()}}", {startRule: "rule"});

      // handle relaxed alternative
      var expression = utils.clone(node.expression);
      node.expression = {
        type: "choice",
        alternatives: [
          expression,
          {type: "sequence",
            elements: [
              {type: "semantic_and",
                code: "return options.lax"},
              {type: "rule_ref",
                name: name}
            ]
          }
        ]
      };
      return lax;
    }

    if (options.pegace && options.pegace.relax) {
      utils.each(ast.rules, function (rule, i) {
        if (options.pegace.relax[rule.name]) {
          ast.rules.push(
            relax(rule, options.pegace.relax[rule.name])
          );
        }
      });
    }
    return ast ;
  }
});