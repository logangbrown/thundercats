angular.module('time').controller('DashboardCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.load = function () {
        $scope.groups = {};

        //TODO Enable Dashboard groups functionality, disable return below
        //$http.get("/Home/Dashboard")
        //    .then(function (response) {
        //        $scope.groups = response.data;
        //    }, function () {
        //        toastr["error"]("Error retrieving dashboard groups.");
        //    });

        $scope.loaded = true;
    }

    //Standard login check, if there is a user, load the page, if not, redirect to login
    if (!$scope.$parent.user || $scope.$parent.user === '') {
        $http.get("/Home/CheckSession")
            .then(function (response) {
                $scope.$parent.user = response.data;
                if (response.data.isInstructor) $location.path('/courses');
                $scope.$parent.loaded = true;
                $scope.load();
            }, function () {
                toastr["error"]("Not logged in.");
                $location.path('/login');
            });
    } else if ($scope.$parent.user.isInstructor) {
        $location.path('/courses');
    } else {
        $scope.load();
    }


});