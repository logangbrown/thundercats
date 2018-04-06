angular.module('time').controller('UsersCtrl', function ($scope, $http, $routeParams, $location, userService) {
    $scope.$parent.user = userService.get();

    //Check if a user is logged in, if not, redirect to login
    if (!$scope.$parent.user) {
        toastr["error"]("Not logged in.");
        $location.path('/login');
    } else if (!$scope.$parent.user.isInstructor) {
        toastr["error"]("Not Instructor.");
        $location.path('/dashboard');
    } else {
        $scope.getUsers = function () {
            //TODO get real users, on fail kick back to dashboard, might be lying about being an instructor
            return {
                1: {
                    userID: 1,
                    username: "logan",
                    firstName: "Logan",
                    lastName: "Brown",
                    isActive: false,
                    isInstructor: true
                },
                2: {
                    userID: 2,
                    username: "riz",
                    firstName: "Rizwan",
                    lastName: "Mohammed",
                    isActive: true,
                    isInstructor: false
                },
                3: {
                    userID: 3,
                    username: "skylar",
                    firstName: "Skylar",
                    lastName: "Olsen",
                    isActive: true,
                    isInstructor: false
                }
            };
        }

        $scope.users = $scope.getUsers();

        $scope.saveUser = function (userID) {
            //TODO Save user functionality
            toastr["info"]("Attempted to save user: " + userID);
        }
    }
});