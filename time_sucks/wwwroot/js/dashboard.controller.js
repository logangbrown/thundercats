angular.module('time').controller('DashboardCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.load = function () {
        $scope.groups = {};

        //TODO Enable Dashboard, disable dummy data
        //$http.get("/Home/Dashboard")
        //    .then(function (response) {
        //        $scope.groups = response.data;
        //    }, function () {
        //        toastr["error"]("Error retrieving dashboard groups.");
        //    });

        //Dummy Data
        $scope.groups = {
            1: {
                groupID: 1,
                name: "Group Awesome",
                isActive: true,
                project: "PHP Game",
                course: "CS 3750 Spring 2018 MW 7:30",
                instructor: "Brad Peterson"
            },
            2: {
                groupID: 2,
                name: "Group One Thing",
                isActive: true,
                project: "Multiplayer Conway's Game of Life",
                course: "CS 3750 Fall 2018 MW 7:30",
                instructor: "Brad Peterson"
            },
            3: {
                groupID: 3,
                name: "Group Other Thing",
                isActive: true,
                project: "Student Time Tracker",
                course: "CS 3750 Spring 2019 MW 7:30",
                instructor: "Brad Peterson"
            }
        };

        $scope.loaded = true;
    }

    //Standard login check, if there is a user, load the page, if not, redirect to login
    if (!$scope.$parent.user || $scope.$parent.user === '') {
        $http.get("/Home/CheckSession")
            .then(function (response) {
                $scope.$parent.user = response.data;
                $scope.$parent.loaded = true;
                $scope.load();
            }, function () {
                toastr["error"]("Not logged in.");
                $location.path('/login');
            });

        //Dummy data
        //toastr["error"]("Not logged in - enable REST endpoint");
        //$location.path('/login');
    } else {
        $scope.load();
    }


});