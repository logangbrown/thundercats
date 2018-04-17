angular.module('time').controller('RegisterCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;

    $scope.load = function () {
        $scope.user = {};
        $scope.user.firstName = '';
        $scope.user.lastName = '';
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
                    $location.path('/dashboard');
                }, function () { //Failure Callback
                    toastr["error"]("Username already taken.");
                });
        };

        $scope.cancel = function () {
            $location.path('/'); //Changes to the login URL
        };

        $scope.loaded = true;

        $("#username").focus(); //Username focus for quicker typing
    };

    //Check if a user is logged in, if they are, redirect to appropriate page
    if (!$scope.$parent.user || $scope.$parent.user === '') {
        $http.get("/Home/CheckSession")
            .then(function (response) {
                if (response.data === '') {
                    $scope.load();
                    return;
                }
                $scope.$parent.user = response.data;
                $scope.$parent.loaded = true;
                if ($scope.$parent.user.isInstructor) $location.path('/courses');
                else $location.path('/dashboard');
            }, function () {
                $scope.load();
            });
    } else {
        if ($scope.$parent.user.isInstructor) $location.path('/courses');
        else $location.path('/dashboard');
    }
});