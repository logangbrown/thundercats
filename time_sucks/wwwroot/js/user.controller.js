angular.module('time').controller('UserCtrl', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.userID = $routeParams.ID;
    $scope.user = {};

    if (!$scope.userID) $location.path('/users');

    $scope.load = function () {
        usSpinnerService.spin('spinner');
        $http.post("/Home/GetUser", { userID: $scope.userID })
            .then(function (response) {
                $scope.user = response.data;
                usSpinnerService.stop('spinner');
                $scope.loaded = true;
                if (response.status === 204) {
                    toastr["error"]("Unauthorized to view user.");
                    window.history.back();
                }
            }, function () {
                usSpinnerService.stop('spinner');
                toastr["error"]("Failed to get user.");
                $location.path('/dashboard');
            });

        $scope.user.currentPassword = '';
        $scope.user.newPassword = '';
        $scope.user.repeatPassword = '';

        $scope.saveUser = function () {
            $http.post("/Home/ChangeUser", $scope.user)
                .then(function (response) {
                    toastr["success"]("User saved.");
                }, function () {
                    toastr["error"]("Failed to save user.");
                });
        }

        $scope.changePassword = function () {
            if ($scope.user.username === '') {
                toastr['error']("Please enter a Username");
                return;
            } else if ($scope.user.newPassword === '') {
                toastr["error"]("Please enter a Password");
                return;
            } else if ($scope.user.repeatPassword !== $scope.password) {
                toastr["error"]("Your passwords don't match.");
                return;
            } else if ($scope.$parent.user.type !== 'A' && $scope.user.currentPassword === '') //TODO look at this

            $scope.user.currentPassword = CryptoJS.SHA256($scope.user.curretPassword).toString(CryptoJS.enc.Hex);
            $scope.user.newPassword = CryptoJS.SHA256($scope.user.newPassword).toString(CryptoJS.enc.Hex);
            $scope.user.repeatPassword = CryptoJS.SHA256($scope.user.repeatPassword).toString(CryptoJS.enc.Hex);

            //TODO Enable Change Password functionality, disable info toast
            //$http.post("/Home/ChangePassword", $scope.user)
            //    .then(function (response) {
            //        toastr["success"]("Password changed.");
            //    }, function () {
            //        toastr["error"]("Failed to change password.");
            //    });

            toastr["info"]("Attempted to change password - enable REST endpoint");
        }
    }

    //Standard login check, if there is a user, load the page, if not, redirect to login
    if (!$scope.$parent.user || $scope.$parent.user === '') {
        $http.get("/Home/CheckSession")
            .then(function (response) {
                $scope.$parent.user = response.data;
                if ($scope.$parent.user.type !== 'A' && $scope.$parent.user.userID !== $scope.userID) {
                    toastr["error"]("Not Admin or the specified user.");
                    $location.path('/dashboard');
                }
                $scope.$parent.loaded = true;
                $scope.load();
            }, function () {
                toastr["error"]("Not logged in.");
                $location.path('/login');
            });
    } else if ($scope.$parent.user.type !== 'A' && $scope.$parent.user.userID !== $scope.userID) {
        toastr["error"]("Not Admin or the specified user.");
        $location.path('/dashboard');
    } else {
        $scope.load();
    }
});