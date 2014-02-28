define(['pegace', 'text!../../src/grammar/pegjs.pegjs'], function (pegace, pegrammar) {
  describe("Pegace project", function() {
    it("should relax parser grammar with provided rules", function() {
      var eparser = pegace.build({
        grammar: [
          "rule = c:command+",
          "command = (a / b) ';'",
          "a = 'aa'",
          "b = 'bb'"].join("\n"),
        options: {
          relax: {
            command: "$[^;]* [;]"
          }
        }
      });
//      expect(eparser.verify("aa;w;")).not.toEqual(undefined);
    });

    xit("should factory the ace editor mode for grammar", function() {
      var eparser = pegace.build({
        grammar: [
          "rule = c:command+ {return {type: 'rule', commands: c}}",
          "command = c:(a / b) ';' {return {type:'command', command: c}}",
          "a = 'aa' {return {type:'a'}}",
          "b = 'bb' {return {type:'b'}}"].join("\n"),
        options: {
          editor: {
            command: "keyword"
          }
        }
      });
      expect(eparser.editor()).toEqual({
        start: [
          {
            token: "keyword",
            regex: "[aa]"
          },
          {
            token: "keyword",
            regex: "[bb]"
          }
        ]
      });
    });

    describe("built on original PEG.js grammar", function() {
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

      it("should return complete list of errors", function() {
        var grammar = ['aa = bb { my wife is so pleased',
          'bb = "bb"',
          'cc = "cc"'].join("\n");
        expect(function(){epeg.verify(grammar)}).not.toThrow();
        expect(epeg.verify(grammar)).toEqual([{offset:8, on: "rule", text: "{ my wife is so pleased\n", type: "error"}]);
      });

      it("should return list of suggestions", function() {
        var grammar = ['aa = bb',
          'bb = "bb"',
          'cc = "cc" { my wife is so pleased'];

        var expectations = epeg.suggest(grammar.join("\n"), grammar[0].length+5);
        expect(expectations).toEqual(['aa','bb','cc']);
      });
    });
  });
});