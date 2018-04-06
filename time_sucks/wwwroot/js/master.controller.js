angular.module('time').controller('MasterCtrl', function ($scope, $http, $routeParams, $location, userService) {

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "200",
        "hideDuration": "500",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    $scope.user = userService.get();

    $scope.updateUser = function () {
        userService.set($scope.user);
    }

    $scope.logout = function () {
        //TODO hit logout endpoint, and then set the user to null and redirect to the login page
        userService.set(null);
        $location.path('/login');
        toastr["info"]("Logged out. Refresh page to log back in.");
    }
});