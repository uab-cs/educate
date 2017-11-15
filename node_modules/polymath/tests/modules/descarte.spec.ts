import {expect} from 'chai';
import 'mocha';
import parse from "../../src/parser/parser";
import ruleOfSigns from "../../src/modules/descarte";

describe("Descarte's Rule of Signs", function(){
    it("Should find maximum positive and negative zeros", function(){
        let polynomial = parse("x^5-x^4+3x^3+9x^2-x+5");
        let output = ruleOfSigns(polynomial);
        expect(output.max_positive).to.equal(4);
        expect(output.max_negative).to.equal(1);
    })
});