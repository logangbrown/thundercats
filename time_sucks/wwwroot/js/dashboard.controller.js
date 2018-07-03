angular.module('time').controller('DashboardCtrl', ['$scope', '$http', '$routeParams', '$location', 'usSpinnerService', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.load = function () {
        $scope.groups = {};

        //TODO Enable Dashboard, disable dummy data
        //$http.get("/Home/GetDashboard")
        //    .then(function (response) {
        //        $scope.groups = response.data;
        //    }, function () {
        //        toastr["error"]("Error retrieving dashboard groups.");
        //    });

        //Dummy Data
        $scope.groups = {
            1: {
                groupID: 1,
                groupName: "Group Awesome",
                isActive: true,
                projectName: "PHP Game",
                courseName: "CS 3750 Spring 2018 MW 7:30",
                instructorName: "Brad Peterson"
            },
            2: {
                groupID: 2,
                groupName: "Group One Thing",
                isActive: true,
                projectName: "Multiplayer Conway's Game of Life",
                courseName: "CS 3750 Fall 2018 MW 7:30",
                instructorName: "Brad Peterson"
            },
            3: {
                groupID: 3,
                groupName: "Group Other Thing",
                isActive: true,
                projectName: "Student Time Tracker",
                courseName: "CS 3750 Spring 2019 MW 7:30",
                instructorName: "Brad Peterson"
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

    } else {
        $scope.load();
    }


}]);