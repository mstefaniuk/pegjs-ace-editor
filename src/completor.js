define(['pegjs'], function(pegjs){
  return {
    check: function(source) {
      var result;
      try {
        result = pegjs.parse(source, {
          pegace:{
            mode: 'lax'
          }
        });
      } catch(e) {
        result = {
          clean: false,
          level: "fatal",
          exception: e,
          errors: [{
            pos: e.offset,
            type: "syntax",
            string: e.found
          }]
        }
      }
      return result;
    },
    parse: function(source) {
      return pegjs.parse(source, {
        pegace: {
          mode: 'strict'
        }
      });
    }
  };
});
