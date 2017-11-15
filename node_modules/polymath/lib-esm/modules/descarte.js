export default function ruleOfSigns(polynomial) {
    return {
        "max_positive": maxPositiveZeros(polynomial),
        "max_negative": maxNegativeZeros(polynomial)
    };
}
export function maxPositiveZeros(poly) {
    return countSignChanges(poly);
}
export function maxNegativeZeros(poly) {
    return countSignChanges(poly.negate());
}
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