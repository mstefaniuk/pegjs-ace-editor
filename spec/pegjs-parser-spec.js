define(['target/parser/pegjs.js', 'text!../../src/grammar/pegjs.pegjs', 'spec/ast/vanilla'], function(pegjs, source, vanilla){

  beforeEach(function() {
    this.addMatchers(objectDiff.jasmine);
  });

  describe("Parser for editor", function() {
    it("should parse itself without error", function(){
      expect(function(){pegjs.parse(source)}).not.toThrow();
    });
    it("should return ast", function() {
      var ast = pegjs.parse(source);
      expect(ast).toEqualProperties(vanilla);
    });
  });
});