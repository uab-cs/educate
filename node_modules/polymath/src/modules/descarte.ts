import Polynomial from "../models/Polynomial";

export default function ruleOfSigns(polynomial: Polynomial){
    return {
        "max_positive": maxPositiveZeros(polynomial),
        "max_negative": maxNegativeZeros(polynomial)
    }
}

export function maxPositiveZeros(poly: Polynomial){
    return countSignChanges(poly);
}

export function maxNegativeZeros(poly: Polynomial){
    return countSignChanges(poly.negate());
}

function countSignChanges(polynomial: Polynomial){
    let changes = 0;
    let it = polynomial.getIterator();
    let last = it.next();
    while(it.hasNext()){
        let current = it.next();
        if(last.isPositive() !== current.isPositive()) changes++;
        last = current;
    }
    return changes;
}