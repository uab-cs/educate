const Parser = require("../../es/src/Parser");
const Monomial = require("../../es/src/Monomial");

describe("Regex Test", function() {

    let regex = Parser.monomialPattern;
    let subject;

    it("Should parse a monomial", function() {
        subject = "-2x^4";
        let res = regex.exec(subject);
        expect(res[1]).toEqual("-");
        expect(res[2]).toEqual("2");
        expect(res[3]).toEqual("x");
        expect(res[4]).toEqual("4");
    });

    it("Should handle undefined characters", function() {
        subject = "x";
        let res = regex.exec(subject);
        expect(res[1]).not.toBeDefined();
        expect(res[2]).not.toBeDefined();
        expect(res[3]).toEqual("x");
        expect(res[4]).not.toBeDefined();
    });

    it("Should even handle really big expressions", function() {
        subject = "-52643x^10000";
        let res = regex.exec(subject);
        expect(res[1]).toEqual("-");
        expect(res[2]).toEqual("52643");
        expect(res[3]).toEqual("x");
        expect(res[4]).toEqual("10000");
    });

    it("Should fail on garbage input", function() {
        subject = "boob";
        let res = regex.exec(subject);
        expect(res).toEqual(null);
    });
});