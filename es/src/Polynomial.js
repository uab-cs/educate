module.exports = class Polynomial {
    constructor(){
        this.monomials = [];
        this.constant = null;
        this.symbol = null;
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
    sym(){
        return this.symbol;
    }
};