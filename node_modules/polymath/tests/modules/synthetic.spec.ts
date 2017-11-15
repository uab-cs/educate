import {expect} from 'chai';
import 'mocha';
import parse from "../../src/parser/parser";
import syntheticDivide from "../../src/modules/syntheticDivision";

describe("Synthetic Division", function(){
    it("Should perform synthetic division", function(){
        // http://www.mesacc.edu/~scotz47781/mat120/notes/divide_poly/synthetic/synthetic_division.html
        let polynomial = parse("x^3 - 5x^2 + 3x + 7");
        let root = 3;
        let result = syntheticDivide(polynomial, root);
        let expected = "x^2-2x-3";
        expect(result.polynomial.toLatex()).to.equal(expected);
    })
});