define(['passes/relax', 'parser/pegjs', 'utils'], function (relax, pegjs, utils) {

  var grammar = [
    "start = sentence+",
    "sentence = prone [;]",
    "prone = [a-z]+"].join("\n");

  describe("Relax pass", function () {
    it("should leave AST intact when no relaxing option provided", function () {
      var east = pegjs.parse(grammar);
      var ast = pegjs.parse(grammar);
      expect(relax(east, {})).toEqualProperties(ast);
    });

    it("should modify AST according to provided rules", function () {
      var east = pegjs.parse(grammar);
      var ast = pegjs.parse([
        "start = sentence+",
        "sentence = prone [;] / _lax_sentence",
        "prone = [a-z]+",
        "_lax_sentence = &{return options.lax} $[^;]* [;] {return {type: 'error', on: 'sentence', text: text(), offset: offset()}}"].join("\n"));
      relax(east, {pegace: {relax: {sentence: "$[^;]* [;]"}}});
      expect(east).toEqualProperties(ast);
    });
  });
});
