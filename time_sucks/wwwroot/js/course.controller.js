angular.module('time').controller('CourseCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.config = {};
    $scope.config.showInactiveProjects = false;

    $scope.load = function() {
        $scope._id = $routeParams.ID;

        if (!$scope._id) $location.path('/courses');

        $scope.getCourse = function () {
            //TODO Enable course functionality, disable the big if statement below it
            //$http.post("/Home/GetCourse", $scope._id)
            //    .then(function (response) {
            //        return response.data;
            //    }, function () {
            //        toastr["error"]("Failed retrieving course.");
            //    });

            if ($scope._id === "12") {
                return {
                    name: "CS 3750 Spring 2018 MW 7:30",
                    _id: "12",
                    instructorName: "Brad Peterson",
                    isActive: true,
                    projects: {
                        1: {
                            _id: 1,
                            name: "PHP Game",
                            isActive: true
                        },
                        2: {
                            _id: 2,
                            name: "Multiplayer Conway's Game of Life",
                            isActive: true
                        },
                        3: {
                            _id: 3,
                            name: "Student Time Tracker",
                            isActive: false
                        }
                    },
                    users: {
                        1: {
                            _id: 1,
                            firstName: "Logan",
                            lastName: "Brown",
                            isActive: false
                        },
                        2: {
                            _id: 2,
                            firstName: "Rizwan",
                            lastName: "Mohammed",
                            isActive: true
                        },
                        3: {
                            _id: 3,
                            firstName: "Skylar",
                            lastName: "Olsen",
                            isActive: true
                        }
                    }
                };
            } else if ($scope._id === "14") {
                return {
                    name: "CS 3750 Fall 2018 MW 7:30",
                    _id: "14",
                    instructorName: "Brad Peterson",
                    isActive: 1,
                    projects: {
                        3: {
                            _id: 4,
                            name: "PHP Game",
                            isActive: true
                        },
                        4: {
                            _id: 5,
                            name: "Multiplayer Conway's Game of Life",
                            isActive: true
                        },
                        5: {
                            _id: 6,
                            name: "Student Time Tracker",
                            isActive: true
                        }
                    },
                    users: {
                        2: {
                            _id: 2,
                            firstName: "Rizwan",
                            lastName: "Mohammed",
                            isActive: true
                        },
                        3: {
                            _id: 3,
                            firstName: "Skylar",
                            lastName: "Olsen",
                            isActive: false
                        }
                    }
                };
            } else {
                return {
                    name: "CS 3750 Spring 2019 MW 7:30",
                    _id: "15",
                    instructorName: "Brad Peterson",
                    isActive: 0,
                    projects: {
                        1: {
                            _id: 7,
                            name: "PHP Game",
                            isActive: true
                        },
                        2: {
                            _id: 8,
                            name: "Multiplayer Conway's Game of Life",
                            isActive: true
                        },
                        3: {
                            _id: 1,
                            name: "Student Time Tracker",
                            isActive: true
                        }
                    },
                    users: {
                        1: {
                            _id: 1,
                            firstName: "Logan",
                            lastName: "Brown",
                            isActive: false
                        },
                        2: {
                            _id: 2,
                            firstName: "Rizwan",
                            lastName: "Mohammed",
                            isActive: true
                        },
                        3: {
                            _id: 3,
                            firstName: "Skylar",
                            lastName: "Olsen",
                            isActive: true
                        }
                    }
                };
            }
        }

        $scope.course = $scope.getCourse();

        $scope.createProject = function () {
            //TODO Enable create project functionality, disable info toast
            //$http.post("/Home/CreateProject", $scope.course)
            //    .then(function (response) {
            //        $location.path('/project/'+response.data);
            //    }, function () {
            //        toastr["error"]("Failed to create project.");
            //    });
            toastr["info"]("Attempted to create a project.");
        }

        $scope.saveCourse = function () {
            //TODO Enable save course functionality, disable info toast
            //$http.post("/Home/SaveCourse", $scope.course)
            //    .then(function (response) {
            //        toastr["success"]("Saved course.");
            //    }, function () {
            //        toastr["error"]("Failed saving course.");
            //    });
            toastr["info"]("Attempted to save course.");
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
            for (var u in $scope.course.users) {
                if (Number(u) === Number($scope.$parent.user._id)) {
                    return true;
                }
            }
            return false;
        }

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