module.exports = class Monomial {

    constructor(){
        this.coefficient = null;
        this.degree = null;
        this.symbol = null;
    }

    co(){
        return this.coefficient;
    }
    deg(){
        return this.degree;
    }
    sym(){
        return this.symbol;
    }

};