define(['passes/relax', 'target/parser/pegjs.js', 'utils'], function (relax, pegjs, utils) {

  var grammar =
    "start = sentence+;" +
      "sentence = one two [;];" +
      "one = [a-z]+ [ ]+;" +
      "two = [0-9]+ [ ]*;";
  var ast = pegjs.parse(grammar);

  describe("Relax pass", function () {
    it("should leave AST intact when no relaxing option provided", function () {
      var east = pegjs.parse(grammar);
      expect(relax(east, {})).toEqualProperties(ast);
    });

    it("should modify AST according to provided rules", function () {
      var east = pegjs.parse(grammar);
      relax(east, {pegace: {relax: {sentence: "one string:$[^;]* [;]"}}});
      expect(east).not.toEqual(ast);
      expect(east.rules[0]).toEqual(ast.rules[0]);
      expect(east.rules[2]).toEqual(ast.rules[2]);
      expect(east.rules[3]).toEqual(ast.rules[3]);
      expect(east.rules[1]).toEqualProperties({
        type      : "rule",
        name      : "sentence",
        expression: {
          type        : "choice",
          alternatives: {
            0   : {   // original code
              type: "sequence", elements: {
                0   : {
                  type: "rule_ref", name: "one"
                }, 1: {
                  type: "rule_ref", name: "two"
                }, 2: {
                  type      : "class", parts: {
                    0: ";"
                  }, rawText: "[;]", inverted: false, ignoreCase: false
                }
              }
            }, 1: {   // relaxed rule with error registration
              type: "sequence", elements: {
                0   : {
                  type: "semantic_not", code: "return options.pegace.lax"
                }, 1: {
                  type   : "action", expression: {
                    type: "sequence", elements: {
                      0   : {
                        type: "rule_ref", name: "one"
                      }, 1: {
                        type: "labeled", label: "string", expression: {
                          type: "text", expression: {
                            type: "zero_or_more", expression: {
                              type      : "class", parts: {
                                0: ";"
                              }, rawText: "[^;]", inverted: true, ignoreCase: false
                            }
                          }
                        }
                      }, 2: {
                        type      : "class", parts: {
                          0: ";"
                        }, rawText: "[;]", inverted: false, ignoreCase: false
                      }
                    }
                  }, code: "options.pegace.lib.error({pos:offset()})"
                }
              }
            }
          }
        }
      });
    });
  });
});
