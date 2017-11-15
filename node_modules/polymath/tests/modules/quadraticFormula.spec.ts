import {expect} from 'chai';
import 'mocha';
import parse from "../../src/parser/parser";
import quadraticFormula from "../../src/modules/quadraticFormula";

describe("Quadratic Formula", function () {
    it("Should apply quadratic formula", function () {
        let poly = parse("x^2 + 3x - 4");
        let output = quadraticFormula(poly);
        expect(output.plus).to.equal(1);
        expect(output.minus).to.equal(-4);
    })
});