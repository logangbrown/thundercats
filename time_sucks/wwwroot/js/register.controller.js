angular.module('time').controller('RegisterCtrl', function ($scope, $http, $routeParams, $location, userService) {

    $scope.user = {};
    $scope.user.username = '';
    $scope.user.password = '';
    $scope.user.displayName = '';
    $scope.password = '';
    $scope.repeatPassword = '';

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

    $scope.createUser = function () {
        if ($scope.user.username === '') {
            toastr['error']("Please enter a Username");
            return;
        } else if ($scope.user.displayName === '') {
            toastr['error']("Please enter a Display Name");
            return;
        } else if ($scope.password === '') {
            toastr["error"]("Please enter a Password");
            return;
        } else if ($scope.repeatPassword !== $scope.password) {
            toastr["error"]("Your passwords don't match.");
            return;
        }

        $scope.user.password = CryptoJS.SHA256($scope.password).toString(CryptoJS.enc.Hex);

        $http.post("/Home/Register", $scope.user)
            .then(function () { //Success Callback
                toastr["success"]("User created.");
                $http.post("/Home/Login", $scope.user)
                    .then(function () {
                        $location.path('/dashboard'); //Changes to the dashboard URL
                    }, function () {
                        toastr["error"]("Error logging in.");
                    });
            }, function () { //Failure Callback
                toastr["error"]("Username already taken.");
            });
    };

    $scope.cancel = function () {
        $location.path('/'); //Changes to the login URL
    };

    $("#username").focus();
});