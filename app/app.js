/**
 * Created by Chris Rocco on 8/28/2017.
 */

let app = angular.module("app", ['ngJaxBind']);

app.controller("AppController", function($scope){
    $scope.expression = "15x^3 + 14x^2 - 3x - 2";

    /* constructor */
    function init(){
        /* debugging purposes only*/
        window.scope = $scope;

        /* setup mathjax */
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [['$','$'], ['\\(','\\)']],
                processEscapes: true
            }
        });
    }

    init();
});