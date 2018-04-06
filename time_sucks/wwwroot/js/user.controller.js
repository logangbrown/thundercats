angular.module('time').controller('UserCtrl', function ($scope, $http, $routeParams, $location, userService) {
    $scope.$parent.user = userService.get();

    $scope.userID = $routeParams.ID;

    if (!$scope.userID) $location.path('/users');

    //Check if a user is logged in, if not, redirect to login
    if (!$scope.$parent.user) {
        toastr["error"]("Not logged in.");
        $location.path('/login');
    } else if (!$scope.$parent.user.isInstructor && Number($scope.$parent.user.userID) !== Number($scope.userID)) {
        toastr["error"]("Not Instructor or the specified user.");
        $location.path('/dashboard');
    } else {
        $scope.getUser = function () {
            //TODO get real user, on fail kick back to dashboard, might be lying about being an instructor or the specified user
            return {
                userID: 1,
                username: "logan",
                firstName: "Logan",
                lastName: "Brown",
                isActive: false,
                isInstructor: true
            };
        }

        $scope.user = $scope.getUser();
        $scope.user.currentPassword = '';
        $scope.user.newPassword = '';
        $scope.user.repeatPassword = '';

        $scope.saveUser = function () {
            //TODO Save user functionality
            toastr["info"]("Attempted to save user.");
        }

        $scope.changePassword = function () {
            //TODO update password functionality
            toastr["info"]("Attempted to change password.");
        }
    }
});