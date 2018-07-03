angular.module('time').controller('CoursesCtrl', ['$scope', '$http', '$routeParams', '$location', 'usSpinnerService', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.search = '';
    $scope.config = {};
    $scope.config.showInactiveCourses = false;

    $scope.load = function () {

        usSpinnerService.spin('spinner');
        $http.get("/Home/GetCourses")
            .then(function (response) {
                usSpinnerService.stop('spinner');
                $scope.courses = response.data;
            }, function () {
                usSpinnerService.stop('spinner');
                toastr["error"]("Error retrieving courses.");
            });

        $scope.createCourse = function () {
            $http.post("/Home/AddCourse", $scope.user)
                .then(function (response) {
                    $location.path('/course/'+response.data);
                }, function () {
                    toastr["error"]("Error creating course.");
                });
        };

        $scope.loaded = true;
    }

    //Standard login check, if there is a user, load the page, if not, redirect to login
    if (!$scope.$parent.user || $scope.$parent.user === '') {
        $http.get("/Home/CheckSession")
            .then(function (response) {
                $scope.$parent.user = response.data;
                $scope.$parent.loaded = true;
                $scope.load();
            }, function () {
                toastr["error"]("Not logged in.");
                $location.path('/login');
            });
    } else {
        $scope.load();
    }
}]);