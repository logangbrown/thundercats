var app = angular.module('time', ['ngRoute', 'unsavedChanges']); //Sets up the Angular app, and includes the ngRoute module

app.config(function ($routeProvider) {
    $routeProvider //Assigns the template file and controller for the routes
        .when("/", {
            templateUrl: "templates/login.html",
            controller: "LoginCtrl"
        })
        .when("/register", {
            templateUrl: "templates/register.html",
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

app.factory('userService', function ($http) {
    var user = {};

    function set(data) {
        user = data;
    }

    function get() {
        if (!jQuery.isEmptyObject(user)) return user;

        //TODO Make sure CheckSession is an endpoint
        $http.get("/Home/CheckSession")
            .then(function (response) {
                user = response.data;
                return user;
            }, function () {
                toastr["error"]("Not logged in.");
                return {};
            });
    }

    return {
        set: set,
        get: get
    }
});