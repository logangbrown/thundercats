var app = angular.module('time', ['ngRoute', 'unsavedChanges']); //Sets up the Angular app, and includes the ngRoute module

app.config(function ($routeProvider) {
    $routeProvider //Assigns the template file and controller for the routes
        .when("/", {
            templateUrl: "templates/login.html",
            controller: "LoginCtrl"
        })
        .when("/register", {
            templateUrl: "register.html",
            controller: "RegisterCtrl"
        })
        //.when("/game", {
        //    templateUrl: "game.html",
        //    controller: "GameCtrl"
        //})
        //.when("/highScores", {
        //    templateUrl: "highScores.html",
        //    controller: "HighScoreCtrl"
        //});
});
