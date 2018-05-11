angular.module('time').controller('MasterCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.user = null;
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

    $scope.userExists = function () {
        if ($scope.user !== null) {
            $('#navbarSupportedContent').removeClass('invisible');
            return true;
        } 
        return false;
    }

    $scope.logout = function () {
        //Enable Logout, disable dummy data and info toast
        //$http.get("/Home/Logout")
        //    .then(function (response) {
        //        $scope.user = null;
        //        $location.path('/login');
        //    }, function () {
        //        toastr["error"]("Failed to logout.");
        //    });

        //Dummy Data
        $scope.user = null;
        $location.path('/login');
        toastr["info"]("Simulated logout - enable REST endpoint");
    }
});