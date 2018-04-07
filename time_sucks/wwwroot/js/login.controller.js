angular.module('time').controller('LoginCtrl', function ($scope, $http, $routeParams, $location, userService) {

    $scope.$parent.user = userService.get();
    $scope.hello = "";
    $scope.user = {};
    $scope.password = '';
   // $scope.hello = {};

    $scope.test = {
        "UserID": "1",
        "Username": "",
        "Password": "",
        "FirstName": "a",
        "LastName": "b",
        "IsInstructor": "false"

    };

    //Check if a user is logged in, if they are, redirect to appropriate page
    if ($scope.$parent.user) {
        if ($scope.$parent.user.isInstructor) $location.path('/courses');
        else $location.path('/dashboard');
    } else {

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
                    if (response.data.isInstructor) {
                        $location.path('/courses'); //Changes to the courses URL for Instructor
                    } else {
                        $location.path('/dashboard'); //Changes to the dashboard URL for normal user
                    }
                }, function () {
                    toastr["error"]("Username or password incorrect.");
                });

            //$http.post("/Home/RegisterUser", $scope.test)
            //    .then(function () {
            //        toastr["success"]("success");
            //    }, function () {
            //        toastr["error"]("Username or password incorrect.");
            //    });
        };


    

        $scope.register = function () {
            $location.path('/register'); //Changes to the register URL
        };

        $("#username").focus(); //Focus on the username field for quicker login

    }

});