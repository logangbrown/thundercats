angular.module('time').controller('LoginCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.user = {};
    $scope.password = '';

    $scope.load = function () {
        $scope.login = function () {
            if ($scope.user.username === '') {
                toastr['error']("Please enter a Username");
                return;
            } else if ($scope.password === '') {
                toastr["error"]("Please enter a Password");
                return;
            }

            $scope.user.password = CryptoJS.SHA256($scope.password).toString(CryptoJS.enc.Hex);

            $http.post("/Home/LoginUser", $scope.user)
                .then(function (response) {
                    $location.path('/dashboard'); //Changes to the dashboard URL for normal user
                }, function () {
                    toastr["error"]("Username or password incorrect.");
                });
        };

        $scope.register = function () {
            $location.path('/register'); //Changes to the register URL
        };
        $scope.loaded = true;
        $("#username").focus(); //Focus on the username field for quicker login
    };

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