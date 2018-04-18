angular.module('time').controller('GroupCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.newNumber = 10; //TODO get rid of this

    $scope.load = function() {
        $scope._id = $routeParams.ID;

        if (!$scope._id) $location.path('/courses');

        $scope.getGroup = function () {
            //TODO Enable Group functionality, disable if statement below
            $http.post("/Home/Group", $scope._id)
                .then(function (response) {
                    return response.data;
                }, function () {
                    toastr["error"]("Failed to get group.");
                });


            if ($scope._id === "1") {
                return {
                    _id: "1",
                    name: "Group Awesome",
                    isActive: true,
                    users: {
                        '5ad54b26fb49e95bf06a1c92': {
                            _id: '5ad54b26fb49e95bf06a1c92',
                            firstName: "Logan",
                            lastName: "Brown",
                            time: {
                                1: {
                                    _id: "1",
                                    hours: "3",
                                    isEdited: false,
                                    timeIn: "04/05/18 19:30",
                                    timeOut: "04/05/18 21:30"
                                },
                                4: {
                                    _id: "4",
                                    hours: "2",
                                    isEdited: true,
                                    timeIn: "04/05/18 19:30",
                                    timeOut: "04/05/18 21:30"
                                }
                            }
                        },
                        '5ad54b26fb49e95bf06a1c93': {
                            _id: '5ad54b26fb49e95bf06a1c93',
                            firstName: "Rizwan",
                            lastName: "Mohammed",
                            time: {
                                2: {
                                    _id: "2",
                                    hours: "4",
                                    isEdited: false,
                                    timeIn: "04/05/18 19:30",
                                    timeOut: "04/05/18 21:30"
                                }
                            }
                        },
                        '5ad54b26fb49e95bf06a1c94': {
                            _id: '5ad54b26fb49e95bf06a1c94',
                            firstName: "Skylar",
                            lastName: "Olsen",
                            time: {
                                3: {
                                    _id: "3",
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
                return null;
            }
        }

        $scope.group = $scope.getGroup();

        $scope.createTime = function (id) {
            var data = {
                userID: id,
                groupID: $scope._id
            };

            //TODO Enable create time functionality, disable extra stuff below
            //$http.post("/Home/CreateTime", data)
            //    .then(function (response) {
            //        $scope.group.users[id].time[response.data] = {
            //            _id: response.data,
            //            hours: "",
            //            isEdited: false,
            //            timeIn: "",
            //            timeOut: ""
            //        }
            //    }, function () {
            //        toastr["error"]("Failed to create time.");
            //    });


            $scope.group.users[id].time[$scope.newNumber] = {
                _id: $scope.newNumber, 
                hours: "",
                isEdited: false,
                timeIn: "",
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
            toastr["info"]("Attempted to save group.");
            $scope.updateChart();
        }

        //Used to check whether the currently logged in user is trying to change their own time, or is an instructor
        $scope.isUser = function (id) {
            return (id === $scope.$parent.user._id || $scope.$parent.user.isInstructor);
        }

        var data = { //Data and labels are set in the setData function
            datasets: [{
                data: [],
                backgroundColor: [ //After 10 groups are included in a project, the color will just be gray, add more colors here if there can be more than 10 groups
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

        $scope.userInGroup = function () {
            //Checks that the current user is listed in the current group.
            //Should be used to hide the Join button if it's true
            for (var u in $scope.group.users) {
                if (u === $scope.$parent.user._id) {
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