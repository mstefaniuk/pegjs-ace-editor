define(['utils', 'parser/pegjs'], function (utils, pegjs) {
  return function (ast, options) {

    var added = [];

    function relax(node, relaxed) {
      // compile relaxing
      var name = "_lax_" + node.name;
      var lax = pegjs.parse(name + "=" + relaxed + " {$pegace.error(string)}", {startRule: "rule"});

      // handle relaxed alternative
      var expression = utils.clone(node.expression);
      node.expression = {
        type: "choice",
        alternatives: [
          expression,
          {type: "sequence",
            elements: [
              {type: "semantic_not",
                code: "return $pegace.lax || false"},
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
      ast.initializer = {
        type: "initializer", code: "$pegace = options.$pegace;console.log($pegace);"
      };
    }
    return ast ;
  }
});