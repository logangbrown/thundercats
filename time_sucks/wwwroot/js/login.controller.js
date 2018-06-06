angular.module('time').controller('LoginCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.user = {};
    $scope.password = '';
    var hashedPass = '';

    $scope.load = function () {
        $scope.login = function () {
            if ($scope.user.username === '') {
                toastr['error']("Please enter a Username");
                return;
            } else if ($scope.password === '') {
                toastr["error"]("Please enter a Password");
                return;
            }

            //TODO Reenable hashing
            //$scope.user.password = CryptoJS.SHA256($scope.password).toString(CryptoJS.enc.Hex);

            $scope.user.password = $scope.password;
            
            $http.post("/Home/LoginUser", $scope.user)
                .then(function (response) {
                    if (response.status === 204) {
                        toastr["error"]("Username does not exist.");
                    } else {
                        $location.path('/dashboard'); //Changes to the dashboard URL for normal user
                    }
                }, function (response) {
                    if (response.status === 401) {
                        toastr["error"]("Password incorrect.")
                    } else if (response.status === 403) {
                        toastr["error"]("User account has been deactivated.")
                    }
                });

            //Dummy data
            //$scope.$parent.user = {
            //    userID: '1',
            //    username: 'test',
            //    firstName: 'Test',
            //    lastName: 'User',
            //    type: 'S'
            //};
            //toastr["info"]("Simulated login - enable REST endpoint");
            //$location.path('/dashboard');
            //End Dummy Data
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
                if ($scope.$parent.user.type === 'A' || $scope.$parent.user.type === 'I') $location.path('/courses');
                else $location.path('/dashboard');
            }, function () {
                $scope.load();
            });
    } else {
        if ($scope.$parent.user.type === 'A' || $scope.$parent.user.type === 'I') $location.path('/courses');
        else $location.path('/dashboard');
    }
});