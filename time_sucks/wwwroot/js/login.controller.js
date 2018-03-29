angular.module('time').controller('LoginCtrl', function ($scope, $http, $routeParams, $location, userService) {

    $scope.hello = "";
    $scope.user = {};
    $scope.user.username = '';
    $scope.user.password = '';
    $scope.password = '';

    //Check if a user is logged in, redirect if they are redirect to dashboard
    if (!jQuery.isEmptyObject(userService.get())) { $location.path('/dashboard'); } else {

        $http.get("/Home/Hello")
            .then(function (response) {
                $scope.hello = response.data;
                toastr["success"]("You got data from the server!");
            }, function () {
                toastr["error"]("Error on GET.");
            });

        $scope.login = function () {
            if ($scope.user.username === '') {
                toastr['error']("Please enter a Username");
                return;
            } else if ($scope.password === '') {
                toastr["error"]("Please enter a Password");
                return;
            }

            $scope.user.password = CryptoJS.SHA256($scope.password).toString(CryptoJS.enc.Hex);

            $http.post("/Home/Login", $scope.user)
                .then(function (response) {
                    userService.set(response.data);
                    $location.path('/dashboard'); //Changes to the game URL
                }, function () {
                    toastr["error"]("Username or password incorrect.");
                });
        };

        $scope.register = function () {
            $location.path('/register'); //Changes to the register URL
        };

        $("#username").focus();

    }

});