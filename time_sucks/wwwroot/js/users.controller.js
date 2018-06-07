angular.module('time').controller('UsersCtrl', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.search = '';
    $scope.loaded = false;
    $scope.load = function() {
        usSpinnerService.spin('spinner');
        $http.get("/Home/GetUsers")
            .then(function (response) {
                $scope.users = response.data;
                usSpinnerService.stop('spinner');
                $scope.loaded = true;
                if (response.status == 204) {
                    toastr["error"]("Not an Admin.");
                    window.history.back();
                }
            }, function () {
                usSpinnerService.stop('spinner');
                toastr["error"]("Failed to get users.");
                $location.path('/dashboard');
            });

        $scope.saveUser = function (user) {
            $http.post("/Home/ChangeUser", user)
                .then(function (response) {
                    toastr["success"]("User saved.");
                }, function () {
                    toastr["error"]("Failed to save user.");
                });
        }
    }

    //Standard login check, if there is a user, load the page, if not, redirect to login
    if (!$scope.$parent.user || $scope.$parent.user === '') {
        $http.get("/Home/CheckSession")
            .then(function (response) {
                $scope.$parent.user = response.data;
                if ($scope.$parent.user.type !== 'A') {
                    toastr["error"]("Not Admin.");
                    $location.path('/dashboard');
                }
                $scope.$parent.loaded = true;
                $scope.load();
            }, function () {
                toastr["error"]("Not logged in.");
                $location.path('/login');
            });
    } else if ($scope.$parent.user.type !== 'A') {
        toastr["error"]("Not Admin.");
        $location.path('/dashboard');
    } else {
        $scope.load();
    }
});