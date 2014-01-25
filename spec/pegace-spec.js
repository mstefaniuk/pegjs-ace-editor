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
          structure: {
            grammar: ['rules'],
            rule: ['expression'],
            named: ['expression'],
            choice: ["alternatives"],
            action: ['expression'],
            sequence: ["elements"],
            labeled: ['expression'],
            text: ['expression'],
            simple_and: ['expression'],
            simple_not: ['expression'],
            semantic_and: [],
            semantic_not: [],
            optional: ['expression'],
            zero_or_more: ['expression'],
            one_or_more: ['expression'],
            rule_ref: [],
            literal: [],
            "class": [],
            any: []
          },
          complete: {
            rule_ref: ["rule"]
          },
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