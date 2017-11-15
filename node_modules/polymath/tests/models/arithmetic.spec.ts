import {expect} from 'chai';
import 'mocha';
import parse from "../../src/parser/parser";

describe("Polynomial Arithmetic", function(){

    it("Add", function(){
        // http://www.purplemath.com/modules/polyadd.htm
        let lhs = parse("3x^3 + 3x^2 - 4x + 5");
        let rhs = parse("x^3 - 2x^2 + x-4");
        let expected = parse("4x^3 + 1x^2 - 3x + 1");
        let result = lhs.add(rhs);
        expect(result.equals(expected)).to.equal(true);
    });
    it("Subtract", function(){
        let lhs = parse("x^3 - 2x^2 + x-4");
        let rhs = parse("x^3 - 2x^2 + x-4");
        let result = lhs.subtract(rhs);
        expect(result.size()).to.equal(0);
    });
    it("Multiply", function(){
        let lhs = parse("x + 3");
        let rhs = parse("x + 2");
        let expected = parse("x^2 + 5x + 6");
        let result = lhs.multiply(rhs);
        expect(result.equals(expected)).to.equal(true);
    });
    it("Divide", function(){
        let num = parse("x^2 - 9x - 10");
        let den = parse("x + 1");
        let expected = parse("x - 10");
        let result = num.divide(den);
        expect(result.equals(expected)).to.be.true;
    });
    it("Evaluate a variable", function(){
        let poly = parse("3x^2-2x+1");
        let result = poly.evaluate(2);
        expect(result).to.equal(9);
    });

});