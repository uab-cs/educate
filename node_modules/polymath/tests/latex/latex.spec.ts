import {expect} from "chai";
import parse from "../../src/parser/parser";
import {latex} from "../../src/latex/latex";

describe("Latex Conversions", function(){
    it("Convert different expressions to latex", function(){
        let polynomial = parse("4x^3 + 6x^33 + 15x - 0");
        // console.log(latex.from.polynomial(polynomial));
    });
});

