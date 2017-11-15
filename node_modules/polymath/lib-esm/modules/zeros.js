import * as math from "mathjs";
export default function rationalZeros(polynomial) {
    var potential = potentialZeros(polynomial);
    var actual = actualZeros(potential, polynomial);
    return {
        "potential_zeros": potential,
        "actual_zeros": actual
    };
}
export function potentialZeros(polynomial) {
    // factors of constant / leading coefficient
    var cons = factors(polynomial.getConstant());
    var leading = factors(polynomial.getLeadingCoefficient());
    var resultSet = [];
    cons.forEach(function (numCons) {
        leading.forEach(function (numLead) {
            // let potZero = numCons / numLead;
            var potZero = math.fraction(numCons, numLead);
            var negPotZero = math.multiply(potZero, -1);
            pushDistinct(resultSet, potZero);
            pushDistinct(resultSet, negPotZero);
        });
    });
    return resultSet;
}
export function actualZeros(potential, polynomial) {
    var resultSet = [];
    potential.forEach(function (potentialZero) {
        var toNumber = math.number(potentialZero);
        var res = polynomial.evaluate(toNumber);
        if (res === 0) {
            pushDistinct(resultSet, potentialZero);
        }
    });
    return resultSet;
}
function factors(n) {
    var neg = n < 0 ? -1 : 1;
    n = Math.abs(n);
    var num_factors = [], i;
    for (i = 1; i <= Math.floor(Math.sqrt(n)); i += 1)
        if (n % i === 0) {
            num_factors.push(i);
            if (n / i !== i)
                num_factors.push((n / i) * neg);
        }
    num_factors.sort(function (x, y) {
        return x - y;
    });
    return num_factors;
}
/*
    Look for the fraction we're about to add..
        If we see it, stop immediately and do nothing
        else, go ahead and add it
 */
function pushDistinct(arr, frac) {
    for (var i = 0; i < arr.length; i++) {
        if (math.number(math.subtract(arr[i], frac)) === 0)
            return;
    }
    arr.push(frac);
}
//# sourceMappingURL=zeros.js.map