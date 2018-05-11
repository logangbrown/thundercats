angular.module('time').controller('ProjectCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.config = {};
    $scope.config.showInactiveGroups = false;

    $scope.load = function() {

        $scope.projectID = $routeParams.ID;

        if (!$scope.projectID) $location.path('/courses');

        //TODO Enable Project (rename GetProject), disable dummy data
        //$http.post("/Home/Project", { projectID: $scope.projectID })
        //    .then(function (response) {
        //        $scope.project = response.data;
        //    }, function () {
        //        toastr["error"]("Failed to retrieve project.");
        //    });

        //Dummy Data
        if ($scope.projectID === "1") {
            $scope.project = {
                name: "PHP Game",
                projectID: "1",
                isActive: true,
                groups: {
                    1: {
                        groupID: "1",
                        name: "Group Awesome",
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
                                        isEdited: false
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
                                        isEdited: false
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
                                        isEdited: false
                                    }
                                }
                            }
                        }
                    },
                    2: {
                        groupID: "2",
                        name: "Group One Thing",
                        isActive: true,
                        users: {
                            1: {
                                userID: 1,
                                firstName: "Logan",
                                lastName: "Brown",
                                time: {
                                    4: {
                                        timeID: "4",
                                        hours: "1",
                                        isEdited: false
                                    }
                                }
                            },
                            2: {
                                userID: 2,
                                firstName: "Rizwan",
                                lastName: "Mohammed",
                                time: {
                                    5: {
                                        timeID: "5",
                                        hours: "1",
                                        isEdited: false
                                    }
                                }
                            },
                            3: {
                                userID: 3,
                                firstName: "Skylar",
                                lastName: "Olsen",
                                time: {
                                    6: {
                                        timeID: "6",
                                        hours: "1",
                                        isEdited: false
                                    }
                                }
                            }
                        }
                    },
                    3: {
                        groupID: "3",
                        name: "Group Other Thing",
                        isActive: true,
                        users: {
                            1: {
                                userID: 1,
                                firstName: "Logan",
                                lastName: "Brown",
                                time: {
                                    7: {
                                        timeID: "7",
                                        hours: "2",
                                        isEdited: false
                                    }
                                }
                            },
                            2: {
                                userID: 2,
                                firstName: "Rizwan",
                                lastName: "Mohammed",
                                time: {
                                    8: {
                                        timeID: "8",
                                        hours: "2",
                                        isEdited: false
                                    }
                                }
                            },
                            3: {
                                userID: 3,
                                firstName: "Skylar",
                                lastName: "Olsen",
                                time: {
                                    9: {
                                        timeID: "9",
                                        hours: "2",
                                        isEdited: false
                                    }
                                }
                            }
                        }
                    },
                    4: {
                        groupID: "4",
                        name: "Group Four (Inactive)",
                        isActive: false,
                        users: {
                            1: {
                                userID: 1,
                                firstName: "Logan",
                                lastName: "Brown",
                                time: {
                                    10: {
                                        timeID: "10",
                                        hours: "2",
                                        isEdited: false
                                    }
                                }
                            },
                            2: {
                                userID: 2,
                                firstName: "Rizwan",
                                lastName: "Mohammed",
                                time: {
                                    11: {
                                        timeID: "11",
                                        hours: "2",
                                        isEdited: false
                                    }
                                }
                            },
                            3: {
                                userID: 3,
                                firstName: "Skylar",
                                lastName: "Olsen",
                                time: {
                                    12: {
                                        timeID: "12",
                                        hours: "2",
                                        isEdited: false
                                    }
                                }
                            }
                        }
                    }
                }
            };
        } else {
            toastr["info"]("No dummy data for this project.");
            window.history.back();
        }

        $scope.createGroup = function () {
            //TODO Enable Create Group functionality, disable info toast
            //$http.post("/Home/CreateGroup", $scope.projectID)
            //    .then(function (response) {
            //        $location.path('/group/'+response.data);
            //    }, function () {
            //        toastr["error"]("Failed to create group.");
            //    });
            toastr["info"]("Attempted to create a group - enable REST endpoint");
        }

        $scope.saveProject = function () {
            //TODO Enable SaveProject, disable info toast
            //$http.post("/Home/SaveProject", $scope.project)
            //    .then(function (response) {
            //        toastr["success"]("Saved group.");
            //    }, function () {
            //        toastr["error"]("Failed to save group.");
            //    });

            toastr["info"]("Attempted to save a project - enable REST endpoint");
        }

        var data = { //Data and labels are set in the setData function
            datasets: [{
                data: [],
                backgroundColor: [ //After 30 groups are included in a project, the color will just be gray, add more colors here if there can be more than 30 groups
                    '#2C3E50', '#3498DB', '#18BC9C', '#F39C12', '#e83e8c', '#6610f2', '#fd7e14', '#E74C3C', '#6f42c1', '#95a5a6',
                    '#2C3E50', '#3498DB', '#18BC9C', '#F39C12', '#e83e8c', '#6610f2', '#fd7e14', '#E74C3C', '#6f42c1', '#95a5a6',
                    '#2C3E50', '#3498DB', '#18BC9C', '#F39C12', '#e83e8c', '#6610f2', '#fd7e14', '#E74C3C', '#6f42c1', '#95a5a6',
                ]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: []
            
        };

        $scope.setData = function () {
            if (!$scope.project || !$scope.project.groups) return;
            data.datasets[0].data = [];
            data.labels = [];
            for (var g in $scope.project.groups) {
                g = $scope.project.groups[g];
                if (!g.isActive && !$scope.config.showInactiveGroups) continue;
                var hours = 0;
                for (var u in g.users) {
                    u = g.users[u];
                    for (var t in u.time) {
                        t = u.time[t];
                        hours += Number(t.hours);
                    }
                }
                data.datasets[0].data.push(hours);
                data.labels.push(g.name);
            }
        }

        $scope.setData();

        var ctx = $("#projectHours");

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
        //TODO Enable CheckSession, remove dummy data
        //$http.get("/Home/CheckSession")
        //    .then(function (response) {
        //        $scope.$parent.user = response.data;
        //        $scope.$parent.loaded = true;
        //        $scope.load();
        //    }, function () {
        //        toastr["error"]("Not logged in.");
        //        $location.path('/login');
        //    });

        //Dummy data
        toastr["error"]("Not logged in - enable REST endpoint");
        $location.path('/login');
    } else {
        $scope.load();
    }
});