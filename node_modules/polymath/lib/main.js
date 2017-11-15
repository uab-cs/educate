"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser/parser");
exports.parse = parser_1.default;
var descarte_1 = require("./modules/descarte");
exports.ruleOfSigns = descarte_1.default;
var reduce_1 = require("./modules/reduce");
exports.reduce = reduce_1.default;
var syntheticDivision_1 = require("./modules/syntheticDivision");
exports.syntheticDivide = syntheticDivision_1.default;
var zeros_1 = require("./modules/zeros");
exports.rationalZeroTest = zeros_1.default;
//# sourceMappingURL=main.js.map