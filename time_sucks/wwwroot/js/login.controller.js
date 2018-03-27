angular.module('time').controller('LoginCtrl', function ($scope, $http, $routeParams, $location) {

    $scope.hello = "";
    $scope.user = {};
    $scope.user.username = '';
    $scope.user.password = '';
    $scope.password = '';

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

    $scope.login = function () {
        if ($scope.user.username === '') {
            toastr['error']("Please enter a Username");
            return;
        } else if ($scope.password === '') {
            toastr["error"]("Please enter a Password");
            return;
        }

        $scope.user.password = CryptoJS.SHA256($scope.password).toString(CryptoJS.enc.Hex);

        $http.post("/Home/Login", $scope.user)
            .then(function () {
                $location.path('/game'); //Changes to the game URL
            }, function () {
                toastr["error"]("Username or password incorrect.");
            });
    };

    $scope.register = function () {
        $location.path('/register'); //Changes to the register URL
    };

    $("#username").focus();

});