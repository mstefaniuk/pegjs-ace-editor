define(['utils','target/parser/pegjs.js'], function(utils, pegjs) {
  return function(ast, options) {

    function relax(node, relaxed) {
      // compile relaxing
      var laxed = pegjs.parse(relaxed,{startRule: "expression"});

      // handle relaxed alternative
      var expression = utils.clone(node.expression);
      node.expression = {
        type        : "choice",
        alternatives: [
          expression,
          {type     : "sequence",
            elements: [
              {type : "semantic_not",
                code: "return options.pegace.lax"},
              {type: "action",
                expression: laxed,
                code: "options.pegace.lib.error({pos:offset()})"}
            ]
          }
        ]
      };
    }

    if (options.pegace && options.pegace.relax) {
      utils.each(ast.rules, function(rule, i) {
        if (options.pegace.relax[rule.name]) {
          relax(rule, options.pegace.relax[rule.name]);
        }
      });
    }
    return ast;
  }
});