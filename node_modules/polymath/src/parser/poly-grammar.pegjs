// Polynomial Grammar
// ==========================

Polynomial
	= monomials:Monomial+ cons:Constant {
    	monomials.push(cons);
        return monomials;
    }

Monomial
	= co:Coefficient sym:Symbol deg:Degree {
    	return {
        	co: co,
            sym: sym,
            deg: deg
        }
    }

Constant
	= co:Coefficient {
	    return {
           co: co,
           sym: 'x',
           deg: 0
        }
	}
    / "" {
        return {
           co: 0,
           sym: 'x',
           deg: 0
        }
    }

Coefficient
	= sign:Sign intgr:Integer? {
          	if(!intgr) intgr = 1;
    	if(sign === "+") return intgr;
        if(sign === "-") return -intgr;
    }
    
Sign
	= sign:[+-] { return sign }
    / "" { return "+" }
    
Symbol
	= sym:[a-z] { return sym }

Degree
	= "^" intgr:Integer { return intgr }
    / "" { return 1 }

Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }