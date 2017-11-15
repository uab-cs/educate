"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Monomial = /** @class */ (function () {
    function Monomial(coefficient, degree) {
        this.coefficient = coefficient;
        this.degree = degree;
    }
    Monomial.prototype.isPositive = function () {
        return this.coefficient >= 0;
    };
    Monomial.prototype.negate = function () {
        var newCo = this.coefficient;
        if (this.degree % 2 !== 0)
            newCo *= -1;
        return new Monomial(newCo, this.degree);
    };
    return Monomial;
}());
exports.default = Monomial;
//# sourceMappingURL=Monomial.js.map