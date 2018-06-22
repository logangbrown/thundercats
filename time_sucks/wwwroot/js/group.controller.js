angular.module('time').controller('GroupCtrl', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.group = {};
    $scope.group.users = {};
    $scope.newNumber = 13; //TODO get rid of this

    $scope.load = function() {
        $scope.groupID = $routeParams.ID;

        if (!$scope.groupID) $location.path('/courses');

        
        //TODO Enable Group functionality, disable dummy data
        //$http.post("/Home/GetGroup", $scope.groupID)
        //    .then(function (response) {
        //        $scope.group = response.data;
        //    }, function () {
        //        toastr["error"]("Failed to get group.");
        //    });

        //Dummy data
        if ($scope.groupID === "1") {
            $scope.group = {
                groupID: 1,
                groupName: "Group Awesome",
                isActive: true,
                users: {
                    1: {
                        userID: 1,
                        firstName: "Joe",
                        lastName: "Bob",
                        isActive: true,
                        time: {
                            1: {
                                timeID: 1,
                                hours: "",
                                isEdited: false,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            },
                            9: {
                                timeID: 9,
                                hours: "",
                                isEdited: true,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            },
                            10: {
                                timeID: 10,
                                hours: "",
                                isEdited: true,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            },
                            11: {
                                timeID: 11,
                                hours: "",
                                isEdited: false,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            },
                            12: {
                                timeID: 12,
                                hours: "",
                                isEdited: false,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            }
                        }
                    },
                    2: {
                        userID: 2,
                        firstName: "Joes",
                        lastName: "Bobs",
                        isActive: true,
                        time: {
                            2: {
                                timeID: 2,
                                hours: "",
                                isEdited: false,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            }
                        }
                    },
                    3: {
                        userID: 3,
                        firstName: "Skylar",
                        lastName: "Olsen",
                        isActive: false,
                        time: {
                            3: {
                                timeID: 3,
                                hours: "",
                                isEdited: false,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            }
                        }
                    },
                    4: {
                        userID: 4,
                        firstName: "Test",
                        lastName: "User",
                        isActive: true,
                        time: {
                            4: {
                                timeID: 4,
                                hours: "",
                                isEdited: false,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            }
                        }
                    },
                    5: {
                        userID: 5,
                        firstName: "Test",
                        lastName: "User2",
                        isActive: true,
                        time: {
                            5: {
                                timeID: 5,
                                hours: "",
                                isEdited: false,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            }
                        }
                    },
                    6: {
                        userID: 6,
                        firstName: "Test",
                        lastName: "User3",
                        isActive: true,
                        time: {
                            6: {
                                timeID: 6,
                                hours: "",
                                isEdited: false,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            }
                        }
                    },
                    7: {
                        userID: 7,
                        firstName: "Test",
                        lastName: "User4",
                        isActive: true,
                        time: {
                            7: {
                                timeID: 7,
                                hours: "",
                                isEdited: false,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            }
                        }
                    },
                    8: {
                        userID: 8,
                        firstName: "Test",
                        lastName: "User5",
                        isActive: true,
                        time: {
                            8: {
                                timeID: 8,
                                hours: "",
                                isEdited: false,
                                timeIn: "04/05/2018 7:30 PM",
                                timeOut: "04/05/2018 9:30 PM",
                                desc: "Description of things I did."
                            }
                        }
                    }
                }
            };
        } else {
            toastr["info"]("No dummy data for this group.");
            window.history.back();
        }

        $.each($scope.group.users, function (userID, user) {
            $scope.group.users[userID].blank = {
                timeID: userID+'-blank',
                hours: '',
                isEdited: false,
                timeIn: '',
                timeOut: '',
                desc: ''
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
            //        $scope.group.users[id].time[response.data] = {
            //            timeID: response.data,
            //            hours: "",
            //            isEdited: false,
            //            timeIn: "",
            //            timeOut: ""
            //        }
            //    }, function () {
            //        toastr["error"]("Failed to create time.");
            //    });


            $scope.group.users[id].time[$scope.newNumber] = {
                timeID: $scope.newNumber, 
                hours: "",
                isEdited: false,
                timeIn: startTime,
                timeOut: "",
                desc: ""
            }
            $scope.newNumber++;
            toastr["info"]("Create time for user: " + id);
        }

        $scope.createTimeFromBlank = function (id) {
            var data = {
                userID: id,
                groupID: $scope.groupID
            };

            if ($scope.group.users[id].blank.timeIn === '' && $scope.group.users[id].blank.timeOut === '' && $scope.group.users[id].blank.desc === '')
                return;

            //TODO Enable create time functionality, disable extra stuff below
            //$http.post("/Home/CreateTime", data)
            //    .then(function (response) {
            //        $scope.group.users[id].time[response.data] = {
            //            timeID: response.data,
            //            hours: "",
            //            isEdited: false,
            //            timeIn: "",
            //            timeOut: ""
            //        }
            //    }, function () {
            //        toastr["error"]("Failed to create time.");
            //    });

            $scope.group.users[id].time[$scope.newNumber] = {
                timeID: $scope.newNumber,
                hours: '',
                isEdited: false,
                timeIn: $scope.group.users[id].blank.timeIn,
                timeOut: $scope.group.users[id].blank.timeOut,
                desc: $scope.group.users[id].blank.desc
            };
            $scope.newNumber++;
            $scope.group.users[id].blank.timeIn = '';
            $scope.group.users[id].blank.timeOut = '';
            $scope.group.users[id].blank.desc = '';

            toastr["info"]("Create time for user: " + id);
        }

        $scope.leaveGroup = function() {
            if (confirm('Are you sure you want to leave this group?')) {
                //TODO Enable leave course functionality, disable info toast
                //$http.post("/Home/LeaveGroup", $scope.groupID)
                //    .then(function (response) {
                //          $scope.group.users[$scope.$parent.user.userID].isActive = false;
                //        };
                //    }, function () {
                //        toastr["error"]("Failed to leave the group.");
                //    });
                $scope.group.users[$scope.$parent.user.userID].isActive = false;
                toastr["info"]("Attempted to leave group - enable REST endpoint.");
            } else {
                // Do nothing!
            }
        }

        $scope.joinGroup = function () {
            //TODO Enable leave course functionality, disable info toast
            //$http.post("/Home/JoinGroup", $scope.groupID)
            //    .then(function (response) {
            //          //TODO Give them a real response if they are blocked because they are part of another group
            //        $scope.group.users[$scope.$parent.user.userID] = {
            //            userID: $scope.$parent.user.userID,
            //            firstName: $scope.$parent.user.firstName,
            //            lastName: $scope.$parent.user.lastName,
            //            isActive: true,
            //            time: {}
            //        };
            //    }, function () {
            //        toastr["error"]("Failed to leave the group.");
            //    });
            $scope.group.users[$scope.$parent.user.userID] = {
                        userID: $scope.$parent.user.userID,
                        firstName: $scope.$parent.user.firstName,
                        lastName: $scope.$parent.user.lastName,
                        isActive: true,
                        time: {}
                    };
            toastr["info"]("Attempted to leave group - enable REST endpoint.");
        }



        $scope.saveGroup = function () {
            //TODO Enable save group functionality, disable info toast
            //$http.post("/Home/SaveGroup", $scope.group)
            //    .then(function (response) {
            //        toastr["success"]("Group saved.");
            //    }, function () {
            //        toastr["error"]("Failed to save group.");
            //    });
            toastr["info"]("Attempted to save group - enable REST endpoint");
            $scope.updateChart();
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

        $scope.hasUnfinishedBusiness = function () {
            var hasUnfinishedBusiness = false;
            if ($scope.userInGroup()) {
                $.each($scope.group.users[$scope.$parent.user.userID].time, function (index, time) {
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
                $.each($scope.group.users[$scope.$parent.user.userID].time, function (index, time) {
                    if (time.timeIn !== '' && time.timeOut === '') {
                        $scope.group.users[$scope.$parent.user.userID].time[time.timeID].timeOut = moment().format('MM/DD/YYYY h:mm A');
                        $scope.group.users[$scope.$parent.user.userID].time[time.timeID].hours = moment.duration(
                            moment($scope.group.users[$scope.$parent.user.userID].time[time.timeID].timeOut).diff(
                                $scope.group.users[$scope.$parent.user.userID].time[time.timeID].timeIn)).asHours().toFixed(2);
                        return false;
                    }
                });
            } else {
                toastr["error"]("The logged in user isn't a member of the group.");
            }
        }

        $scope.saveTime = function (userID, timeID) {
            //$scope.formatTime(userID, timeID);
            if ($scope.group.users[userID].time[timeID].timeIn === '' || $scope.group.users[userID].time[timeID].timeOut === ''){
                $scope.group.users[userID].time[timeID].hours = 0;
            } else {
                $scope.group.users[userID].time[timeID].hours = moment.duration(
                    moment($scope.group.users[userID].time[timeID].timeOut).diff(
                        $scope.group.users[userID].time[timeID].timeIn)).asHours().toFixed(2);
            }
            $scope.updateChart();
            //TODO Make a new call to save the time entry alone
        }

        $scope.diffHours = function (timeIn, timeOut) {
            if (timeIn === '' || timeOut === '') return "0.00";
            return moment.duration(moment(timeOut).diff(timeIn)).asHours().toFixed(2);
        }

        $scope.formatTime = function (userID, timeID) {
            //if ($scope.group.users[userID].time[timeID].timeIn !== '') $scope.group.users[userID].time[timeID].timeIn = moment($scope.group.users[userID].time[timeID].timeIn).format('MM/DD/YY HH:mm');
            //if ($scope.group.users[userID].time[timeID].timeOut !== '') $scope.group.users[userID].time[timeID].timeOut = moment($scope.group.users[userID].time[timeID].timeOut).format('MM/DD/YY HH:mm');
        };

        //Used to check whether the currently logged in user is trying to change their own time, or is an instructor
        $scope.isUser = function (id) {
            if (!$scope.$parent.user) return false;
            return (id === $scope.$parent.user.userID || $scope.$parent.user.type === 'A');
        }

        $scope.updateAllHours = function () {
            $.each($scope.group.users, function (index, user) {
                $.each(user.time, function (index, time) {
                    if (time.timeIn !== '' && time.timeOut !== '') {
                        $scope.group.users[user.userID].time[time.timeID].hours = moment.duration(
                            moment($scope.group.users[user.userID].time[time.timeID].timeOut).diff(
                                $scope.group.users[user.userID].time[time.timeID].timeIn)).asHours().toFixed(2);
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
                for (var t in u.time) {
                    t = u.time[t];
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

        //Dummy data
        //toastr["error"]("Not logged in - enable REST endpoint");
        //$location.path('/login');
    } else {
        $scope.load();
    }
});