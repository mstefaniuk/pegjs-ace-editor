define({"type": "grammar", "initializer": null, "rules": [
  {"type": "rule", "name": "grammar", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "rule_ref", "name": "__"},
    {"type": "labeled", "label": "initializer", "expression": {"type": "optional", "expression": {"type": "rule_ref", "name": "initializer"}}},
    {"type": "labeled", "label": "rules", "expression": {"type": "one_or_more", "expression": {"type": "rule_ref", "name": "rule"}}}
  ]}, "code": "\r\n      return {\r\n        type:        \"grammar\",\r\n        initializer: initializer,\r\n        rules:       rules\r\n      };\r\n    "}},
  {"type": "rule", "name": "initializer", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "labeled", "label": "code", "expression": {"type": "rule_ref", "name": "action"}},
    {"type": "optional", "expression": {"type": "rule_ref", "name": "semicolon"}}
  ]}, "code": "\r\n      return {\r\n        type: \"initializer\",\r\n        code: code\r\n      };\r\n    "}},
  {"type": "rule", "name": "rule", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "labeled", "label": "name", "expression": {"type": "rule_ref", "name": "identifier"}},
    {"type": "labeled", "label": "displayName", "expression": {"type": "optional", "expression": {"type": "rule_ref", "name": "string"}}},
    {"type": "rule_ref", "name": "equals"},
    {"type": "labeled", "label": "expression", "expression": {"type": "rule_ref", "name": "expression"}},
    {"type": "optional", "expression": {"type": "rule_ref", "name": "semicolon"}}
  ]}, "code": "\r\n      return {\r\n        type:        \"rule\",\r\n        name:        name,\r\n        expression:  displayName !== null\r\n          ? {\r\n              type:       \"named\",\r\n              name:       displayName,\r\n              expression: expression\r\n            }\r\n          : expression\r\n      };\r\n    "}},
  {"type": "rule", "name": "expression", "expression": {"type": "rule_ref", "name": "choice"}},
  {"type": "rule", "name": "choice", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "labeled", "label": "head", "expression": {"type": "rule_ref", "name": "sequence"}},
    {"type": "labeled", "label": "tail", "expression": {"type": "zero_or_more", "expression": {"type": "sequence", "elements": [
      {"type": "rule_ref", "name": "slash"},
      {"type": "rule_ref", "name": "sequence"}
    ]}}}
  ]}, "code": "\r\n      if (tail.length > 0) {\r\n        var alternatives = [head].concat(utils.map(\r\n            tail,\r\n            function(element) { return element[1]; }\r\n        ));\r\n        return {\r\n          type:         \"choice\",\r\n          alternatives: alternatives\r\n        };\r\n      } else {\r\n        return head;\r\n      }\r\n    "}},
  {"type": "rule", "name": "sequence", "expression": {"type": "choice", "alternatives": [
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "labeled", "label": "elements", "expression": {"type": "zero_or_more", "expression": {"type": "rule_ref", "name": "labeled"}}},
      {"type": "labeled", "label": "code", "expression": {"type": "rule_ref", "name": "action"}}
    ]}, "code": "\r\n      var expression = elements.length !== 1\r\n        ? {\r\n            type:     \"sequence\",\r\n            elements: elements\r\n          }\r\n        : elements[0];\r\n      return {\r\n        type:       \"action\",\r\n        expression: expression,\r\n        code:       code\r\n      };\r\n    "},
    {"type": "action", "expression": {"type": "labeled", "label": "elements", "expression": {"type": "zero_or_more", "expression": {"type": "rule_ref", "name": "labeled"}}}, "code": "\r\n      return elements.length !== 1\r\n        ? {\r\n            type:     \"sequence\",\r\n            elements: elements\r\n          }\r\n        : elements[0];\r\n    "}
  ]}},
  {"type": "rule", "name": "labeled", "expression": {"type": "choice", "alternatives": [
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "labeled", "label": "label", "expression": {"type": "rule_ref", "name": "identifier"}},
      {"type": "rule_ref", "name": "colon"},
      {"type": "labeled", "label": "expression", "expression": {"type": "rule_ref", "name": "prefixed"}}
    ]}, "code": "\r\n      return {\r\n        type:       \"labeled\",\r\n        label:      label,\r\n        expression: expression\r\n      };\r\n    "},
    {"type": "rule_ref", "name": "prefixed"}
  ]}},
  {"type": "rule", "name": "prefixed", "expression": {"type": "choice", "alternatives": [
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "rule_ref", "name": "dollar"},
      {"type": "labeled", "label": "expression", "expression": {"type": "rule_ref", "name": "suffixed"}}
    ]}, "code": "\r\n      return {\r\n        type:       \"text\",\r\n        expression: expression\r\n      };\r\n    "},
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "rule_ref", "name": "and"},
      {"type": "labeled", "label": "code", "expression": {"type": "rule_ref", "name": "action"}}
    ]}, "code": "\r\n      return {\r\n        type: \"semantic_and\",\r\n        code: code\r\n      };\r\n    "},
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "rule_ref", "name": "and"},
      {"type": "labeled", "label": "expression", "expression": {"type": "rule_ref", "name": "suffixed"}}
    ]}, "code": "\r\n      return {\r\n        type:       \"simple_and\",\r\n        expression: expression\r\n      };\r\n    "},
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "rule_ref", "name": "not"},
      {"type": "labeled", "label": "code", "expression": {"type": "rule_ref", "name": "action"}}
    ]}, "code": "\r\n      return {\r\n        type: \"semantic_not\",\r\n        code: code\r\n      };\r\n    "},
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "rule_ref", "name": "not"},
      {"type": "labeled", "label": "expression", "expression": {"type": "rule_ref", "name": "suffixed"}}
    ]}, "code": "\r\n      return {\r\n        type:       \"simple_not\",\r\n        expression: expression\r\n      };\r\n    "},
    {"type": "rule_ref", "name": "suffixed"}
  ]}},
  {"type": "rule", "name": "suffixed", "expression": {"type": "choice", "alternatives": [
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "labeled", "label": "expression", "expression": {"type": "rule_ref", "name": "primary"}},
      {"type": "rule_ref", "name": "question"}
    ]}, "code": "\r\n      return {\r\n        type:       \"optional\",\r\n        expression: expression\r\n      };\r\n    "},
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "labeled", "label": "expression", "expression": {"type": "rule_ref", "name": "primary"}},
      {"type": "rule_ref", "name": "star"}
    ]}, "code": "\r\n      return {\r\n        type:       \"zero_or_more\",\r\n        expression: expression\r\n      };\r\n    "},
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "labeled", "label": "expression", "expression": {"type": "rule_ref", "name": "primary"}},
      {"type": "rule_ref", "name": "plus"}
    ]}, "code": "\r\n      return {\r\n        type:       \"one_or_more\",\r\n        expression: expression\r\n      };\r\n    "},
    {"type": "rule_ref", "name": "primary"}
  ]}},
  {"type": "rule", "name": "primary", "expression": {"type": "choice", "alternatives": [
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "labeled", "label": "name", "expression": {"type": "rule_ref", "name": "identifier"}},
      {"type": "simple_not", "expression": {"type": "sequence", "elements": [
        {"type": "optional", "expression": {"type": "rule_ref", "name": "string"}},
        {"type": "rule_ref", "name": "equals"}
      ]}}
    ]}, "code": "\r\n      return {\r\n        type: \"rule_ref\",\r\n        name: name\r\n      };\r\n    "},
    {"type": "rule_ref", "name": "literal"},
    {"type": "rule_ref", "name": "class"},
    {"type": "action", "expression": {"type": "rule_ref", "name": "dot"}, "code": " return { type: \"any\" }; "},
    {"type": "action", "expression": {"type": "sequence", "elements": [
      {"type": "rule_ref", "name": "lparen"},
      {"type": "labeled", "label": "expression", "expression": {"type": "rule_ref", "name": "expression"}},
      {"type": "rule_ref", "name": "rparen"}
    ]}, "code": " return expression; "}
  ]}},
  {"type": "rule", "name": "action", "expression": {"type": "named", "name": "action", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "labeled", "label": "braced", "expression": {"type": "rule_ref", "name": "braced"}},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return braced.substr(1, braced.length - 2); "}}},
  {"type": "rule", "name": "braced", "expression": {"type": "text", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "{", "ignoreCase": false},
    {"type": "zero_or_more", "expression": {"type": "choice", "alternatives": [
      {"type": "rule_ref", "name": "braced"},
      {"type": "rule_ref", "name": "nonBraceCharacters"}
    ]}},
    {"type": "literal", "value": "}", "ignoreCase": false}
  ]}}},
  {"type": "rule", "name": "nonBraceCharacters", "expression": {"type": "one_or_more", "expression": {"type": "rule_ref", "name": "nonBraceCharacter"}}},
  {"type": "rule", "name": "nonBraceCharacter", "expression": {"type": "class", "parts": ["{", "}"], "rawText": "[^{}]", "inverted": true, "ignoreCase": false}},
  {"type": "rule", "name": "equals", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "=", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \"=\"; "}},
  {"type": "rule", "name": "colon", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": ":", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \":\"; "}},
  {"type": "rule", "name": "semicolon", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": ";", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \";\"; "}},
  {"type": "rule", "name": "slash", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "/", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \"/\"; "}},
  {"type": "rule", "name": "and", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "&", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \"&\"; "}},
  {"type": "rule", "name": "not", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "!", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \"!\"; "}},
  {"type": "rule", "name": "dollar", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "$", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \"$\"; "}},
  {"type": "rule", "name": "question", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "?", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \"?\"; "}},
  {"type": "rule", "name": "star", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "*", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \"*\"; "}},
  {"type": "rule", "name": "plus", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "+", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \"+\"; "}},
  {"type": "rule", "name": "lparen", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "(", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \"(\"; "}},
  {"type": "rule", "name": "rparen", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": ")", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \")\"; "}},
  {"type": "rule", "name": "dot", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": ".", "ignoreCase": false},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return \".\"; "}},
  {"type": "rule", "name": "identifier", "expression": {"type": "named", "name": "identifier", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "labeled", "label": "chars", "expression": {"type": "text", "expression": {"type": "sequence", "elements": [
      {"type": "choice", "alternatives": [
        {"type": "rule_ref", "name": "letter"},
        {"type": "literal", "value": "_", "ignoreCase": false}
      ]},
      {"type": "zero_or_more", "expression": {"type": "choice", "alternatives": [
        {"type": "rule_ref", "name": "letter"},
        {"type": "rule_ref", "name": "digit"},
        {"type": "literal", "value": "_", "ignoreCase": false}
      ]}}
    ]}}},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return chars; "}}},
  {"type": "rule", "name": "literal", "expression": {"type": "named", "name": "literal", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "labeled", "label": "value", "expression": {"type": "choice", "alternatives": [
      {"type": "rule_ref", "name": "doubleQuotedString"},
      {"type": "rule_ref", "name": "singleQuotedString"}
    ]}},
    {"type": "labeled", "label": "flags", "expression": {"type": "optional", "expression": {"type": "literal", "value": "i", "ignoreCase": false}}},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": "\r\n      return {\r\n        type:       \"literal\",\r\n        value:      value,\r\n        ignoreCase: flags === \"i\"\r\n      };\r\n    "}}},
  {"type": "rule", "name": "string", "expression": {"type": "named", "name": "string", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "labeled", "label": "string", "expression": {"type": "choice", "alternatives": [
      {"type": "rule_ref", "name": "doubleQuotedString"},
      {"type": "rule_ref", "name": "singleQuotedString"}
    ]}},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": " return string; "}}},
  {"type": "rule", "name": "doubleQuotedString", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "\"", "ignoreCase": false},
    {"type": "labeled", "label": "chars", "expression": {"type": "zero_or_more", "expression": {"type": "rule_ref", "name": "doubleQuotedCharacter"}}},
    {"type": "literal", "value": "\"", "ignoreCase": false}
  ]}, "code": " return chars.join(\"\"); "}},
  {"type": "rule", "name": "doubleQuotedCharacter", "expression": {"type": "choice", "alternatives": [
    {"type": "rule_ref", "name": "simpleDoubleQuotedCharacter"},
    {"type": "rule_ref", "name": "simpleEscapeSequence"},
    {"type": "rule_ref", "name": "zeroEscapeSequence"},
    {"type": "rule_ref", "name": "hexEscapeSequence"},
    {"type": "rule_ref", "name": "unicodeEscapeSequence"},
    {"type": "rule_ref", "name": "eolEscapeSequence"}
  ]}},
  {"type": "rule", "name": "simpleDoubleQuotedCharacter", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "simple_not", "expression": {"type": "choice", "alternatives": [
      {"type": "literal", "value": "\"", "ignoreCase": false},
      {"type": "literal", "value": "\\", "ignoreCase": false},
      {"type": "rule_ref", "name": "eolChar"}
    ]}},
    {"type": "labeled", "label": "char_", "expression": {"type": "any"}}
  ]}, "code": " return char_; "}},
  {"type": "rule", "name": "singleQuotedString", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "'", "ignoreCase": false},
    {"type": "labeled", "label": "chars", "expression": {"type": "zero_or_more", "expression": {"type": "rule_ref", "name": "singleQuotedCharacter"}}},
    {"type": "literal", "value": "'", "ignoreCase": false}
  ]}, "code": " return chars.join(\"\"); "}},
  {"type": "rule", "name": "singleQuotedCharacter", "expression": {"type": "choice", "alternatives": [
    {"type": "rule_ref", "name": "simpleSingleQuotedCharacter"},
    {"type": "rule_ref", "name": "simpleEscapeSequence"},
    {"type": "rule_ref", "name": "zeroEscapeSequence"},
    {"type": "rule_ref", "name": "hexEscapeSequence"},
    {"type": "rule_ref", "name": "unicodeEscapeSequence"},
    {"type": "rule_ref", "name": "eolEscapeSequence"}
  ]}},
  {"type": "rule", "name": "simpleSingleQuotedCharacter", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "simple_not", "expression": {"type": "choice", "alternatives": [
      {"type": "literal", "value": "'", "ignoreCase": false},
      {"type": "literal", "value": "\\", "ignoreCase": false},
      {"type": "rule_ref", "name": "eolChar"}
    ]}},
    {"type": "labeled", "label": "char_", "expression": {"type": "any"}}
  ]}, "code": " return char_; "}},
  {"type": "rule", "name": "class", "expression": {"type": "named", "name": "character class", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "[", "ignoreCase": false},
    {"type": "labeled", "label": "inverted", "expression": {"type": "optional", "expression": {"type": "literal", "value": "^", "ignoreCase": false}}},
    {"type": "labeled", "label": "parts", "expression": {"type": "zero_or_more", "expression": {"type": "choice", "alternatives": [
      {"type": "rule_ref", "name": "classCharacterRange"},
      {"type": "rule_ref", "name": "classCharacter"}
    ]}}},
    {"type": "literal", "value": "]", "ignoreCase": false},
    {"type": "labeled", "label": "flags", "expression": {"type": "optional", "expression": {"type": "literal", "value": "i", "ignoreCase": false}}},
    {"type": "rule_ref", "name": "__"}
  ]}, "code": "\r\n      var partsConverted = utils.map(parts, function(part) { return part.data; });\r\n      var rawText = \"[\"\r\n        + (inverted !== null ? inverted : \"\")\r\n        + utils.map(parts, function(part) { return part.rawText; }).join(\"\")\r\n        + \"]\"\r\n        + (flags !== null ? flags : \"\");\r\n\r\n      return {\r\n        type:       \"class\",\r\n        parts:      partsConverted,\r\n        // FIXME: Get the raw text from the input directly.\r\n        rawText:    rawText,\r\n        inverted:   inverted === \"^\",\r\n        ignoreCase: flags === \"i\"\r\n      };\r\n    "}}},
  {"type": "rule", "name": "classCharacterRange", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "labeled", "label": "begin", "expression": {"type": "rule_ref", "name": "classCharacter"}},
    {"type": "literal", "value": "-", "ignoreCase": false},
    {"type": "labeled", "label": "end", "expression": {"type": "rule_ref", "name": "classCharacter"}}
  ]}, "code": "\r\n      if (begin.data.charCodeAt(0) > end.data.charCodeAt(0)) {\r\n        error(\r\n          \"Invalid character range: \" + begin.rawText + \"-\" + end.rawText + \".\"\r\n        );\r\n      }\r\n\r\n      return {\r\n        data:    [begin.data, end.data],\r\n        // FIXME: Get the raw text from the input directly.\r\n        rawText: begin.rawText + \"-\" + end.rawText\r\n      };\r\n    "}},
  {"type": "rule", "name": "classCharacter", "expression": {"type": "action", "expression": {"type": "labeled", "label": "char_", "expression": {"type": "rule_ref", "name": "bracketDelimitedCharacter"}}, "code": "\r\n      return {\r\n        data:    char_,\r\n        // FIXME: Get the raw text from the input directly.\r\n        rawText: utils.quoteForRegexpClass(char_)\r\n      };\r\n    "}},
  {"type": "rule", "name": "bracketDelimitedCharacter", "expression": {"type": "choice", "alternatives": [
    {"type": "rule_ref", "name": "simpleBracketDelimitedCharacter"},
    {"type": "rule_ref", "name": "simpleEscapeSequence"},
    {"type": "rule_ref", "name": "zeroEscapeSequence"},
    {"type": "rule_ref", "name": "hexEscapeSequence"},
    {"type": "rule_ref", "name": "unicodeEscapeSequence"},
    {"type": "rule_ref", "name": "eolEscapeSequence"}
  ]}},
  {"type": "rule", "name": "simpleBracketDelimitedCharacter", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "simple_not", "expression": {"type": "choice", "alternatives": [
      {"type": "literal", "value": "]", "ignoreCase": false},
      {"type": "literal", "value": "\\", "ignoreCase": false},
      {"type": "rule_ref", "name": "eolChar"}
    ]}},
    {"type": "labeled", "label": "char_", "expression": {"type": "any"}}
  ]}, "code": " return char_; "}},
  {"type": "rule", "name": "simpleEscapeSequence", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "\\", "ignoreCase": false},
    {"type": "simple_not", "expression": {"type": "choice", "alternatives": [
      {"type": "rule_ref", "name": "digit"},
      {"type": "literal", "value": "x", "ignoreCase": false},
      {"type": "literal", "value": "u", "ignoreCase": false},
      {"type": "rule_ref", "name": "eolChar"}
    ]}},
    {"type": "labeled", "label": "char_", "expression": {"type": "any"}}
  ]}, "code": "\r\n      return char_\r\n        .replace(\"b\", \"\\b\")\r\n        .replace(\"f\", \"\\f\")\r\n        .replace(\"n\", \"\\n\")\r\n        .replace(\"r\", \"\\r\")\r\n        .replace(\"t\", \"\\t\")\r\n        .replace(\"v\", \"\\x0B\"); // IE does not recognize \"\\v\".\r\n    "}},
  {"type": "rule", "name": "zeroEscapeSequence", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "\\0", "ignoreCase": false},
    {"type": "simple_not", "expression": {"type": "rule_ref", "name": "digit"}}
  ]}, "code": " return \"\\x00\"; "}},
  {"type": "rule", "name": "hexEscapeSequence", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "\\x", "ignoreCase": false},
    {"type": "labeled", "label": "digits", "expression": {"type": "text", "expression": {"type": "sequence", "elements": [
      {"type": "rule_ref", "name": "hexDigit"},
      {"type": "rule_ref", "name": "hexDigit"}
    ]}}}
  ]}, "code": "\r\n      return String.fromCharCode(parseInt(digits, 16));\r\n    "}},
  {"type": "rule", "name": "unicodeEscapeSequence", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "\\u", "ignoreCase": false},
    {"type": "labeled", "label": "digits", "expression": {"type": "text", "expression": {"type": "sequence", "elements": [
      {"type": "rule_ref", "name": "hexDigit"},
      {"type": "rule_ref", "name": "hexDigit"},
      {"type": "rule_ref", "name": "hexDigit"},
      {"type": "rule_ref", "name": "hexDigit"}
    ]}}}
  ]}, "code": "\r\n      return String.fromCharCode(parseInt(digits, 16));\r\n    "}},
  {"type": "rule", "name": "eolEscapeSequence", "expression": {"type": "action", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "\\", "ignoreCase": false},
    {"type": "labeled", "label": "eol", "expression": {"type": "rule_ref", "name": "eol"}}
  ]}, "code": " return eol; "}},
  {"type": "rule", "name": "digit", "expression": {"type": "class", "parts": [
    ["0", "9"]
  ], "rawText": "[0-9]", "inverted": false, "ignoreCase": false}},
  {"type": "rule", "name": "hexDigit", "expression": {"type": "class", "parts": [
    ["0", "9"],
    ["a", "f"],
    ["A", "F"]
  ], "rawText": "[0-9a-fA-F]", "inverted": false, "ignoreCase": false}},
  {"type": "rule", "name": "letter", "expression": {"type": "choice", "alternatives": [
    {"type": "rule_ref", "name": "lowerCaseLetter"},
    {"type": "rule_ref", "name": "upperCaseLetter"}
  ]}},
  {"type": "rule", "name": "lowerCaseLetter", "expression": {"type": "class", "parts": [
    ["a", "z"]
  ], "rawText": "[a-z]", "inverted": false, "ignoreCase": false}},
  {"type": "rule", "name": "upperCaseLetter", "expression": {"type": "class", "parts": [
    ["A", "Z"]
  ], "rawText": "[A-Z]", "inverted": false, "ignoreCase": false}},
  {"type": "rule", "name": "__", "expression": {"type": "zero_or_more", "expression": {"type": "choice", "alternatives": [
    {"type": "rule_ref", "name": "whitespace"},
    {"type": "rule_ref", "name": "eol"},
    {"type": "rule_ref", "name": "comment"}
  ]}}},
  {"type": "rule", "name": "comment", "expression": {"type": "named", "name": "comment", "expression": {"type": "choice", "alternatives": [
    {"type": "rule_ref", "name": "singleLineComment"},
    {"type": "rule_ref", "name": "multiLineComment"}
  ]}}},
  {"type": "rule", "name": "singleLineComment", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "//", "ignoreCase": false},
    {"type": "zero_or_more", "expression": {"type": "sequence", "elements": [
      {"type": "simple_not", "expression": {"type": "rule_ref", "name": "eolChar"}},
      {"type": "any"}
    ]}}
  ]}},
  {"type": "rule", "name": "multiLineComment", "expression": {"type": "sequence", "elements": [
    {"type": "literal", "value": "/*", "ignoreCase": false},
    {"type": "zero_or_more", "expression": {"type": "sequence", "elements": [
      {"type": "simple_not", "expression": {"type": "literal", "value": "*/", "ignoreCase": false}},
      {"type": "any"}
    ]}},
    {"type": "literal", "value": "*/", "ignoreCase": false}
  ]}},
  {"type": "rule", "name": "eol", "expression": {"type": "named", "name": "end of line", "expression": {"type": "choice", "alternatives": [
    {"type": "literal", "value": "\n", "ignoreCase": false},
    {"type": "literal", "value": "\r\n", "ignoreCase": false},
    {"type": "literal", "value": "\r", "ignoreCase": false},
    {"type": "literal", "value": "\u2028", "ignoreCase": false},
    {"type": "literal", "value": "\u2029", "ignoreCase": false}
  ]}}},
  {"type": "rule", "name": "eolChar", "expression": {"type": "class", "parts": ["\n", "\r", "\u2028", "\u2029"], "rawText": "[\\n\\r\\u2028\\u2029]", "inverted": false, "ignoreCase": false}},
  {"type": "rule", "name": "whitespace", "expression": {"type": "named", "name": "whitespace", "expression": {"type": "class", "parts": [" ", "\t", "\u000b", "\f", "\u00A0", "\uFEFF", "\u1680", "\u180E", ["\u2000", "\u200A"], "\u202F", "\u205F", "\u3000"], "rawText": "[ \\t\\x0B\\f\\xA0\\uFEFF\\u1680\\u180E\\u2000-\\u200A\\u202F\\u205F\\u3000]", "inverted": false, "ignoreCase": false}}}
]});