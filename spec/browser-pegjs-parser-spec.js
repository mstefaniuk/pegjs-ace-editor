define(['pegjs', 'text!../../src/grammar/pegjs.pegjs', 'spec/ast/vanilla'],
  function(PEG, source, vanilla){

  beforeEach(function() {
    this.addMatchers(objectDiff.jasmine);
  });

  describe("Browser generates PEG.js parser", function() {
    it("should compile without error", function() {
      expect(function(){PEG.buildParser(source, {output:'parser'})}).not.toThrow();
    });
    it("generated parser should parse PEG.js grammar to the same AST", function() {
      var pegjs = PEG.buildParser(source, {output:'parser'});
      expect(pegjs.parse(source)).toEqualProperties(vanilla);
    });
  });
});