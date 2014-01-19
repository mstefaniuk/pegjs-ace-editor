define(['pegace'], function (pegace) {
  describe("Pegace project", function() {
    it("should handle parser grammar", function() {
      var eparser = pegace.build({
        grammar: "rule = command+; command = (a / b) ';'; a = 'aa'; b = 'bb'",
        pegace: {
          relax: {
            command: "string:$[^;]* [;]"  // skip any unknown command
          }
        }
      });
      expect(eparser.verify("aa;w;")).not.toEqual(undefined);
    });
  });
});
