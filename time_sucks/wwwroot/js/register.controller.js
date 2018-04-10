angular.module('time').controller('RegisterCtrl', function ($scope, $http, $routeParams, $location, userService) {

    $scope.$parent.user = userService.get();

    //Check if a user is logged in, if they are, redirect to appropriate page
    if ($scope.$parent.user) {
        if ($scope.$parent.user.isInstructor) $location.path('/courses');
        else $location.path('/dashboard');
    } else {
        $scope.user = {};
        $scope.user.firstname = '';
        $scope.user.lastname = '';
        $scope.user.password = '';
        $scope.user.isInstructor = false;
        $scope.password = '';
        $scope.repeatPassword = '';

        $scope.register = function () {
            if ($scope.user.username === '') {
                toastr['error']("Please enter a Username");
                return;
            } else if ($scope.user.displayName === '') {
                toastr['error']("Please enter a Display Name");
                return;
            } else if ($scope.password === '') {
                toastr["error"]("Please enter a Password");
                return;
            } else if ($scope.repeatPassword !== $scope.password) {
                toastr["error"]("Your passwords don't match.");
                return;
            }

            $scope.user.password = CryptoJS.SHA256($scope.password).toString(CryptoJS.enc.Hex);

            $http.post("/Home/RegisterUser", $scope.user)
                .then(function () { //Success Callback
                    toastr["success"]("User created.");
                    $http.post("/Home/Login", $scope.user)
                        .then(function () {
                            //TODO Make sure this works with the way we get sessionID
                            userService.set(response.data.user);
                            setCookie("sessionID", response.data.sessionID);
                            if (response.data.user.isInstructor) {
                                $location.path('/courses'); //Changes to the courses URL for Instructor
                            } else {
                                $location.path('/dashboard'); //Changes to the dashboard URL for normal user
                            }
                        }, function () {
                            toastr["error"]("Error logging in.");
                        });
                }, function () { //Failure Callback
                    toastr["error"]("Username already taken.");
                });
        };

        $scope.cancel = function () {
            $location.path('/'); //Changes to the login URL
        };

        $("#username").focus(); //Username focus for quicker typing
    }
});