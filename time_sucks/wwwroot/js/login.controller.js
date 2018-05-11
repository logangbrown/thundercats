angular.module('time').controller('LoginCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.user = {};
    $scope.password = '';

    $scope.load = function () {
        $scope.login = function () {
            if ($scope.user.username === '') {
                toastr['error']("Please enter a Username");
                return;
            } else if ($scope.password === '') {
                toastr["error"]("Please enter a Password");
                return;
            }

            $scope.user.password = CryptoJS.SHA256($scope.password).toString(CryptoJS.enc.Hex);

            //TODO Enable Login, disable dummy data
            //$http.post("/Home/LoginUser", $scope.user)
            //    .then(function (response) {
            //        $location.path('/dashboard'); //Changes to the dashboard URL for normal user
            //    }, function () {
            //        toastr["error"]("Username or password incorrect.");
            //    });

            //Dummy data
            $scope.$parent.user = {
                userID: '1',
                username: 'test',
                firstName: 'Test',
                lastName: 'User',
                isInstructor: true
            };
            toastr["info"]("Simulated login - enable REST endpoint");
            $location.path('/dashboard');
            //End Dummy Data
        };

        $scope.register = function () {
            $location.path('/register'); //Changes to the register URL
        };
        $scope.loaded = true;
        $("#username").focus(); //Focus on the username field for quicker login
    };

    if (!$scope.$parent.user || $scope.$parent.user === '') {
        //TODO Enable CheckSession
        //$http.get("/Home/CheckSession")
        //    .then(function (response) {
        //        if (response.data === '') {
        //            $scope.load();
        //            return;
        //        }
        //        $scope.$parent.user = response.data;
        //        $scope.$parent.loaded = true;
        //        if ($scope.$parent.user.isInstructor) $location.path('/courses');
        //        else $location.path('/dashboard');
        //    }, function () {
        //        $scope.load();
        //    });

        //Dummy
        $scope.load();
    } else {
        if ($scope.$parent.user.isInstructor) $location.path('/courses');
        else $location.path('/dashboard');
    }
});