import Polynomial from "../models/Polynomial";
import * as math from "mathjs";
import Fraction = mathjs.Fraction;

export default function rationalZeros(polynomial: Polynomial) {
    let potential = potentialZeros(polynomial);
    let actual = actualZeros(potential, polynomial);
    return {
        "potential_zeros": potential,
        "actual_zeros": actual
    }
}

export function potentialZeros(polynomial: Polynomial): Array<Fraction> {
    // factors of constant / leading coefficient
    let cons = factors(polynomial.getConstant());
    let leading = factors(polynomial.getLeadingCoefficient());
    let resultSet: Fraction[] = [];
    cons.forEach((numCons) => {
        leading.forEach((numLead) => {
            // let potZero = numCons / numLead;
            let potZero = math.fraction(numCons, numLead);
            let negPotZero = math.multiply(potZero, -1);
            pushDistinct(resultSet, potZero);
            pushDistinct(resultSet, negPotZero);
        });
    });
    return resultSet
}

export function actualZeros(potential: Array<Fraction>, polynomial: Polynomial): Array<Fraction> {
    let resultSet: Array<Fraction> = [];
    potential.forEach((potentialZero: Fraction) => {
        let toNumber = math.number(potentialZero as number);
        let res = polynomial.evaluate(toNumber as number);
        if (res === 0){
            pushDistinct(resultSet, potentialZero);
        }
    });
    return resultSet;
}

function factors(n) {
    let neg = n < 0 ? -1 : 1;
    n = Math.abs(n);

    let num_factors = [], i;
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
function pushDistinct(arr: Array<Fraction>, frac: Fraction){
    for(let i = 0; i < arr.length; i++){
        if(math.number(math.subtract(arr[i], frac) as number) === 0) // if these two fractions are the same
            return;
    }
    arr.push(frac);
}