﻿angular.module('time').controller('GroupCtrl', ['$scope', '$http', '$routeParams', '$location', 'usSpinnerService', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.group = {};
    $scope.group.users = {};
    //$scope.newNumber = 13; //TODO get rid of this

    $scope.load = function() {
        $scope.groupID = $routeParams.ID;

        if (!$scope.groupID) $location.path('/courses');
        
        //TODO Enable Group functionality, disable dummy data
        usSpinnerService.spin('spinner');
        $http.post("/Home/GetGroup", { groupID: $scope.groupID })
            .then(function (response) {
                $scope.group = {}
                $scope.group.evalID = response.data.evalID;
                $scope.group.groupID = response.data.groupID;
                $scope.group.groupName = response.data.groupName;
                $scope.group.isActive = response.data.isActive;
                $scope.group.projectID = response.data.projectID;
                $scope.group.users = {};
                //Setting users to be in the index of their userID
                $.each(response.data.users, function (index, user) {
                    $scope.group.users[user.userID] = {};
                    $scope.group.users[user.userID].firstName = user.firstName;
                    $scope.group.users[user.userID].lastName = user.lastName;
                    $scope.group.users[user.userID].isActive = user.isActive;
                    $scope.group.users[user.userID].userID = user.userID;
                    $scope.group.users[user.userID].timecards = {};
                    $.each(user.timecards, function (index, timecard) {
                        $scope.group.users[user.userID].timecards[timecard.timeslotID] = timecard;
                        $scope.group.users[user.userID].timecards[timecard.timeslotID].hours = "";
                    });
                });
                $scope.updateAllHours();
                $scope.updateChart();
                usSpinnerService.stop('spinner');
            }, function (response) {
                usSpinnerService.stop('spinner');
                if (response.status === 401) {
                    toastr["error"]("Unauthorized to view this group.");
                    window.history.back();
                } else {
                    toastr["error"]("Error getting group.");
                }
            });

        $.each($scope.group.users, function (userID, user) {
            $scope.group.users[userID].blank = {
                timeslotID: userID+'-blank',
                hours: '',
                isEdited: false,
                timeIn: '',
                timeOut: '',
                description: ''
            }
        });

        $scope.createTime = function (id, startTime = '') {
            var data = {
                userID: id,
                groupID: $scope.groupID
            };

            //TODO Enable create time functionality, disable extra stuff below
            //$http.post("/Home/CreateTime", data)
            //    .then(function (response) {
            //        $scope.group.users[id].timecards[response.data] = {
            //            timeslotID: response.data,
            //            hours: "",
            //            isEdited: false,
            //            timeIn: "",
            //            timeOut: ""
            //        }
            //    }, function () {
            //        toastr["error"]("Failed to create time.");
            //    });


            $scope.group.users[id].timecards[$scope.newNumber] = {
                timeslotID: $scope.newNumber, 
                hours: "",
                isEdited: false,
                timeIn: startTime,
                timeOut: "",
                description: ""
            }
            $scope.newNumber++;
            toastr["info"]("Dummy: Created time for user: " + id);
        }

        $scope.createTimeFromBlank = function (id) {
            var data = {
                userID: id,
                groupID: $scope.groupID
            };

            if ($scope.group.users[id].blank.timeIn === '' && $scope.group.users[id].blank.timeOut === '' && $scope.group.users[id].blank.description === '')
                return;

            //TODO Enable create time functionality, disable extra stuff below
            //$http.post("/Home/CreateTime", data)
            //    .then(function (response) {
            //        $scope.group.users[id].timecards[response.data] = {
            //            timeslotID: response.data,
            //            hours: "",
            //            isEdited: false,
            //            timeIn: "",
            //            timeOut: ""
            //        }
            //    }, function () {
            //        toastr["error"]("Failed to create time.");
            //    });

            $scope.group.users[id].timecards[$scope.newNumber] = {
                timeslotID: $scope.newNumber,
                hours: '',
                isEdited: false,
                timeIn: $scope.group.users[id].blank.timeIn,
                timeOut: $scope.group.users[id].blank.timeOut,
                description: $scope.group.users[id].blank.description
            };
            $scope.newNumber++;
            $scope.group.users[id].blank.timeIn = '';
            $scope.group.users[id].blank.timeOut = '';
            $scope.group.users[id].blank.description = '';

            toastr["info"]("Create time for user: " + id);
        }

        $scope.leaveGroup = function() {
            if (confirm('Are you sure you want to leave this group?')) {
                usSpinnerService.spin('spinner');
                $http.post("/Home/LeaveGroup", { groupID: $scope.groupID })
                    .then(function (response) {
                        if (response.status === 204) {
                            delete $scope.group.users[$scope.$parent.user.userID];
                        } else {
                            $scope.group.users[$scope.$parent.user.userID].isActive = false;
                        }
                        usSpinnerService.stop('spinner');
                        toastr["success"]("You left the group.");
                    }, function (response) {
                        usSpinnerService.stop('spinner');
                        if (response.status === 401) toastr["error"]("You are not part of this group.");
                        else toastr["error"]("Failed to leave the group, unknown error.");
                    });
            } else {
                // Do nothing!
            }
        }

        $scope.joinGroup = function () {
            usSpinnerService.spin('spinner');
            $http.post("/Home/JoinGroup", { groupID: $scope.groupID })
                .then(function (response) {
                    if (response.status === 204) {
                        $scope.group.users[$scope.$parent.user.userID].isActive = true;
                    } else {
                        $scope.group.users[$scope.$parent.user.userID] = {
                            userID: $scope.$parent.user.userID,
                            firstName: $scope.$parent.user.firstName,
                            lastName: $scope.$parent.user.lastName,
                            isActive: true,
                            timecards: {}
                        };
                    }
                    usSpinnerService.stop('spinner');
                    toastr["success"]("You have joined the group.");
                    
                }, function (response) {
                    usSpinnerService.stop('spinner');
                    if (response.status === 401) toastr["error"]("You are not part of this course.");
                    else if (response.status === 403) toastr["error"]("You are already active in a different group. Please leave that group before joining a new one.");
                    else toastr["error"]("Failed to join the group, unknown error.");
                });
        }

        $scope.saveGroup = function () {
            $http.post("/Home/SaveGroup", {
                groupID: $scope.group.groupID,
                groupName: $scope.group.groupName,
                isActive: $scope.group.isActive,
                evalID: $scope.group.evalID,
                projectID: $scope.group.projectID
            })
                .then(function (response) {
                    toastr["success"]("Group saved.");
                }, function (response) {
                    if (response.status === 401) toastr["error"]("Unauthorized to change this group.");
                    else toastr["error"]("Failed to save group, unknown error.");
                });
        }

        $scope.userInGroup = function () {
            //Checks that the current user is listed in the current group.
            if (!$scope.$parent.user) return false;

            var inGroup = false;
            if (!$scope.group) return false;
            $.each($scope.group.users, function (index, user) {
                if (Number(user.userID) === Number($scope.$parent.user.userID)) {
                    inGroup = true;
                }
            });
            return inGroup;
        }

        $scope.userActiveInGroup = function () {
            //Checks that the current user is listed in the current group.
            if (!$scope.$parent.user) return false;

            var inGroup = false;
            if (!$scope.group) return false;
            $.each($scope.group.users, function (index, user) {
                if (Number(user.userID) === Number($scope.$parent.user.userID) && user.isActive) {
                    inGroup = true;
                }
            });
            return inGroup;
        }

        $scope.hasUnfinishedBusiness = function () {
            var hasUnfinishedBusiness = false;
            if ($scope.userInGroup()) {
                $.each($scope.group.users[$scope.$parent.user.userID].timecards, function (index, time) {
                    if (time.timeIn !== '' && time.timeOut === '') hasUnfinishedBusiness = true;
                });
            }
            return hasUnfinishedBusiness;
        }

        $scope.startTime = function () {
            if ($scope.userInGroup()) {
                $scope.createTime($scope.$parent.user.userID, moment().format('MM/DD/YYYY h:mm A'));
            } else {
                toastr["error"]("The logged in user isn't a member of the group.");
            }
        }

        $scope.endTime = function () {
            if ($scope.userInGroup()) {
                $.each($scope.group.users[$scope.$parent.user.userID].timecards, function (index, time) {
                    if (time.timeIn !== '' && time.timeOut === '') {
                        $scope.group.users[$scope.$parent.user.userID].timecards[time.timeslotID].timeOut = moment().format('MM/DD/YYYY h:mm A');
                        $scope.group.users[$scope.$parent.user.userID].timecards[time.timeslotID].hours = moment.duration(
                            moment($scope.group.users[$scope.$parent.user.userID].timecards[time.timeslotID].timeOut).diff(
                                $scope.group.users[$scope.$parent.user.userID].timecards[time.timeslotID].timeIn)).asHours().toFixed(2);
                        return false;
                    }
                });
            } else {
                toastr["error"]("The logged in user isn't a member of the group.");
            }
        }

        $scope.saveTime = function (userID, timeslotID) {

            $http.post("/Home/SaveTime", $scope.group.users[userID].timecards[timeslotID])
                .then(function (response) {
                    if ($scope.group.users[userID].timecards[timeslotID].timeIn === '' || $scope.group.users[userID].timecards[timeslotID].timeOut === '') {
                        $scope.group.users[userID].timecards[timeslotID].hours = 0;
                    } else {
                        $scope.group.users[userID].timecards[timeslotID].hours = moment.duration(
                            moment($scope.group.users[userID].timecards[timeslotID].timeOut).diff(
                                $scope.group.users[userID].timecards[timeslotID].timeIn)).asHours().toFixed(2);
                    }
                    $scope.updateChart();
                }, function (response) {
                    if (response.status === 401) toastr["error"]("Unauthorized to edit this time entry.");
                    else toastr["error"]("Failed to save time entry, unknown error.");
                });
        }

        $scope.diffHours = function (timeIn, timeOut) {
            if (timeIn === '' || timeOut === '') return "0.00";
            return moment.duration(moment(timeOut).diff(timeIn)).asHours().toFixed(2);
        }

        //Used to check whether the currently logged in user is trying to change their own time, or is an instructor
        $scope.isUser = function (id) {
            if (!$scope.$parent.user) return false;
            return (id === $scope.$parent.user.userID || $scope.$parent.user.type === 'A');
        }

        $scope.updateAllHours = function () {
            $.each($scope.group.users, function (index, user) {
                $.each(user.timecards, function (index, time) {
                    if (time.timeIn !== '' && time.timeOut !== '') {
                        $scope.group.users[user.userID].timecards[time.timeslotID].hours = moment.duration(
                            moment($scope.group.users[user.userID].timecards[time.timeslotID].timeOut).diff(
                                $scope.group.users[user.userID].timecards[time.timeslotID].timeIn)).asHours().toFixed(2);
                    }
                });
            });
        }


        var data = { //Data and labels are set in the setData function
            datasets: [{
                data: [],
                backgroundColor: [ //After 30 groups are included in a project, the color will just be gray, add more colors here if there can be more than 30 groups
                    '#2C3E50', '#3498DB', '#18BC9C', '#F39C12', '#e83e8c', '#6610f2', '#fd7e14', '#E74C3C', '#6f42c1', '#95a5a6',
                    '#2C3E50', '#3498DB', '#18BC9C', '#F39C12', '#e83e8c', '#6610f2', '#fd7e14', '#E74C3C', '#6f42c1', '#95a5a6',
                    '#2C3E50', '#3498DB', '#18BC9C', '#F39C12', '#e83e8c', '#6610f2', '#fd7e14', '#E74C3C', '#6f42c1', '#95a5a6'
                ]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: []

        };

        $scope.setData = function () {
            data.datasets[0].data = [];
            data.labels = [];
            for (var u in $scope.group.users) {
                u = $scope.group.users[u];
                var hours = 0;
                for (var t in u.timecards) {
                    t = u.timecards[t];
                    hours += Number(t.hours);
                }
                data.datasets[0].data.push(hours);
                data.labels.push(u.firstName+" "+u.lastName);
            }
        }

        $scope.setData();

        var ctx = $("#groupHours");

        var myChart = new Chart(ctx, {
            type: 'pie',
            data: data
        });

        $scope.updateChart = function () {
            $scope.setData();
            myChart.update();
        }

        $scope.updateAllHours();
        $scope.updateChart();

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