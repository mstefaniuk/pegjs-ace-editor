define(['PEG', 'passes/relax','utils'], function (PEG, relax, utils) {

  var plugin = {
    use: function (config, options) {
      config.passes.transform.unshift(relax);
    }
  };

  function nop() {}
  function intoExpression(node) { gatherErrors(node.expression); }
  function intoSubnodes(propertyName) {
    return function(node) { utils.each(node[propertyName], gatherErrors); };
  }

  var errors;
  var gatherErrors = utils.buildNodeVisitor({
    grammar: intoSubnodes("rules"),
    rule: intoExpression,
    named: intoExpression,
    choice: intoSubnodes("alternatives"),
    action: intoExpression,
    sequence: intoSubnodes("elements"),
    labeled: intoExpression,
    text: intoExpression,
    simple_and: intoExpression,
    simple_not: intoExpression,
    semantic_and: nop,
    semantic_not: nop,
    optional: intoExpression,
    zero_or_more: intoExpression,
    one_or_more: intoExpression,
    rule_ref: nop,
    literal: nop,
    "class": nop,
    any: nop,
    error: function(node) {
      errors.push(node);
    }
  });

  return {
    build: function (project) {
      var parser = PEG.buildParser(
        project.grammar, {
          output: 'parser',
          plugins: [plugin],
          pegace: project.options
        });
      return {
        parse: function (source) {
          parser.parse(source);
        },
        verify: function(source) {
          errors = [];
          try {
            var ast  = parser.parse(source, {
              lax: true
            });
            gatherErrors(ast);
            return errors;
          } catch (e) {
            console.log(e);
          }
        }
      };
    }
  };
});