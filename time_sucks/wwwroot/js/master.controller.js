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

    //Cookie Testing
    //$scope.setCookie = function () {
    //    setCookie("sessionID", "123456", 1);
    //}

    //$scope.getCookie = function () {
    //    console.log(getCookie("sessionID"));
    //}

    //$scope.deleteCookie = function () {
    //    deleteCookie();
    //}

    $scope.user = userService.get();

    $scope.updateUser = function () {
        userService.set($scope.user);
    }

    $scope.logout = function () {
        //TODO Enable logout functionality, disable stuff below
        //$http.get("/Home/Logout")
        //    .then(function (response) {
        //        userService.set(null);
        //        deleteCookie();
        //        $location.path('/login');
        //    }, function () {
        //        toastr["error"]("Failed to logout.");
        //    });

        userService.set(null);
        $location.path('/login');
        toastr["info"]("Logged out. Refresh page to log back in.");
    }
});