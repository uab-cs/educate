import Polynomial from "../models/Polynomial";
import * as _ from "lodash";
import Monomial from "../models/Monomial";

export default function syntheticDivide(polynomial: Polynomial, root: number){
    let topBar = new Array(polynomial.highestDegree() + 1);
    let middleBar = new Array(topBar.length);
    let bottomBar = new Array(topBar.length);
    topBar.fill(0);
    middleBar.fill(0);
    bottomBar.fill(0);

    polynomial.monomials.forEach((mono)=>{
        topBar[mono.degree] = mono.coefficient;
    });
    topBar.reverse();

    add(topBar, middleBar, bottomBar, 0);
    for(let i = 1; i < topBar.length; i++){
        middleBar[i] = lastAdded * root;
        add(topBar, middleBar, bottomBar, i);
    }

    let remainder = _.last(bottomBar);
    let monomials: Monomial[] = [];
    for(let i = bottomBar.length-2,
          deg = 0; i >= 0; i--, deg++){
        if(bottomBar[i] === 0) continue;
        monomials.push(new Monomial(bottomBar[i], deg));
    }
    let result = new Polynomial(monomials);

    return {
        root: root,
        input: polynomial,
        top: topBar,
        middle: middleBar,
        bottom: bottomBar,
        polynomial: result,
        remainder: remainder
    }
}

let lastAdded = 0;

function add(top, middle, bottom, i){
    bottom[i] = top[i] + middle[i];
    lastAdded = bottom[i];
}