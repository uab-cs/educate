export default class Monomial {

    readonly coefficient: number;
    readonly degree: number;

    constructor(coefficient: number, degree: number){
        this.coefficient = coefficient;
        this.degree = degree;
    }

    isPositive(): boolean {
        return this.coefficient >= 0;
    }

    negate(): Monomial {
        let newCo = this.coefficient;
        if(this.degree % 2 !== 0) newCo *= -1;
        return new Monomial(newCo, this.degree);
    }
}