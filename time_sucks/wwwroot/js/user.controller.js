angular.module('time').controller('UserCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.userID = $routeParams.ID;

    if (!$scope.userID) $location.path('/users');

    $scope.load = function() {
        //TODO Enable User functionality, disable dummy data
        //$http.post("/Home/User", $scope.userID)
        //    .then(function (response) {
        //        $scope.user response.data;
        //    }, function () {
        //        toastr["error"]("Failed to get user.");
        //        $location.path('/dashboard');
        //    });

        $scope.user = {
            userID: '1',
            username: "test",
            firstName: "Test",
            lastName: "User",
            isActive: true,
            isInstructor: true
        };
        
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
            toastr["info"]("Attempted to save user - enable REST endpoint");
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

            toastr["info"]("Attempted to change password - enable REST endpoint");
        }
        $scope.loaded = true;
    }

    //Standard login check, if there is a user, load the page, if not, redirect to login
    if (!$scope.$parent.user || $scope.$parent.user === '') {
        //TODO Enable CheckSession, remove dummy data
        //$http.get("/Home/CheckSession")
        //    .then(function (response) {
        //        $scope.$parent.user = response.data;
        //        if (!$scope.$parent.user.isInstructor && $scope.$parent.user.userID !== $scope.userID) {
        //            toastr["error"]("Not Instructor or the specified user.");
        //            $location.path('/dashboard');
        //        }
        //        $scope.$parent.loaded = true;
        //        $scope.load();
        //    }, function () {
        //        toastr["error"]("Not logged in.");
        //        $location.path('/login');
        //    });

        //Dummy data
        toastr["error"]("Not logged in - enable REST endpoint");
        $location.path('/login');
    } else if (!$scope.$parent.user.isInstructor && $scope.$parent.user.userID !== $scope.userID) {
        toastr["error"]("Not Instructor or the specified user.");
        $location.path('/dashboard');
    } else {
        $scope.load();
    }
});