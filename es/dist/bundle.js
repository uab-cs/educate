var Polynomial =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Monomial = __webpack_require__(1);

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);