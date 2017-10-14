angular.module("app")
    .directive("rationalZeros", function(){
        return {
            scope: {
                potential: "=",
                actual: "="
            },
            link: function($scope, $el){
                initToggle($($el[0]).find(".toggle"));
            },
            controller: function($scope){
                $scope.title = "Rational Zeros Test";
                $scope.prettyFraction = function(mathjsFraction){
                    var f = mathjsFraction;
                    var sign = (f.s < 0)? "-" : "+";
                    var num = f.n;
                    var den = f.d;
                    var frac = num + "/" + den;
                    if(num === den || den === 1)
                        frac = num;
                    return sign + frac;
                };
            },
            templateUrl: "app/stepPanels/rationalZeros/rationalZeros.html"
        }
    });