/**
 * Created by Chris Rocco on 8/28/2017.
 */

let app = angular.module("app", ['ngJaxBind']);

app.controller("AppController", AppController);

AppController.$inject = ['$scope'];
function AppController($scope){
    /* data model */
    $scope.expression = "$$ 4x^3 - 10y^2 + 13z + 25 $$";
    $scope.result = false;

    /* functions */
    $scope.handleGo = handleGo;
    $scope.handleTryAgain = handleTryAgain;

    /* constructor */
    function init(){
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [['$','$'], ['\\(','\\)']],
                processEscapes: true
            }
        });
    }

    /*=====================================================*/
    /*================== Business Logic ==================*/
    /*=====================================================*/

    function handleGo(){
        $("#portfolio-ajax-loader").show();
        setTimeout(function(){
            $scope.result = "$$ (x + 5)(y - 3)(z + 12) $$";
            $scope.$apply();
            $("#portfolio-ajax-loader").hide();
        }, 2000);
        // swal("Coming Soon!", "This page is under development", "info");
    }

    function handleTryAgain(){
        $scope.result = false;
    }

    init();
}