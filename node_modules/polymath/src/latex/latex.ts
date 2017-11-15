import Fraction = mathjs.Fraction;
import * as _ from "lodash";
import Polynomial from "../models/Polynomial";


export const latex = {
    from: {
        polynomial: polynomialToLatex
    }
};

function polynomialToLatex(polynomial: Polynomial){
    polynomial.sortMonomials();

    let sym = "x";
    let output = "";

    polynomial.monomials.forEach((monomial)=>{
        let sign = (monomial.coefficient < 0)? "-" : "+";
        let co = Math.abs(monomial.coefficient);
        let deg = monomial.degree;

        if(monomial.degree >= 2)
            output += sign + co + "x^{" + deg + "}";
        if(monomial.degree === 1)
            output += sign + co + sym;
        if(monomial.degree === 0)
            output += sign + co;
    });

    if(output[0] === "+")
        output = output.slice(1);
    return output;
}