angular.module("shared")
  .factory("haskellProvider", function ($http) {

    var endpoint = 'http://mochiro.moe:3000/factor/';

    return {
      parse: window.polymath.parse,
      reduce: reduce
    };

    function reduce( input ){

      return $.get(endpoint + input.toLatex()).then(function(data){
        format(data);
        return data;
      })

    }

    function format( payload ){
      payload.roots = formatZeros(payload.roots);
      payload.steps = payload.steps.map(function(step){
        step.data = step.dat;
        step.module = step.opType;
        if(step.module === 'zeros'){
          step.data.potential_zeros = formatZeros(step.data.potential_zeros);
          step.data.actual_zeros = formatZeros(step.data.actual_zeros);
        }
        if(step.module === 'synthetic_division'){
          step.data = formatDivision(step.data);
        }
        return step;
      })
    }

    function formatDivision(data){
      data.top = formatZeros(data.top);
      data.bottom = formatZeros(data.bottom);
      data.top = data.top.map(function(t){ return t.n });
      data.bottom = data.bottom.map(function(t){ return t.n });
      return data;
    }

    function formatZeros(zeros){
      return zeros.map(function(z){
        z.n = z.num;
        z.d = z.denom;
        z.s = (z.n >= 0)? 1 : -1;
        z.n = Math.abs(z.n);
        return z;
      });
    }

  });