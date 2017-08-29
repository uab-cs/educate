/**
 * Created by Chris Rocco on 8/28/2017.
 */

let app = angular.module("app", ['ngJaxBind']);

app.controller("AppController", AppController);

function AppController($scope){
    /* data model */
    $scope.expression = "4x^3 - 10y^2 + 13z + 25";
    $scope.result = false;

    /* functions */
    $scope.handleGo = handleGo;
    $scope.handleTryAgain = handleTryAgain;

    /* constructor */
    function init(){
        /* for debugging purposes only*/
        window.scope = $scope;
        /* end */
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
        $scope.loading = true;
        setTimeout(function(){
            $scope.result = "4x^3 - 10y^2 + 13z + 25";
            $scope.loading = false;
            $scope.$apply();
        }, 2000);
        // swal("Coming Soon!", "This page is under development", "info");
    }

    function handleTryAgain(){
        $scope.result = false;
    }

    init();
}