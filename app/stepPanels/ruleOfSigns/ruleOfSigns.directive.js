angular.module("app")
    .directive("ruleOfSigns", function(){
        return {
            scope: {
                maxPositive: "=",
                maxNegative: "=",
                polyLatex: "="
            },
            link: function($scope, $el){
                initToggle($($el[0]).find(".toggle"));
            },
            controller: function($scope){
                $scope.title = "Descarte's Rule of Signs";
            },
            templateUrl: "app/stepPanels/ruleOfSigns/ruleOfSigns.html"
        }
    });