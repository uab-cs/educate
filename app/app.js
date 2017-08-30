/**
 * Created by Chris Rocco on 8/28/2017.
 */

let app = angular.module("app", ['ngJaxBind']);

app.controller("AppController", AppController);

AppController.$inject = ['$scope', 'polyService'];
function AppController($scope, polyService){
    /* data model */
    $scope.expression = "30x^5 - 166x^4 - 542x^3 + 2838x^2 + 1520x - 800";
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
    }

    /*=====================================================*/
    /*================== Business Logic ==================*/
    /*=====================================================*/

    function handleGo(){
        $scope.loading = true;
        setTimeout(function(){
            $scope.result = "4x^3 - 10x^2 + 13x + 25";
            $scope.loading = false;
            $scope.$apply();
        }, 2000);
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