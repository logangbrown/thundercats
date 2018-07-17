angular.module('time').controller('DashboardCtrl', ['$scope', '$http', '$routeParams', '$location', 'usSpinnerService', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.load = function () {
        $scope.groups = {};

        $http.get("/Home/GetDashboard")
            .then(function (response) {
                $scope.groups = response.data;
            }, function () {
                toastr["error"]("Error retrieving dashboard groups.");
            });

        $scope.loaded = true;
    }

    //Standard login check, if there is a user, load the page, if not, redirect to login
    usSpinnerService.spin('spinner');
    $http.get("/Home/CheckSession")
        .then(function (response) {
            usSpinnerService.stop('spinner');
            $scope.$parent.user = response.data;
            $scope.$parent.loaded = true;
            $scope.load();
        }, function () {
            usSpinnerService.stop('spinner');
            toastr["error"]("Not logged in.");
            $location.path('/login');
        });
}]);