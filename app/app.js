/**
 * Created by Chris Rocco on 8/28/2017.
 */

var app = angular.module("app", ['ngJaxBind']);

app.controller("AppController", function($scope){
    $scope.expression = "12x^3-41x^2-38x+40";
    // $scope.expression = "15x^3 + 14x^2 - 3x - 2";
    $scope.result = false;

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

    $scope.go = function(polynomialExpression){
        var polynomial = window.polymath.parse(polynomialExpression);
        var signs = polymath.ruleOfSigns(polynomial);
        var zeros = polymath.rationalZeroTest(polynomial);
        console.log(polynomial);
        console.log(signs);
        console.log(zeros);
        renderZeros(zeros.actual_zeros);
    };

    $scope.showSteps = function(){
        swal("Coming Soon!");
    };

    function renderZeros(zeros){
        var latex = [];
        zeros.forEach(function(zero){
            latex.push( toLatex(zero) );
        });
        $scope.result = latex.join("");
    }

    /**
     *
     * @param root Fraction
     * @returns {string}
     */
    function toLatex(root){
        var num = root.n;
        var den = root.d;
        var r = "\\frac{"+num+"}{"+den+"}";
        if(num === den)
            r = num;
        var sign = "+";
        if(root < 0)
            sign = "-";
        return "(x"+sign+r+")";
    }


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