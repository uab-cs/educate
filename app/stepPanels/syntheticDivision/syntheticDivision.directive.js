angular.module("app")
    .directive("syntheticDivision", function(){
        return {
            scope: {
                input: "=",
                result: "=",
                top: "=",
                middle: "=",
                bottom: "=",
                root: "="
            },
            link: function($scope, $el){
                initToggle($($el[0]).find(".toggle"));
            },
            controller: function($scope){
                $scope.ready = "Yes!";

                var frac = math.fraction($scope.root);
                $scope.rootLatex = "\\frac{"+frac.n+"}{"+frac.d+"}`"
            },
            templateUrl: "app/stepPanels/syntheticDivision/syntheticDivision.html"
        }
    });