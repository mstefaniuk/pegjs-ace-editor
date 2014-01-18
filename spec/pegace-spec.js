define(['pegace'], function (pegace) {
  describe("Pegace project", function() {
    it("should handle parser grammar", function() {
      expect(pegace.build({
        grammar: "rule = command+; command = (a / b) ';'; a = 'aa'; b = 'bb'",
        relax: {
          command: "[^;]+ ';'"  // skip any unknown command
        }
      })).not.toEqual(undefined);
    });
  });
});
