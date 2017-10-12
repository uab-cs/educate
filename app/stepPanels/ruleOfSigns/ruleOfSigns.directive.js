angular.module("app")
    .directive("ruleOfSigns", function(){
        return {
            scope: {
                maxPositive: "=",
                maxNegative: "=",
                polynomial: "="
            },
            controller: function($scope){
                $scope.ready = "Yes!";
            },
            controllerAs: "signsCtrl",
            templateUrl: "app/stepPanels/ruleOfSigns/ruleOfSigns.html"
        }
    });