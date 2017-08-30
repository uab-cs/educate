const Parser = require('../../es/src/Parser');
const Solver = require('../../es/src/Solver');
const Polynomial = require("Polynomial");
const math = require("mathjs");

describe("Solver Test", function() {

    let solver = new Solver();
    let parser = new Parser();
    let polynomial;

    let exExpressions = [
        "15x^3 + 14x^2 - 3x - 2",
        "x^4 + 2x^3 - 7x^2 - 8x + 12",
        "2x^3 + 3x - 5",
        "+x^5 - x^4 + 3x^3 + 9x^2 - x + 5",
        "3x^4 + 10x^3 - 11x^2 - 10x + 8"
    ];

    it("Should find potential roots", function(){
        // problem taken from http://www.purplemath.com/modules/rtnlroot.htm
        polynomial = parser.parsePolynomial(exExpressions[1]);
        let potential = solver.potentialZeros(polynomial);
        let zeros = solver.testZeros(polynomial, potential);
        expect(math.number(zeros[0])).toEqual(1);
        expect(math.number(zeros[1])).toEqual(2);
        expect(math.number(zeros[2])).toEqual(-2);
        expect(math.number(zeros[3])).toEqual(-3);
    });

    it("Should find potential roots #2", function(){
        // problem taken from http://www.purplemath.com/modules/rtnlroot2.htm
        polynomial = parser.parsePolynomial(exExpressions[2]);
        let potential = solver.potentialZeros(polynomial);
        let zeros = solver.testZeros(polynomial, potential);
        expect(math.number(zeros[0])).toEqual(1);
    });

    it("Should implement Descartes' Rule of Signs", function(){
        // problem taken from http://www.purplemath.com/modules/rtnlroot2.htm
        polynomial = parser.parsePolynomial(exExpressions[3]);
        let maxPosZeros = solver.maxPositiveZeros(polynomial);
        let maxNegZeros = solver.maxNegativeZeros(polynomial);
        expect(maxPosZeros).toEqual(4);
        expect(maxNegZeros).toEqual(1);
    });

    it("Should be able to find rational zeros", function(){
        // problem taken from http://www.purplemath.com/modules/rtnlroot2.htm
        // polynomial = parser.parsePolynomial(exExpressions[0]);
        // polynomial = parser.parsePolynomial("3x^3 + 17x^2 + 5x - 25");
        polynomial = parser.parsePolynomial("4x^4 + 13x^3 - 49x^2 - 73x - 15");
        let pot = solver.potentialZeros(polynomial);
        let zeros = solver.testZeros(polynomial, pot);
        let exp = solver.getFactoredExpression(polynomial, zeros);
        // expect(math.number(zeros[1])).toEqual(-1);
        console.log(zeros);
        console.log(exp);

        let node = math.parse(exp);
        console.log(node.toString());
        console.log(node.toTex());
    });

});