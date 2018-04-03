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
        $scope.password = '';
        $scope.repeatPassword = '';

        $scope.createUser = function () {
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

            $http.post("/Home/Register", $scope.user)
                .then(function () { //Success Callback
                    toastr["success"]("User created.");
                    $http.post("/Home/Login", $scope.user)
                        .then(function () {
                            $location.path('/dashboard'); //Changes to the dashboard URL
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

        $("#username").focus();
    }
});