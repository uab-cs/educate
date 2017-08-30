/**
 * Created by Chris Rocco on 8/28/2017.
 */

let app = angular.module("app", ['ngJaxBind']);

app.controller("AppController", AppController);

AppController.$inject = ['$scope', 'polyService', 'solverService'];
function AppController($scope, polyService, solverService){
    /* data model */
    $scope.expression = "15x^3 + 14x^2 - 3x - 2";
    $scope.result = false;

    /* functions */
    $scope.handleGo = handleGo;
    $scope.handleTryAgain = handleTryAgain;
    $scope.parse = parse;

    /* constructor */
    function init(){
        /* for debugging purposes only*/
        window.scope = $scope;
        /* end */

        /* setup mathjax */
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [['$','$'], ['\\(','\\)']],
                processEscapes: true
            }
        });
        // end

        /* trigger parsing for the example */
        parse($scope.expression);
        // end

        $scope.polyService = polyService;
        $scope.solverService = solverService;
    }

    /*=====================================================*/
    /*================== Business Logic ==================*/
    /*=====================================================*/

    function handleGo(){
        $scope.loading = true;
        let polynomial = polyService.parsePolynomial($scope.expression);
        let potentialZeros = solverService.potentialZeros(polynomial);
        let rationalZeros = solverService.testZeros(polynomial, potentialZeros);
        $scope.result = solverService.getFactoredTex(polynomial, rationalZeros);
        $scope.potentialZeros = potentialZeros;
        $scope.rationalZeros = rationalZeros;
        if($scope.rationalZeros.length === 0) $scope.noZeros = true;
        $scope.loading = false;
    }

    function handleTryAgain(){
        $scope.result = false;
    }

    function parse(expression){
        let p  = polyService.parsePolynomial(expression);
        console.log(expression, p);
        if(p === false) return;
        $scope.polynomial = p;
    }

    init();
}