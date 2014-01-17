define(function (require, exports, module) {
  "use strict";

  var oop = require("ace/lib/oop");
  var TextMode = require("ace/mode/text").Mode;
  var Tokenizer = require("ace/tokenizer").Tokenizer;
  var PegjsHighlightRules = require("./pegjs_highlight_rules").PegjsHighlightRules;

  var Mode = function () {
    var highlighter = new PegjsHighlightRules();
    this.$tokenizer = new Tokenizer(highlighter.getRules());
  };
  oop.inherits(Mode, TextMode);

  (function () {
  }).call(Mode.prototype);

  exports.Mode = Mode;
});
