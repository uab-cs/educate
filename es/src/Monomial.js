module.exports = class Monomial {

    constructor(){
        this.coefficient = null;
        this.degree = null;
    }

    co(){
        return this.coefficient;
    }
    deg(){
        return this.degree;
    }

    static get pattern(){
        return /^([-+])?(\d+)?([a-z])(?:\^(\d+))?$/;
    }

    static parse(expression){
        let exp = expression.replace(/\s/g,'');
        let result = this.pattern.exec(exp);
        if(!result) return false;
        // interpret captures and set defaults
        let sign =          result[1] || "+";
        let coefficient =   result[2] || 1;
        let variable =      result[3];
        let degree =        result[4] || 1;
        if(sign === "-") coefficient *= -1;
        // construct monomial
        let m = new Monomial();
        m.coefficient = parseInt(coefficient);
        m.degree = parseInt(degree);
        return m;
    }
};