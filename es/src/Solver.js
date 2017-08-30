const math = require("mathjs");

class Functions {
    static isSameSign(integerOne, integerTwo){
        return ( (integerOne < 0) == (integerTwo < 0));
    }

    static factor(integer){
        integer = Math.abs(integer);
        if(integer === 1) return [1];
        let factors = [];
        for (let i = 1; i < integer; i++) {
            if(integer % i === 0){
                Functions.addDistinct(factors, i);
                Functions.addDistinct(factors, integer/i);
            }
        }
        return factors;
    }

    static addDistinct(array, number){
        if(!array.includes(number))
            array.push(number);
    }
}

/**
 * This is the only tutorial you need:
 * http://sites.csn.edu/istewart/Math126/zeros_theorem/zeros_theorem.htm
 */
module.exports = class Solver {

    potentialZeros(polynomial) {
        // (factors of constant)/(factors of leading coefficient)
        let numFactors = Functions.factor(polynomial.cons());
        let denFactors = Functions.factor(polynomial.leadingCo());
        let potZeros = [];
        for (let i = 0; i < numFactors.length; i++) {
            let num = numFactors[i] * 1.0;
            for(let j = 0; j < denFactors.length; j++){
                let den = denFactors[j] * 1.0;
                let frac = math.fraction(num, den);
                Functions.addDistinct(potZeros, frac);
            }
        }
        let negatives = potZeros.map(function(x) {
            return math.multiply(x, -1);
        });
        return potZeros.concat(negatives);
    }

    testZeros(polynomial, potentialZeros){
        let scope = {};
        let key = polynomial.mono(0).sym();
        let zeros = [];
        for (let i = 0; i < potentialZeros.length; i++) {
            let mathjsZero = potentialZeros[i];
            let zero = math.number(mathjsZero);
            scope[key] = mathjsZero;
            let mathjsRes = math.eval(polynomial.expression, scope);
            let res = math.number(mathjsRes);
            if(res === 0) Functions.addDistinct(zeros, mathjsZero);
        }
        return zeros;
    }

    // http://www.purplemath.com/modules/drofsign.htm
    maxPositiveZeros(polynomial){
        let max = 0;
        let last = polynomial.mono(0).co();
        for (let i = 1; i < polynomial.monomials.length; i++) {
            let current = polynomial.monomials[i].co();
            let isSame = Functions.isSameSign(last, current);
            if(!isSame) max++;
            last = current;
        }
        if(!Functions.isSameSign(last, polynomial.cons())) max++;
        return max;
    }

    // http://www.purplemath.com/modules/drofsign.htm
    maxNegativeZeros(polynomial){
        let max = 0;
        let last = polynomial.mono(0).co();
        // if it's an odd degree
        if(polynomial.mono(0).deg() % 2 !== 0) last *= -1;
        for (let i = 1; i < polynomial.monomials.length; i++) {
            let current = polynomial.monomials[i].co();
            if(polynomial.monomials[i].deg() % 2 !== 0) current *= -1;
            let isSame = Functions.isSameSign(last, current);
            if(!isSame) max++;
            last = current;
        }
        if(!Functions.isSameSign(last, polynomial.cons())) max++;
        return max;
    }

};