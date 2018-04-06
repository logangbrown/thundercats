angular.module('time').controller('CoursesCtrl', function ($scope, $http, $routeParams, $location, userService) {
    $scope.$parent.user = userService.get();
    $scope.config = {};
    $scope.config.showInactiveCourses = false;

    //Check if a user is logged in, if not, redirect to login
    if (!$scope.$parent.user) {
        toastr["error"]("Not logged in.");
        $location.path('/login');
    } else {

        $scope.getCourses = function () {
            //TODO Get real courses
            return {
                12: { name: "CS 3750 Spring 2018 MW 7:30", courseID: "12", instructorName: "Brad Peterson", isActive: true },
                14: { name: "CS 3750 Fall 2018 MW 7:30", courseID: "14", instructorName: "Brad Peterson", isActive: true },
                15: { name: "CS 3750 Spring 2019 MW 7:30", courseID: "15", instructorName: "Brad Peterson", isActive: false }
            };
        }

        $scope.courses = $scope.getCourses();


        $scope.createCourse = function () {
            //TODO Create course, advance to new course page on success, using the passed back courseID
            toastr["info"]("Attempted to create a course");
        };

        
    }
});