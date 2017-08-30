angular.module("app")
.directive("polynomial", function(polyService){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            mCtrl.$validators.poly = function(modelValue, viewValue) {
                let res = polyService.parse(viewValue);
                console.info("parsed: ", res);
                return res;
            };
        }
    };
});