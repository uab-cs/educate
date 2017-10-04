angular.module("app")
.factory("solverService", function(){
    return new Solver();
});

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
    static addDistinctFraction(array, fraction){
        let exists = false;
        array.forEach((_frac)=>{
            if(math.number(_frac) === math.number(fraction)) exists = true;
        });
        if(!exists) array.push(fraction);
    }
}

class Solver {

    constructor(math){
        this.math = math;
    }

    /**
     * returns array of potential zeros as mathjs Fractions
     * @param polynomial Polynomial
     * @returns Fraction[]
     */
    potentialZeros(polynomial) {
        // (factors of constant)/(factors of leading coefficient)
        let constFactors = Functions.factor(polynomial.cons());
        let leadingCoFactors = Functions.factor(polynomial.leadingCo());
        let potentialZeros = [];
        for (let i = 0; i < constFactors.length; i++) {
            let num = constFactors[i] * 1.0;
            for(let j = 0; j < leadingCoFactors.length; j++){
                let den = leadingCoFactors[j] * 1.0;
                Functions.addDistinct(potentialZeros, math.fraction(num, den));
            }
        }
        let negatives = potentialZeros.map(function(x) {
            return math.multiply(x, -1);
        });
        return potentialZeros.concat(negatives);
    }

    /**
     * Takes a polynomial and an array of potential zeros.
     * Returns a list of rational zeros
     * @param polynomial Polynomial
     * @param potentialZeros Fraction[]
     * @return Fraction[]
     */
    testZeros(polynomial, potentialZeros){
        let evalScope = {};
        let symbol = polynomial.sym();

        let foundZeros = [];
        for (let i = 0; i < potentialZeros.length; i++) {
            let zero = potentialZeros[i];
            // evaluate the polynomial expression against symbol using potential zero
            evalScope[symbol] = zero;
            let result = math.eval(polynomial.expression, evalScope);
            if(math.number(result) === 0) Functions.addDistinctFraction(foundZeros, zero);
        }
        return foundZeros;
    }

    syntheticDivide(polynomial, linearFactor){
        // TODO: learn synthetic division...
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

    getFactoredExpression(polynomial, zeros){
        let output = "";
        for (let i = 0; i < zeros.length; i++) {
            let zero = zeros[i];
            output += this.getLinearFactorExpression(zero);
        }
        if(polynomial.mono(0).co() !== 1){
            output = polynomial.mono(0).co() + output;
        }
        return output;
    }

    getFactoredTex(polynomial, zeros){
        let node = math.parse(this.getFactoredExpression(polynomial, zeros));
        return node.toTex();
    }

    getLinearFactorExpression(zero){
        let sign = (zero.s === -1) ? "+" : "-";
        let _fraction = zero.n+"/"+zero.d;
        if(zero.n/zero.d % 1 === 0) _fraction = zero.n/zero.d;
        return `(x ${sign} ${_fraction})`;
    }

    fractionToString(fraction){
        let _sign = (fraction.s === -1) ? "+" : "-";
        let _fraction = fraction.n+"/"+fraction.d;
        if(fraction.n/fraction.d % 1 === 0) _fraction = fraction.n/fraction.d;
        return _sign + " " + _fraction;
    }
}