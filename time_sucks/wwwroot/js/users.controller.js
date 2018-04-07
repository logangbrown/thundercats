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
            //TODO Enable Users functionality, disable return below
            $http.get("/Home/Users")
                .then(function (response) {
                    return response.data;
                }, function () {
                    toastr["error"]("Failed to get users.");
                    $location.path('/dashboard');
                });

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

        $scope.saveUser = function (user) {
            //TODO Enable save user functionality, disable info toast
            //$http.post("/Home/SaveUser", user)
            //    .then(function (response) {
            //        toastr["success"]("User saved.");
            //    }, function () {
            //        toastr["error"]("Failed to save user.");
            //    });
            toastr["info"]("Attempted to save user: " + user.userID);
        }
    }
});