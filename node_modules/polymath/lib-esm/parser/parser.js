import * as pegParser from "./poly-grammar";
import Monomial from "../models/Monomial";
import Polynomial from "../models/Polynomial";
export default function parse(exp) {
    exp = exp.replace(/\s/g, '');
    var output = pegParser.parse(exp);
    var monomials = output.map(function (obj) {
        return new Monomial(obj.co, obj.deg);
    });
    return new Polynomial(monomials);
}
//# sourceMappingURL=parser.js.map