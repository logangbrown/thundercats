angular.module('time').controller('MasterCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
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

    $scope.user = null;

    $scope.logout = function () {
        $http.get("/Home/Logout")
            .then(function (response) {
                $scope.user = null;
                $location.path('/login');
            }, function () {
                toastr["error"]("Failed to logout.");
            });
    }
});