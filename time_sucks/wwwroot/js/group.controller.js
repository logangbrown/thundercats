angular.module('time').controller('GroupCtrl', function ($scope, $http, $routeParams, $location, userService) {
    $scope.$parent.user = userService.get();
    $scope.newNumber = 10;

    //Check if a user is logged in, if not, redirect to login
    if (!$scope.$parent.user) {
        toastr["error"]("Not logged in.");
        $location.path('/login');
    } else { //TODO make Group controller
        $scope.groupID = $routeParams.ID;

        if (!$scope.groupID) $location.path('/courses');

        $scope.getGroup = function () {
            //TODO get real group
            if ($scope.groupID === "1") {
                return {
                    groupID: "1",
                    name: "Group Badass",
                    isActive: true,
                    users: {
                        1: {
                            userID: 1,
                            firstName: "Logan",
                            lastName: "Brown",
                            time: {
                                1: {
                                    timeID: "1",
                                    hours: "3",
                                    isEdited: false,
                                    timeIn: "04/05/18 19:30",
                                    timeOut: "04/05/18 21:30"
                                },
                                4: {
                                    timeID: "4",
                                    hours: "2",
                                    isEdited: true,
                                    timeIn: "04/05/18 19:30",
                                    timeOut: "04/05/18 21:30"
                                }
                            }
                        },
                        2: {
                            userID: 2,
                            firstName: "Rizwan",
                            lastName: "Mohammed",
                            time: {
                                2: {
                                    timeID: "2",
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
                                    timeID: "3",
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

        $scope.createTime = function (userID) {
            //TODO Create functionality: hit endpoint to make a time, on success, add time slot to the user using their userID and the new timeID
            $scope.group.users[userID].time[$scope.newNumber] = {
                timeID: $scope.newNumber,
                hours: "",
                isEdited: false,
                timeIn: "",
                timeOut: ""
            }
            $scope.newNumber++;
            toastr["info"]("Create time for userID " + userID);
        }

        $scope.saveGroup = function () {
            //TODO Save course functionality
            toastr["info"]("Attempted to save group.");
            $scope.updateChart();
        }

        $scope.isUser = function (userID) {
            return (userID === Number($scope.$parent.user.userID) || $scope.$parent.user.isInstructor);
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
    }
});