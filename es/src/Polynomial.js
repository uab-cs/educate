const Monomial = require("./Monomial");

module.exports = class Polynomial {
    static get pattern(){
        return /(?=[+-])/g;
    }

    constructor(){
        this.monomials = [];
        this.constant = null;
    }

    mono(ind){
        if(this.monomials[ind]) return this.monomials[ind];
    }
    size(){
        return this.monomials.length;
    }
    cons(){
        return this.constant;
    }
    leadingCo(){
        return this.mono(0).co();
    }

    static parse(expression){
        let exp = expression.replace(/\s/g,'');
        let monoExpressions = exp.split(Polynomial.pattern);
        if(monoExpressions.length === 0 ) return false;
        let monomials = [];
        for (let i = 0; i < monoExpressions.length-1; i++) {
            let monoExp = monoExpressions[i];
            let mono = Monomial.parse(monoExp);
            if(mono === false) return false;
            monomials.push(mono);
        }
        if(monomials.length === 0) return false;
        let poly = new Polynomial();
        poly.monomials = monomials;
        let constant = parseInt(monoExpressions[monoExpressions.length-1]);
        if(!constant) return false;
        poly.constant = constant;
        return poly;
    }
};