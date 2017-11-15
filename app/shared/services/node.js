angular.module("shared")
  .factory("nodeProvider", function () {

    return {
      parse: window.polymath.parse,
      reduce: reduce
    };

    function reduce( input ){
      return new Promise(function (resolve, reject) {
        var result = window.polymath.reduce(input);
        resolve(result);
      });
    }

  });