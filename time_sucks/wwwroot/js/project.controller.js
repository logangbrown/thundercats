angular.module('time').controller('ProjectCtrl', function ($scope, $http, $routeParams, $location, userService) {
    $scope.$parent.user = userService.get();

    //Check if a user is logged in, if not, redirect to login
    if (!$scope.$parent.user) {
        toastr["error"]("Not logged in.");
        $location.path('/login');
    } else { //TODO make Project controller

    }
});