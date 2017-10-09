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

        $scope.$watch("expression", function(){
            renderFunction($scope.expression, "#graph")
        });
    }

    $scope.go = function(){
        swal("Coming Soon!");
    };

    function renderFunction(expression, selector){
        functionPlot({
            target: selector,
            data: [{
                fn: expression,
                sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
                graphType: 'polyline'
            }]
        });
    }

    init();
});