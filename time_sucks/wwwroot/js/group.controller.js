angular.module('time').controller('GroupCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.group = {};
    $scope.group.users = {};
    $scope.newNumber = 10; //TODO get rid of this

    $scope.load = function() {
        $scope.groupID = $routeParams.ID;

        if (!$scope.groupID) $location.path('/courses');

        
        //TODO Enable Group functionality, disable dummy data
        //$http.post("/Home/Group", $scope.groupID)
        //    .then(function (response) {
        //        $scope.group = response.data;
        //    }, function () {
        //        toastr["error"]("Failed to get group.");
        //    });

        //Dummy data
        if ($scope.groupID === "1") {
            $scope.group = {
                groupID: 1,
                name: "Group Awesome",
                isActive: true,
                users: {
                    1: {
                        userID: 1,
                        firstName: "Joe",
                        lastName: "Bob",
                        time: {
                            1: {
                                timeID: 1,
                                hours: "3",
                                isEdited: false,
                                timeIn: "04/05/18 19:30",
                                timeOut: "04/05/18 21:30"
                            },
                            4: {
                                timeID: 4,
                                hours: "2",
                                isEdited: true,
                                timeIn: "04/05/18 19:30",
                                timeOut: "04/05/18 21:30"
                            }
                        }
                    },
                    2: {
                        userID: 2,
                        firstName: "Joes",
                        lastName: "Bobs",
                        time: {
                            2: {
                                timeID: 2,
                                hours: "4",
                                isEdited: false,
                                timeIn: "04/05/18 19:30",
                                timeOut: "04/05/18 21:30"
                            }
                        }
                    },
                    3: {
                        userID: 3,
                        firstName: "Skylar",
                        lastName: "Olsen",
                        time: {
                            3: {
                                timeID: 3,
                                hours: "5",
                                isEdited: false,
                                timeIn: "04/05/18 19:30",
                                timeOut: "04/05/18 21:30"
                            }
                        }
                    },
                    4: {
                        userID: 3,
                        firstName: "Skylar",
                        lastName: "Olsen",
                        time: {
                            3: {
                                timeID: 3,
                                hours: "5",
                                isEdited: false,
                                timeIn: "04/05/18 19:30",
                                timeOut: "04/05/18 21:30"
                            }
                        }
                    },
                    5: {
                        userID: 3,
                        firstName: "Skylar",
                        lastName: "Olsen",
                        time: {
                            3: {
                                timeID: 3,
                                hours: "5",
                                isEdited: false,
                                timeIn: "04/05/18 19:30",
                                timeOut: "04/05/18 21:30"
                            }
                        }
                    },
                    6: {
                        userID: 3,
                        firstName: "Skylar",
                        lastName: "Olsen",
                        time: {
                            3: {
                                timeID: 3,
                                hours: "5",
                                isEdited: false,
                                timeIn: "04/05/18 19:30",
                                timeOut: "04/05/18 21:30"
                            }
                        }
                    },
                    7: {
                        userID: 3,
                        firstName: "Skylar",
                        lastName: "Olsen",
                        time: {
                            3: {
                                timeID: 3,
                                hours: "5",
                                isEdited: false,
                                timeIn: "04/05/18 19:30",
                                timeOut: "04/05/18 21:30"
                            }
                        }
                    },
                    8: {
                        userID: 3,
                        firstName: "Skylar",
                        lastName: "Olsen",
                        time: {
                            3: {
                                timeID: 3,
                                hours: "5",
                                isEdited: false,
                                timeIn: "04/05/18 19:30",
                                timeOut: "04/05/18 21:30"
                            }
                        }
                    }
                }
            };
        } else {
            toastr["info"]("No dummy data for this group.");
            window.history.back();
        }

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
                timeOut: ""
            }
            $scope.newNumber++;
            toastr["info"]("Create time for user: " + id);
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
                $scope.createTime($scope.$parent.user.userID, moment().format('MM/DD/YY HH:mm'));
            } else {
                toastr["error"]("The logged in user isn't a member of the group.");
            }
        }

        $scope.endTime = function () {
            if ($scope.userInGroup()) {
                $.each($scope.group.users[$scope.$parent.user.userID].time, function (index, time) {
                    if (time.timeIn !== '' && time.timeOut === '') {
                        $scope.group.users[$scope.$parent.user.userID].time[time.timeID].timeOut = moment().format('MM/DD/YY HH:mm');
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
            if ($scope.group.users[userID].time[timeID].timeIn === '' || $scope.group.users[userID].time[timeID].timeOut === ''){
                $scope.group.users[userID].time[timeID].hours = 0;
            } else {
                $scope.group.users[userID].time[timeID].hours = moment.duration(
                    moment($scope.group.users[userID].time[timeID].timeOut).diff(
                        $scope.group.users[userID].time[timeID].timeIn)).asHours().toFixed(2);
            }
            //TODO Make a new call to save the time entry alone
        }

        //Used to check whether the currently logged in user is trying to change their own time, or is an instructor
        $scope.isUser = function (id) {
            return (id === $scope.$parent.user.userID || $scope.$parent.user.type === 'A');
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