# POLYMATH

## GETTING STARTED

##### Installing with NPM
$ `npm install polymath`

#### Browser
```html
<script src="node_modules/polymath/bundles/polymath.js"></script>
<script>
	console.log(polymath.parse("2x^3 + 4x^2 - 3x + 12"));
</script>
```

#### Node
```js
const polymath = require('polymath');
let polynomial = polymath.parse("2x^3 + 4x^2 - 3x + 12");
```

## USAGE

### CONSTRUCTION

From a String: `polymath.parse('2x^3 + 7x^2 - 3x + 2')`

Parsing is done using a parsing expression grammar. See [PEG.js](https://pegjs.org/)

### BASIC ARITHMETIC

`Polynomial.add(poly: Polynomial): Polynomial`

`Polynomial.substract(poly: Polynomial): Polynomial`

`Polynomial.multiply(poly: Polynomial): Polynomial`

`Polynomial.divide(poly: Polynomial): Polynomial`

### OTHER FUNCTIONS

`Polynomial.toLatex(): string`

returns a LaTex representation of the polynomial

`Polynomial.iterator(): object`

returns an iterator of the monomial terms

### ADDITIONAL MODULES

#### Descarte's Rule of Signs
```javascript
polymath.ruleOfSigns(poly: Polynomial);
```

#### Rational Zeros Test
```javascript
polymath.rationalZeros(poly: Polynomial);
```

#### Synthetic Division
```javascript
polymath.syntheticDivide(divisor: Polynomial, dividend: Polynomial);
```