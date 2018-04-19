angular.module('time').controller('CourseCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.config = {};
    $scope.config.showInactiveProjects = false;

    $scope.load = function() {
        $scope._id = $routeParams.ID;

        if (!$scope._id) $location.path('/courses');

        $http.post("/Home/GetCourse", { _id: $scope._id })
            .then(function (response) {
                $scope.course = response.data;
                if (!$scope.course.users) $scope.course.users = null;
                if (!$scope.course.projects) $scope.course.projects = null;
            }, function () {
                toastr["error"]("Failed retrieving course.");
            });       

        $scope.createProject = function () {
            $http.post("/Home/CreateProject", $scope.course)
                .then(function (response) {
                    $location.path('/project/'+response.data);
                }, function () {
                    toastr["error"]("Failed to create project.");
                });
        }

        $scope.saveCourse = function () {
            $http.post("/Home/SaveCourse", $scope.course)
                .then(function (response) {
                    toastr["success"]("Saved course.");
                }, function () {
                    toastr["error"]("Failed saving course.");
                });
        }

        $scope.joinCourse = function () {
            //TODO Enable join course functionality, disable info toast
            //$http.post("/Home/JoinCourse", $scope._id)
            //    .then(function (response) {
            //        $scope.courses.users[$scope.$parent.user._id] = {
            //            _id: $scope.$parent.user._id,
            //            firstName: $scope.$parent.user.firstName,
            //            lastName: $scope.$parent.user.lastName,
            //            isActive: false
            //        };
            //        toastr["info"]("You've requested to join the course. The instructor must accept your request before you can join any groups.");
            //    }, function () {
            //        toastr["error"]("Failed to join course.");
            //    });
            toastr["info"]("Attempted to join course.");
        }

        $scope.userInCourse = function () {
            //Checks that the current user is listed in the current course.
            //Should be used to hide the Join button if it's true
            if (!$scope.course) return false;
            for (var u in $scope.course.users) {
                if (u === $scope.$parent.user._id) {
                    return true;
                }
            }
            return false;
        }

        $scope.hasProjects = function () {
            if ($scope.course) return !angular.equals([], $scope.course.projects);
            return false;
        };

        $scope.hasUsers = function () {
            if ($scope.course) return !angular.equals([], $scope.course.users);
            return false;
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
});