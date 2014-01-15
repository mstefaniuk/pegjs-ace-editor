define(['target/parser/pegjs.js', 'text!../../src/grammar/pegjs.pegjs'], function(pegjs, source){
  describe("Parser for editor", function() {
    it("should parse itself without error", function(){
      expect(function(){pegjs.parse(source)}).not.toThrow();
    });
    it("should return ast", function() {
      var ast = pegjs.parse(source);
//      expect
    });
  });
});