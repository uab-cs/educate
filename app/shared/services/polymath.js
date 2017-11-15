angular.module("shared")
.factory("polymath", function(haskellProvider, nodeProvider){

    return {
      parse: window.polymath.parse,
      reduce: function(input){
        switch ( window._env.mathProvider){
          case "haskell": return haskellProvider.reduce(input); break;
          case "node": return nodeProvider.reduce(input); break;
          default:
            throw "Unsupported Math Provider";
        }
      }
    };



});