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
        "{$pegace = options.$pegace;console.log($pegace);}",
        "start = sentence+",
        "sentence = prone [;] / !{return $pegace.lax || false} _lax_sentence",
        "prone = [a-z]+",
        "_lax_sentence = string:$[^;]* [;] {$pegace.error(string)}"].join("\n"));
      relax(east, {pegace: {relax: {sentence: "string:$[^;]* [;]"}}});
      expect(east).toEqualProperties(ast);
    });
  });
});
