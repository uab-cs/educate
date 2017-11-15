"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Polynomial_1 = require("../models/Polynomial");
var _ = require("lodash");
var Monomial_1 = require("../models/Monomial");
function syntheticDivide(polynomial, root) {
    var topBar = new Array(polynomial.highestDegree() + 1);
    var middleBar = new Array(topBar.length);
    var bottomBar = new Array(topBar.length);
    topBar.fill(0);
    middleBar.fill(0);
    bottomBar.fill(0);
    polynomial.monomials.forEach(function (mono) {
        topBar[mono.degree] = mono.coefficient;
    });
    topBar.reverse();
    add(topBar, middleBar, bottomBar, 0);
    for (var i = 1; i < topBar.length; i++) {
        middleBar[i] = lastAdded * root;
        add(topBar, middleBar, bottomBar, i);
    }
    var remainder = _.last(bottomBar);
    var monomials = [];
    for (var i = bottomBar.length - 2, deg = 0; i >= 0; i--, deg++) {
        if (bottomBar[i] === 0)
            continue;
        monomials.push(new Monomial_1.default(bottomBar[i], deg));
    }
    var result = new Polynomial_1.default(monomials);
    return {
        root: root,
        input: polynomial,
        top: topBar,
        middle: middleBar,
        bottom: bottomBar,
        polynomial: result,
        remainder: remainder
    };
}
exports.default = syntheticDivide;
var lastAdded = 0;
function add(top, middle, bottom, i) {
    bottom[i] = top[i] + middle[i];
    lastAdded = bottom[i];
}
//# sourceMappingURL=syntheticDivision.js.map