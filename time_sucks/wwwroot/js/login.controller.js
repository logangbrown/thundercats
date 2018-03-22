angular.module('time').controller('LoginCtrl', function ($scope, $http, $routeParams, $location) {

    $scope.hello = "";

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

    $http.get("/Home/Hello")
        .then(function (response) {
            $scope.hello = response.data;
            toastr["success"]("You got data from the server!");
        }, function () {
            toastr["error"]("Error on GET.");
        });

});