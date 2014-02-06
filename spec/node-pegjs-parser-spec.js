define(['parser/pegjs', 'text!../../src/grammar/pegjs.pegjs', 'spec/ast/pegjs'],
  function(pegjs, source, vanilla){

  beforeEach(function() {
    this.addMatchers(objectDiff.jasmine);
  });

  describe("Node generated PEG.js parser", function() {
    xit("should parse itself without error", function(){
      expect(function(){pegjs.parse(source)}).not.toThrow();
    });
    xit("generated parser should parse PEG.js grammar to the same AST", function() {
      var ast = pegjs.parse(source);
      expect(ast).toEqual(vanilla);
    });
  });
});