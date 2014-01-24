define(['pegace', 'text!../../src/grammar/pegjs.pegjs'], function (pegace, pegrammar) {
  describe("Pegace project", function() {
    it("should relax parser grammar with provided rules", function() {
      var eparser = pegace.build({
        grammar: "rule = command+; command = (a / b) ';'; a = 'aa'; b = 'bb'",
        options: {
          relax: {
            command: "$[^;]* [;]"  // skip any unknown command
          }
        }
      });
      expect(eparser.verify("aa;w;")).not.toEqual(undefined);
    });

    it("should relax original PEG.js grammar with fail-safe rule", function() {
      var epeg = pegace.build({
        grammar: pegrammar,
        options: {
          relax: {
            rule: "(!(identifier string? equals) .)+"
          }
        }
      })
    });
  });
});
