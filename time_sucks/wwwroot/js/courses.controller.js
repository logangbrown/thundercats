angular.module('time').controller('CoursesCtrl', function ($scope, $http, $routeParams, $location, userService) {
    $scope.$parent.user = userService.get();
    $scope.showInactive = false;


    //Check if a user is logged in, if not, redirect to login
    if (!$scope.$parent.user) {
        toastr["error"]("Not logged in.");
        $location.path('/login');
    } else { //TODO make Courses controller

        $scope.getCourses = function () {
            return {
                12: { name: "CS 3750 Spring 2018 MW 7:30", courseID: "12", instructorName: "Brad Peterson", isActive: true },
                14: { name: "CS 3750 Fall 2018 MW 7:30", courseID: "14", instructorName: "Brad Peterson", isActive: true },
                15: { name: "CS 3750 Spring 2019 MW 7:30", courseID: "15", instructorName: "Brad Peterson", isActive: false }
            };
        }

        $scope.$parent.user.isInstructor = 1;
        $scope.courses = $scope.getCourses();


        $scope.createCourse = function () {
            toastr["success"]("Create Course!");
        };

        
    }
});