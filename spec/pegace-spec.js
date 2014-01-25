define(['pegace', 'text!../../src/grammar/pegjs.pegjs'], function (pegace, pegrammar) {
  describe("Pegace project", function() {
    xit("should relax parser grammar with provided rules", function() {
      var eparser = pegace.build({
        grammar: [
          "rule = c:command+ {return {type: rule, commands}}",
          "command = (a / b) ';'",
          "a = 'aa'",
          "b = 'bb'"].join("\n"),
        options: {
          relax: {
            command: "$[^;]* [;]"
          }
        }
      });
      expect(eparser.verify("aa;w;")).not.toEqual(undefined);
    });

    describe("should extend original PEG.js grammar with fail-safe rule", function() {
      var epeg;
      beforeEach(function() {
        epeg = pegace.build({
          grammar: pegrammar,
          options: {
            relax: {
              rule: "(!(identifier string? equals) .)+"
            }
          }
        });
      });

      it("should return list of errors", function() {
        var grammar = ['aa = bb { my wife is so pleased',
          'bb = "bb"',
          'cc = "cc"'].join("\n");
        expect(function(){epeg.verify(grammar)}).not.toThrow();
        expect(epeg.verify(grammar)).toEqual([{offset:8, on: "rule", text: "{ my wife is so pleased\n", type: "error"}]);
      });

      it("should return list of suggestions", function() {
        var grammar = ['aa = bb { my wife is so pleased',
          'bb = "bb"',
          'cc = "cc"'];

        grammar[1] = 'bb = ';
      });
    });
  });
});
