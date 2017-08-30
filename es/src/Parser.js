const Monomial = require("./Monomial");
const Polynomial = require("./Polynomial");

module.exports = class Parser {

    static get monomialPattern() {
        return /^([-+])?(\d+)?([a-z])(?:\^(\d+))?$/;
    }

    static get polynomialPattern() {
        return /(?=[+-])/g;
    }

    parseMonomial(expression) {
        let exp = expression.replace(/\s/g, '');
        let result = Parser.monomialPattern.exec(exp);
        if (!result) return false;
        // interpret captures and set defaults
        let sign = result[1] || "+";
        let coefficient = result[2] || 1;
        let variable = result[3];
        let degree = result[4] || 1;
        if (sign === "-") coefficient *= -1;
        // construct monomial
        let m = new Monomial();
        m.coefficient = parseInt(coefficient);
        m.degree = parseInt(degree);
        return m;
    }

    parsePolynomial(expression) {
        if (!expression) return this.fail("Bad expression");
        let exp = expression.replace(/\s/g, ''); // trim all whitespace
        let monoExpressions = exp.split(Parser.polynomialPattern); // split into monomial expressions on + or -
        if (monoExpressions.length === 0) return this.fail("No monomials provided");

        /* parse the monomial expressions */
        let monomials = [];
        for (let i = 0; i < monoExpressions.length - 1; i++) {
            let monoExp = monoExpressions[i];
            let mono = this.parseMonomial(monoExp);
            if (mono === false) return this.fail("Bad expression");
            monomials.push(mono);
        }
        if (monomials.length === 0) return false;

        /* extract the constant term */
        let lastToken = monoExpressions[monoExpressions.length - 1];
        if (!lastToken.match(/^[+-]\d+$/)) return this.fail("Bad constant value");
        let constant = parseInt(lastToken);

        /* construct the polynomial object */
        let poly = new Polynomial();
        poly.monomials = monomials;
        poly.constant = constant;

        /* do some validation */
        if (!this.validateDegOrder(poly)) return this.fail("Bad order of degrees. Should be descending");

        return poly;
    }

    validateDegOrder(polynomial) {
        let last = 9999999999;
        for (let i = 0; i < polynomial.monomials.length; i++) {
            let m = polynomial.monomials[i];
            if (m.deg() >= last) {
                return false;
            }
            last = m.deg();
        }
        return true;
    }

    fail( message ){
        this.opCode = {
            msg: message
        };
        return false;
    }
};