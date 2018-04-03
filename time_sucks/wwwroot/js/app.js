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
        .when("/courses", {
            templateUrl: "templates/courses.html",
            controller: "CoursesCtrl"
        })
        .when("/course/:ID", {
            templateUrl: "templates/course.html",
            controller: "CourseCtrl"
        });
});

app.factory('userService', function ($http) {
    //TODO User should be set to null by default
    var user = { id: "1", username: "zedop", firstName: "Logan", lastName: "Brown", isInstructor: true };

    function set(data) {
        user = data;
    }

    function get() {
        if (user) return user;

        ////TODO Make sure CheckSession is an endpoint
        $http.get("/Home/CheckSession")
            .then(function (response) {
                user = response.data;
                return user;
            }, function () {
                return null;
            });
    }

    return {
        set: set,
        get: get
    }
});