define(['PEG', 'passes/relax'], function (PEG, relax) {

  var plugin = {
    use: function (config, options) {
      config.passes.transform.unshift(relax);
    }
  };

  return {
    build: function (project) {
      var parser = PEG.buildParser(
        project.grammar, {
          output: 'parser',
          plugins: [plugin],
          pegace: project.pegace
        });
      return {
        parse: function (source) {
          parser.parse(source);
        },
        verify: function(source) {
          var errors = [];
          try {
            parser.parse(source, {
              $ace: {
                lax: true,
                error: function(offset, text, string) {
                  var error = {pos: offset+text.indexOf(string), type: "test", string: string};
                  console.log(error);
                  errors.push(error);
                }
              }
            });
            return errors;
          } catch (e) {
            console.log(e);
          }
        }
      };
    }
  };
});