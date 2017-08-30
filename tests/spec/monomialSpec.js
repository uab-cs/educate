const Monomial = require("../../es/src/Monomial");

describe("Monomial Test", function(){
    it("Should parse a simple monomial", function(){
        let result = Monomial.parse("-2x^3");
        expect(result.co()).toEqual(-2);
        expect(result.deg()).toEqual(3);
    });

    it("Should return false with garbage input", function(){
        let result = Monomial.parse("boob");
        expect(result).toEqual(false);
    });

    it("Should handle whitespace", function(){
        let result = Monomial.parse("    -327 y^12");
        expect(result.co()).toEqual(-327);
        expect(result.deg()).toEqual(12);
    });
});