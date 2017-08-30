const Polynomial = require("../../app/Polynomial");

describe("Polynomial Test", function(){
    it("Should fail gracefully on garbage input", function(){
        let result = Polynomial.parse(" boob * boob = boob^2 ");
        expect(result).toEqual(false);
    });

    it("Should parse huge crazy polynomials", function(){
        // 30x5 – 166x4 – 542x3 + 2838x2 + 1520x – 800
        let poly = Polynomial.parse("30x^5 - 166x^4 - 542x^3 + 2838x^2 + 1520x - 800");
        expect(poly.mono(0).deg()).toEqual(5);
        expect(poly.mono(2).deg()).toEqual(3);
        expect(poly.mono(4).deg()).toEqual(1);
        expect(poly.mono(1).co()).toEqual(-166);
        expect(poly.mono(3).co()).toEqual(2838);
        expect(poly.leadingCo()).toEqual(30);
        expect(poly.cons()).toEqual(-800);
    });
});