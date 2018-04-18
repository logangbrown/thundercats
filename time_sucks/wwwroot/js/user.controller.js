angular.module('time').controller('UserCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope._id = $routeParams.ID;

    if (!$scope._id) $location.path('/users');

    $scope.load = function() {
        $scope.getUser = function () {
            //TODO Enable User functionality, disable return below
            //$http.post("/Home/User", $scope._id)
            //    .then(function (response) {
            //        return response.data;
            //    }, function () {
            //        toastr["error"]("Failed to get user.");
            //        $location.path('/dashboard');
            //    });

            return {
                _id: '5ad54b26fb49e95bf06a1c92',
                username: "logan",
                firstName: "Logan",
                lastName: "Brown",
                isActive: true,
                isInstructor: false
            };
        }

        $scope.user = $scope.getUser();
        $scope.user.currentPassword = '';
        $scope.user.newPassword = '';
        $scope.user.repeatPassword = '';

        $scope.saveUser = function () {
            //TODO Enable save user functionality, disable info toast
            //$http.post("/Home/SaveUser", $scope.user)
            //    .then(function (response) {
            //        toastr["success"]("User saved.");
            //    }, function () {
            //        toastr["error"]("Failed to save user.");
            //    });
            toastr["info"]("Attempted to save user.");
        }

        $scope.changePassword = function () {
            if ($scope.user.username === '') {
                toastr['error']("Please enter a Username");
                return;
            } else if ($scope.user.displayName === '') {
                toastr['error']("Please enter a Display Name");
                return;
            } else if ($scope.user.newPassword === '') {
                toastr["error"]("Please enter a Password");
                return;
            } else if ($scope.user.repeatPassword !== $scope.password) {
                toastr["error"]("Your passwords don't match.");
                return;
            } else if (!$scope.$parent.user.isInstructor && $scope.user.currentPassword === '')

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

            toastr["info"]("Attempted to change password.");
        }
        $scope.loaded = true;
    }

    //Standard login check, if there is a user, load the page, if not, redirect to login
    if (!$scope.$parent.user || $scope.$parent.user === '') {
        $http.get("/Home/CheckSession")
            .then(function (response) {
                $scope.$parent.user = response.data;
                $scope.$parent.loaded = true;
                $scope.load();
            }, function () {
                toastr["error"]("Not logged in.");
                $location.path('/login');
            });
    } else if (!$scope.$parent.user.isInstructor && $scope.$parent.user._id !== $scope._id) {
        toastr["error"]("Not Instructor or the specified user.");
        $location.path('/dashboard');
    } else {
        $scope.load();
    }
});