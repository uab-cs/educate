import Polynomial from "../models/Polynomial";
import * as math from "mathjs";

export default function solve(polynomial: Polynomial): { plus: number, minus: number } {
    if(polynomial.highestDegree() !== 2)
        return null;
    if(polynomial.monomials.length !== 3)
        return null;

    let a = polynomial.getMonomialByDegree(2).coefficient;
    let b = polynomial.getMonomialByDegree(1).coefficient;
    let c = polynomial.getMonomialByDegree(0).coefficient;

    let plus = apply(a, b, c, math.add);
    let minus = apply(a, b, c, math.subtract);
    return { plus, minus }
}

function apply(a: number, b: number, c: number, method: Function){
    return math.divide(
        method(
            math.multiply(b, -1),
            math.sqrt(
                math.subtract(
                    math.square(b),
                    math.multiply(
                        4,
                        math.multiply(
                            a,
                            c
                        )
                    )
                )
            )
        ),
        math.multiply(
            2,
            a
        )
    );
}