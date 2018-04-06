angular.module('time').controller('CourseCtrl', function ($scope, $http, $routeParams, $location, userService) {
    $scope.$parent.user = userService.get();
    $scope.config = {};
    $scope.config.showInactiveProjects = false;

    //Check if a user is logged in, if not, redirect to login
    if (!$scope.$parent.user) {
        toastr["error"]("Not logged in.");
        $location.path('/login');
    } else {
        $scope.courseID = $routeParams.ID;

        if (!$scope.courseID) $location.path('/courses');

        $scope.getCourse = function () {
            //TODO get real course
            if ($scope.courseID === "12") {
                return {
                    name: "CS 3750 Spring 2018 MW 7:30",
                    courseID: "12",
                    instructorName: "Brad Peterson",
                    isActive: true,
                    projects: {
                        1: {
                            projectID: 1,
                            name: "PHP Game",
                            isActive: true
                        },
                        2: {
                            projectID: 2,
                            name: "Multiplayer Conway's Game of Life",
                            isActive: true
                        },
                        3: {
                            projectID: 3,
                            name: "Student Time Tracker",
                            isActive: false
                        }
                    },
                    users: {
                        1: {
                            userID: 1,
                            firstName: "Logan",
                            lastName: "Brown",
                            isActive: false
                        },
                        2: {
                            userID: 2,
                            firstName: "Rizwan",
                            lastName: "Mohammed",
                            isActive: true
                        },
                        3: {
                            userID: 3,
                            firstName: "Skylar",
                            lastName: "Olsen",
                            isActive: true
                        }
                    }
                };
            } else if ($scope.courseID === "14") {
                return {
                    name: "CS 3750 Fall 2018 MW 7:30",
                    id: "14",
                    instructorName: "Brad Peterson",
                    isActive: 1,
                    projects: {
                        3: {
                            projectID: 4,
                            name: "PHP Game",
                            isActive: true
                        },
                        4: {
                            projectID: 5,
                            name: "Multiplayer Conway's Game of Life",
                            isActive: true
                        },
                        5: {
                            projectID: 6,
                            name: "Student Time Tracker",
                            isActive: true
                        }
                    },
                    users: {
                        1: {
                            userID: 1,
                            firstName: "Logan",
                            lastName: "Brown",
                            isActive: true
                        },
                        2: {
                            userID: 2,
                            firstName: "Rizwan",
                            lastName: "Mohammed",
                            isActive: true
                        },
                        3: {
                            userID: 3,
                            firstName: "Skylar",
                            lastName: "Olsen",
                            isActive: false
                        }
                    }
                };
            } else {
                return {
                    name: "CS 3750 Spring 2019 MW 7:30",
                    courseID: "15",
                    instructorName: "Brad Peterson",
                    isActive: 0,
                    projects: {
                        1: {
                            projectID: 7,
                            name: "PHP Game",
                            isActive: true
                        },
                        2: {
                            projectID: 8,
                            name: "Multiplayer Conway's Game of Life",
                            isActive: true
                        },
                        3: {
                            projectID: 1,
                            name: "Student Time Tracker",
                            isActive: true
                        }
                    },
                    users: {
                        1: {
                            userID: 1,
                            firstName: "Logan",
                            lastName: "Brown",
                            isActive: false
                        },
                        2: {
                            userID: 2,
                            firstName: "Rizwan",
                            lastName: "Mohammed",
                            isActive: true
                        },
                        3: {
                            userID: 3,
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
            //TODO Create project functionality, progress to the new project page on success, using the passed back projectID
            toastr["info"]("Attempted to create a project.");
        }

        $scope.saveCourse = function () {
            //TODO Save course functionality
            toastr["info"]("Attempted to save course.");
        }

        $scope.joinCourse = function () {
            //TODO Join course functionality
            toastr["info"]("Attempted to join course.");
        }
    }
});