define(['parser/pegjs', 'text!../../src/grammar/pegjs.pegjs', 'spec/ast/pegjs'],
  function(pegjs, source, vanilla){

  beforeEach(function() {
    this.addMatchers(objectDiff.jasmine);
  });

  describe("Node generated PEG.js parser", function() {
    it("should parse itself without error", function(){
      expect(function(){pegjs.parse(source)}).not.toThrow();
    });
    it("generated parser should parse PEG.js grammar to the same AST", function() {
      var ast = pegjs.parse(source);
      expect(ast).toEqualProperties(vanilla);
    });
  });
});