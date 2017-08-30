const Parser = require('../../es/src/Parser');
const Solver = require('../../es/src/Solver');
const Polynomial = require("Polynomial");
const math = require("mathjs");

describe("Solver Test", function() {

    let solver = new Solver();
    let parser = new Parser();
    let polynomial;

    it("Should find potential roots", function(){
        // problem taken from http://www.purplemath.com/modules/rtnlroot.htm
        polynomial = parser.parsePolynomial("x^4 + 2x^3 - 7x^2 - 8x + 12");
        let potential = solver.potentialZeros(polynomial);
        let zeros = solver.testZeros(polynomial, potential);
        // expect(zeros.toString()).toEqual([1,2,-2,-3].toString());
    });

    it("Should find potential roots #2", function(){
        // problem taken from http://www.purplemath.com/modules/rtnlroot2.htm
        polynomial = parser.parsePolynomial("2x^3 + 3x - 5");
        let potential = solver.potentialZeros(polynomial);
        let zeros = solver.testZeros(polynomial, potential);
        // expect(zeros.toString()).toEqual([1].toString());
    });

    it("Should implement Descartes' Rule of Signs", function(){
        // problem taken from http://www.purplemath.com/modules/rtnlroot2.htm
        polynomial = parser.parsePolynomial("+x^5 - x^4 + 3x^3 + 9x^2 - x + 5");
        let maxPosZeros = solver.maxPositiveZeros(polynomial);
        let maxNegZeros = solver.maxNegativeZeros(polynomial);
        expect(maxPosZeros).toEqual(4);
        expect(maxNegZeros).toEqual(1);
    });

    describe("Divider Test", function(){
        it("Should divied polynomials", function(){
            let myPoly = parser.parsePolynomial("15x^3 + 14x^2 - 3x - 2");
            let myDiv = parser.parsePolynomial("x+3");
            Polynomial.trace = true;
            let res = new Polynomial(myPoly.expression).div(myDiv.expression);
        });

        it("all together now", function(){
            // problem taken from http://sites.csn.edu/istewart/Math126/zeros_theorem/zeros_theorem.htm
            // let polynomial = parser.parsePolynomial("15x^3 + 14x^2 - 3x - 2");
            let polynomial = parser.parsePolynomial("2x^3 - x^2 + 2x - 1");
            let potential = solver.potentialZeros(polynomial);
            let zeros = solver.testZeros(polynomial, potential);

            let firstZero = math.number(zeros[0]);
            let linearFactor = `x - ${firstZero}`;
            console.log("exp", polynomial.expression);
            console.log("denom", linearFactor);
            Polynomial.trace = true;
            let res = new Polynomial(polynomial.expression).div(new Polynomial("x - 1/2"));
            console.log(Polynomial.trace);
            // console.log(zeros);
        });
    })

});