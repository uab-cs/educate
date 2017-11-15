import {expect} from 'chai';
import 'mocha';
import parse from "../../src/parser/parser";

describe("Polynomial Models", function(){

    it("Should sort monomials by degree", function(){
        let polynomial = parse("4x + 7x^3 + 3x^2 + 5");
        polynomial.sortMonomials();

        let it = polynomial.getIterator();
        let last = it.next();
        while(it.hasNext()){
            let current = it.next();
            expect(last.degree).to.be.greaterThan(current.degree);
            last = current;
        }
    });

    it("Should compare two Polynomials for equivalence", function(){
        let lhs = parse("3x^3 + 3x^2 - 4x + 5");
        let rhs = parse("3x^3 + 3x^2 - 4x + 5");
        expect(lhs.equals(rhs)).to.equal(true);

        let bad = parse("3x^2 - 4x + 5");
        expect(lhs.equals(bad)).to.equal(false);

        let outOfOrder = parse("3x^2 + 3x^3 - 4x + 5");
        expect(lhs.equals(outOfOrder)).to.equal(true);
    });

    it("Should output to LaTex", function(){
        parse("3x^3 + 3x^2 - 4x + 5").toLatex();
    })

});