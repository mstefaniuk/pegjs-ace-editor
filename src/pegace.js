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
          pegace: project.options
        });
      return {
        parse: function (source) {
          parser.parse(source);
        },
        verify: function(source) {
          var errors = [];
          try {
            parser.parse(source, {
              lax: true
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