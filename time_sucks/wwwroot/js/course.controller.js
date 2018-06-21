﻿angular.module('time').controller('CourseCtrl', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.config = {};
    $scope.config.showInactiveProjects = false;

    $scope.load = function() {
        $scope.courseID = $routeParams.ID;

        if (!$scope.courseID) $location.path('/courses');

        usSpinnerService.spin('spinner');
        $http.post("/Home/GetCourse", { courseID: $scope.courseID })
            .then(function (response) {
                usSpinnerService.stop('spinner');
                $scope.course = response.data;
                if (!$scope.course.users) $scope.course.users = null;
                if (!$scope.course.projects) $scope.course.projects = null;
            }, function () {
                usSpinnerService.stop('spinner');
                toastr["error"]("Failed retrieving course.");
            });

        //Dummy Data
        //{
        //    //if ($scope.courseID === "12") {
        //    //    $scope.course = {
        //    //        courseName: "CS 3750 Spring 2018 MW 7:30",
        //    //        courseID: 12,
        //    //        instructorName: "Brad Peterson",
        //    //        instructorID: 68,
        //    //        isActive: true,
        //    //        projects: {
        //    //            1: {
        //    //                projectID: 1,
        //    //                projectName: "PHP Game",
        //    //                isActive: true
        //    //            },
        //    //            2: {
        //    //                projectID: 2,
        //    //                projectName: "Multiplayer Conway's Game of Life",
        //    //                isActive: true
        //    //            },
        //    //            3: {
        //    //                projectID: 3,
        //    //                projectName: "Student Time Tracker",
        //    //                isActive: false
        //    //            }
        //    //        },
        //    //        users: {
        //    //            1: {
        //    //                userID: 1,
        //    //                firstName: "Joe",
        //    //                lastName: "Bob",
        //    //                isActive: true
        //    //            },
        //    //            2: {
        //    //                userID: 2,
        //    //                firstName: "Rizwan",
        //    //                lastName: "Mohammed",
        //    //                isActive: false
        //    //            },
        //    //            3: {
        //    //                userID: 3,
        //    //                firstName: "Skylar",
        //    //                lastName: "Olsen",
        //    //                isActive: true
        //    //            }
        //    //        }
        //    //    };
        //    //} else if ($scope.courseID === "14") {
        //    //    $scope.course = {
        //    //        courseName: "CS 3750 Fall 2018 MW 7:30",
        //    //        id: 14,
        //    //        instructorName: "Brad Peterson",
        //    //        isActive: true,
        //    //        projects: {
        //    //            3: {
        //    //                projectID: 4,
        //    //                projectName: "PHP Game",
        //    //                isActive: true
        //    //            },
        //    //            4: {
        //    //                projectID: 5,
        //    //                projectName: "Multiplayer Conway's Game of Life",
        //    //                isActive: true
        //    //            },
        //    //            5: {
        //    //                projectID: 6,
        //    //                projectName: "Student Time Tracker",
        //    //                isActive: true
        //    //            }
        //    //        },
        //    //        users: {
        //    //            2: {
        //    //                userID: 2,
        //    //                firstName: "Rizwan",
        //    //                lastName: "Mohammed",
        //    //                isActive: true
        //    //            },
        //    //            3: {
        //    //                userID: 3,
        //    //                firstName: "Skylar",
        //    //                lastName: "Olsen",
        //    //                isActive: false
        //    //            }
        //    //        }
        //    //    };
        //    //} else if ($scope.courseID === "15") {
        //    //    $scope.course = {
        //    //        courseName: "CS 3750 Spring 2019 MW 7:30",
        //    //        courseID: 15,
        //    //        instructorName: "Brad Peterson",
        //    //        isActive: 0,
        //    //        projects: {
        //    //            1: {
        //    //                projectID: 7,
        //    //                projectName: "PHP Game",
        //    //                isActive: true
        //    //            },
        //    //            2: {
        //    //                projectID: 8,
        //    //                projectName: "Multiplayer Conway's Game of Life",
        //    //                isActive: true
        //    //            },
        //    //            3: {
        //    //                projectID: 1,
        //    //                projectName: "Student Time Tracker",
        //    //                isActive: true
        //    //            }
        //    //        },
        //    //        users: {
        //    //            1: {
        //    //                userID: 1,
        //    //                firstName: "Logan",
        //    //                lastName: "Brown",
        //    //                isActive: false
        //    //            },
        //    //            2: {
        //    //                userID: 2,
        //    //                firstName: "Rizwan",
        //    //                lastName: "Mohammed",
        //    //                isActive: true
        //    //            },
        //    //            3: {
        //    //                userID: 3,
        //    //                firstName: "Skylar",
        //    //                lastName: "Olsen",
        //    //                isActive: true
        //    //            }
        //    //        }
        //    //    };
        //    //} else {
        //    //    toastr["info"]("No dummy data for this course.");
        //    //    window.history.back();
        //    //}
        //} 
        //End Dummy Data

        $scope.createProject = function () {
            //TODO Enable CreateProject, disable info toast
            //$http.post("/Home/CreateProject", $scope.course)
            //    .then(function (response) {
            //        $location.path('/project/'+response.data);
            //    }, function () {
            //        toastr["error"]("Failed to create project.");
            //    });

            toastr["info"]("Attempted to create project - enable REST endpoint.");
        }

        $scope.saveCourse = function () {
            //TODO Enable SaveCourse, disable info toast
            $http.post("/Home/SaveCourse", $scope.course)
                .then(function (response) {
                    toastr["success"]("Saved course.");
                }, function () {
                    toastr["error"]("Failed saving course.");
                });

            //toastr["info"]("Attempted to save course - enable REST endpoint.");
        }

        $scope.joinCourse = function () {
            //TODO Enable join course functionality, disable info toast
            //$http.post("/Home/JoinCourse", $scope.courseID)
            //    .then(function (response) {
            //        $scope.course.users[$scope.$parent.user.userID] = {
            //            userID: $scope.$parent.user.userID,
            //            firstName: $scope.$parent.user.firstName,
            //            lastName: $scope.$parent.user.lastName,
            //            isActive: false
            //        };
            //        toastr["info"]("You've requested to join the course. The instructor must accept your request before you can join any groups.");
            //    }, function () {
            //        toastr["error"]("Failed to join course.");
            //    });
            toastr["info"]("Attempted to join course - enable REST endpoint.");
        }

        $scope.leaveCourse = function () {
            if (confirm('Are you sure you want to leave this course? If you would like to rejoin the course later, you must contact the instructor to be added back into it.')) {
                //TODO Enable leave course functionality, disable info toast
                //$http.post("/Home/LeaveCourse", $scope.courseID)
                //    .then(function (response) {
                //        $scope.course.users[$scope.$parent.user.userID] = {
                //            userID: $scope.$parent.user.userID,
                //            firstName: $scope.$parent.user.firstName,
                //            lastName: $scope.$parent.user.lastName,
                //            isActive: false
                //        };
                //        toastr["info"]("You've requested to join the course. The instructor must accept your request before you can join any groups.");
                //    }, function () {
                //        toastr["error"]("Failed to join course.");
                //    });
                $scope.course.users[$scope.$parent.user.userID].isActive = false;
                toastr["info"]("Attempted to leave course - enable REST endpoint.");
            } else {
                // Do nothing!
            }
        }

        $scope.deleteUserFromCourse = function (userID) {
            if (confirm('Are you sure you want to delete this user from the course?')) {
                $http.post("/Home/DeleteUserCourse", { userID: userID, courseID: $scope.courseID })
                    .then(function (response) {
                        delete $scope.course.users[userID];
                    }, function (response) {
                        if (response.status === 500) {
                            toastr["error"]("Failed to delete user from course, query error.");
                        } else if (response.status === 401) {
                            toastr["error"]("Unauthorized to delete this user from the course.");
                        } else {
                            toastr["error"]("Failed to delete user from course, unknown error.");
                        }
                        });
            } else {
                // Do nothing!
            }
        }

        $scope.userInCourse = function () {
            //Checks that the current user is listed in the current course.
            //Should be used to hide the Join button if it's true
            var inCourse = false;
            if (!$scope.course) return false;
            $.each($scope.course.users, function (index, user) {
                if (user.userID === $scope.$parent.user.userID) {
                    inCourse = true;
                }
            });
            return inCourse;
        }

        $scope.userActiveInCourse = function () {
            //Checks that the current user is listed in the current course.
            //Should be used to hide the Join button if it's true
            var inCourse = false;
            if (!$scope.course) return false;
            $.each($scope.course.users, function (index, user) {
                if (user.userID === $scope.$parent.user.userID) {
                    if (user.isActive) inCourse = true;
                }
            });
            return inCourse;
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

        //Dummy data
        //toastr["error"]("Not logged in - enable REST endpoint");
        //$location.path('/login');
    } else {
        $scope.load();
    }
});