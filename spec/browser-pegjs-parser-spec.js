define(['PEG', 'text!../../src/grammar/pegjs.pegjs', 'spec/ast/pegjs'],
  function(PEG, source, vanilla){

  beforeEach(function() {
    this.addMatchers(objectDiff.jasmine);
  });

  describe("Browser generates PEG.js parser", function() {
    xit("should compile without error", function() {
      expect(function(){PEG.buildParser(source, {output:'parser'})}).not.toThrow();
    });
    xit("generated parser should parse PEG.js grammar to the same AST", function() {
      var pegjs = PEG.buildParser(source, {output:'parser'});
      expect(pegjs.parse(source)).toEqual(vanilla);
    });
  });
});