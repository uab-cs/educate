
var dependencies = [
    "ui.router",
    /* internal */
    "shared",
    "home",
    /* external */
    "ngJaxBind"
];

var app = angular.module("app", dependencies);

app.config(function($stateProvider){
    $stateProvider.state('home', {
        name: 'home',
        url: '',
        templateUrl: "app/pages/home/home.html",
        controller: "homeController"
    })
});