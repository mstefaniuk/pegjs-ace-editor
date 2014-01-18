define(['pegjs', 'utils'], function (pegjs, utils) {

  function nop() {
  }

  function relaxRule(node) {
    if (options.pegace.relax[node.name]) {
      var expression = utils.clone(node.expression);
      node.expression = {
        type        : "choice",
        alternatives: [
          expression,
          {type     : "sequence",
            elements: [
              {type : "semantic_not",
                code: "return options.pegace.lax"},
              {type: "action"}
            ]
          }
        ]
      };
    }
    return node;
  }

  function relaxNode(node) {
  }

  function relax(ast) {
    utils.buildNodeVisitor({
      grammar     : nop,
      choice      : relaxNode,
      sequence    : relaxNode,
      action      : nop,
      semantic_not: nop,
      semantic_and: nop,
      rule        : relaxRule,
      named       : nop,
      labeled     : nop,
      text        : nop,
      simple_and  : nop,
      simple_not  : nop,
      optional    : nop,
      zero_or_more: nop,
      one_or_more : nop
    })(ast);
  };

  var plugin = {
    use: function (config, options) {
      config.passes.transform.unshift(relax);
    }
  };
  return {
    build: function (project) {
      var parser = pegjs.buildParser(
        project.grammar, {
          output : 'parser',
          plugins: [plugin],
          pegace : project.relax
        });
      return {
        parse: function (source) {
          parser.parse(source);
        }
      };
    }
  };
});