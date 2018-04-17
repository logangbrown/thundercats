angular.module('time').controller('DashboardCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.load = function() {
        $scope.getGroups = function () {
            //TODO Enable Dashboard groups functionality, disable return below
            //$http.get("/Home/Dashboard")
            //    .then(function (response) {
            //        return response.data;
            //    }, function () {
            //        toastr["error"]("Error retrieving dashboard groups.");
            //    });

            return {
                1: {
                    _id: "1",
                    name: "Group Badass",
                    isActive: true,
                    project: "PHP Game",
                    course: "CS 3750 Spring 2018 MW 7:30",
                    instructor: "Brad Peterson"
                },
                2: {
                    _id: "2",
                    name: "Group One Thing",
                    isActive: true,
                    project: "Multiplayer Conway's Game of Life",
                    course: "CS 3750 Fall 2018 MW 7:30",
                    instructor: "Brad Peterson"
                },
                3: {
                    _id: "3",
                    name: "Group Other Thing",
                    isActive: true,
                    project: "Student Time Tracker",
                    course: "CS 3750 Spring 2019 MW 7:30",
                    instructor: "Brad Peterson"
                }
            };
        }

        $scope.groups = $scope.getGroups();
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
    } else if ($scope.$parent.user.isInstructor) {
        $location.path('/courses');
    } else {
        $scope.load();
    }


});