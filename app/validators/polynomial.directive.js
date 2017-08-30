angular.module("app")
.directive("polynomial", function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            let regex = /^(?:\s?[-+]?\s?(\d*)(\w?)(\^\d+)?)+$/i;
            mCtrl.$validators.poly = function(modelValue, viewValue) {
                return regex.test(viewValue);
            };
        }
    };
});