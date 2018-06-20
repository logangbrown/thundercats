angular.module('time').controller('CoursesCtrl', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.search = '';
    $scope.config = {};
    $scope.config.showInactiveCourses = false;

    $scope.load = function() {

       // TODO enable Courses (rename GetCourses), remove dummy data
        $http.get("/Home/GetCourses")
            .then(function (response) {
                $scope.courses = response.data;
            }, function () {
                toastr["error"]("Error retrieving courses.");
            });

        //Dummy Data
        //$scope.courses = {
        //    12: { courseName: "CS 3750 Spring 2018 MW 7:30", courseID: 12, instructorName: "Brad Peterson", isActive: true },
        //    14: { courseName: "CS 3750 Fall 2018 MW 7:30", courseID: 14, instructorName: "Brad Peterson", isActive: true },
        //    15: { courseName: "CS 3750 Spring 2019 MW 7:30", courseID: 15, instructorName: "Brad Peterson", isActive: false }
        //};

        $scope.createCourse = function () {
            //TODO Enable AddCourse (Rename CreateCourse?), disable info toast
            $http.post("/Home/AddCourse", $scope.user)
                .then(function (response) {
                    $location.path('/course/'+response.data);
                }, function () {
                    toastr["error"]("Error creating course.");
                });

            //toastr["info"]("Attempted to create course - enable REST endpoint");
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

        //Dummy data
        //toastr["error"]("Not logged in - enable REST endpoint");
        //$location.path('/login');
    } else {
        $scope.load();
    }
});