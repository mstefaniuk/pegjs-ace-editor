define(function (require, exports, module) {
  "use strict";

  var oop = require("ace/lib/oop");
  var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
  var JavaScriptHighlightRules = require("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules;

  var PegjsHighlightRules = function () {

    this.$rules = {

      'start': [
        {
          token: 'constant.language',
          regex: '[a-z][a-zA-Z]+'
        },
        {
          token: 'keyword.operator',
          regex: '[=/]',
          next : 'peg-rule'
        }
      ],

      'peg-rule': [
        {
          token: 'string',
          regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
        },
        {
          token: 'string',
          regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
        },
        {
          token: 'keyword.operator',
          regex: '^\\S*(?=[=/{(]|$)'
        },
        {
          token: 'variable',
          regex: '[a-z][a-zA-Z]+:'
        },
        {
          token: 'identifier',
          regex: '[a-z][a-zA-Z]+'
        },
        {
          token: 'string',
          regex: '\\[(?:(?:\\\\.)|(?:[^\\]\\\\]))*?\\]'
        },
        {
          token: 'keyword.operator',
          regex: '[+?*()/]'
        },
        {
          token: 'keyword.operator',
          regex: '{',
          next : 'js-start'
        }
      ]

    };

    for (var i in this.$rules) {
      this.$rules[ i ].unshift({
        token: 'comment',
        regex: '/\\*',
        next : 'comment'
      });
    }

    this.$rules.comment = [
      {
        token: 'comment',
        regex: '\\*/',
        next : 'start'
      },
      {
        token: 'comment',
        regex: '.'
      }
    ];

    this.embedRules(JavaScriptHighlightRules, 'js-', [
      { token: 'keyword', regex: '}', next: 'start' }
    ]);

  };

  oop.inherits(PegjsHighlightRules, TextHighlightRules);
  exports.PegjsHighlightRules = PegjsHighlightRules;

});
