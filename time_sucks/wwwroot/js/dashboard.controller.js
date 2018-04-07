angular.module('time').controller('DashboardCtrl', function ($scope, $http, $routeParams, $location, userService) {
    $scope.$parent.user = userService.get();

    //Check if a user is logged in, if not, redirect to login
    if (!$scope.$parent.user) {
        toastr["error"]("Not logged in.");
        $location.path('/login');
    } else {
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
                    groupID: "1",
                    name: "Group Badass",
                    isActive: true,
                    project: "PHP Game",
                    course: "CS 3750 Spring 2018 MW 7:30",
                    instructor: "Brad Peterson"
                },
                2: {
                    groupID: "2",
                    name: "Group One Thing",
                    isActive: true,
                    project: "Multiplayer Conway's Game of Life",
                    course: "CS 3750 Fall 2018 MW 7:30",
                    instructor: "Brad Peterson"
                },
                3: {
                    groupID: "3",
                    name: "Group Other Thing",
                    isActive: true,
                    project: "Student Time Tracker",
                    course: "CS 3750 Spring 2019 MW 7:30",
                    instructor: "Brad Peterson"
                }
            };
        }

        $scope.groups = $scope.getGroups();
    }
});