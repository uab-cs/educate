angular.module("app")
.directive("polynomial", function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            mCtrl.$validators.poly = function(modelValue, viewValue) {
                // TODO - validate user input here
                return true;
            };
        }
    };
});