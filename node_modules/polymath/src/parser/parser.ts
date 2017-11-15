import * as pegParser from "./poly-grammar";
import Monomial from "../models/Monomial";
import Polynomial from "../models/Polynomial";

export default function parse(exp: string): Polynomial{
    exp = exp.replace(/\s/g,'');
    let output = pegParser.parse(exp);

    let monomials: Monomial[] = output.map((obj)=>{
        return new Monomial(obj.co, obj.deg);
    });

    return new Polynomial(monomials);
}