angular.module("pages")
    .directive("uabBody", function(){
        return {
            controller: uabBodyController,
            templateUrl: "app/pages/body/body.html"
        }
    });