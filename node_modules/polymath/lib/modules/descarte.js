"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ruleOfSigns(polynomial) {
    return {
        "max_positive": maxPositiveZeros(polynomial),
        "max_negative": maxNegativeZeros(polynomial)
    };
}
exports.default = ruleOfSigns;
function maxPositiveZeros(poly) {
    return countSignChanges(poly);
}
exports.maxPositiveZeros = maxPositiveZeros;
function maxNegativeZeros(poly) {
    return countSignChanges(poly.negate());
}
exports.maxNegativeZeros = maxNegativeZeros;
function countSignChanges(polynomial) {
    var changes = 0;
    var it = polynomial.getIterator();
    var last = it.next();
    while (it.hasNext()) {
        var current = it.next();
        if (last.isPositive() !== current.isPositive())
            changes++;
        last = current;
    }
    return changes;
}
//# sourceMappingURL=descarte.js.map