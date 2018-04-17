angular.module('time').controller('ProjectCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.config = {};
    $scope.config.showInactiveGroups = false;

    $scope.load = function() {

        $scope._id = $routeParams.ID;

        if (!$scope._id) $location.path('/courses');

        $scope.getProject = function () {
            //TODO Enable get project functionality, disable stuff below
            //$http.post("/Home/Project", $scope._id)
            //    .then(function (response) {
            //        return response.data;
            //    }, function () {
            //        toastr["error"]("Failed to retrieve project.");
            //    });

            if ($scope._id === "1") {
                return {
                    name: "PHP Game",
                    _id: "1",
                    isActive: true,
                    groups: {
                        1: {
                            _id: "1",
                            name: "Group Badass",
                            isActive: true,
                            users: {
                                1: {
                                    _id: 1,
                                    firstName: "Logan",
                                    lastName: "Brown",
                                    time: {
                                        1: {
                                            _id: "1",
                                            hours: "3",
                                            isEdited: false
                                        }
                                    }
                                },
                                2: {
                                    _id: 2,
                                    firstName: "Rizwan",
                                    lastName: "Mohammed",
                                    time: {
                                        2: {
                                            _id: "2",
                                            hours: "4",
                                            isEdited: false
                                        }
                                    }
                                },
                                3: {
                                    _id: 3,
                                    firstName: "Skylar",
                                    lastName: "Olsen",
                                    time: {
                                        3: {
                                            _id: "3",
                                            hours: "5",
                                            isEdited: false
                                        }
                                    }
                                }
                            }
                        },
                        2: {
                            _id: "2",
                            name: "Group One Thing",
                            isActive: true,
                            users: {
                                1: {
                                    _id: 1,
                                    firstName: "Logan",
                                    lastName: "Brown",
                                    time: {
                                        4: {
                                            _id: "4",
                                            hours: "1",
                                            isEdited: false
                                        }
                                    }
                                },
                                2: {
                                    _id: 2,
                                    firstName: "Rizwan",
                                    lastName: "Mohammed",
                                    time: {
                                        5: {
                                            _id: "5",
                                            hours: "1",
                                            isEdited: false
                                        }
                                    }
                                },
                                3: {
                                    _id: 3,
                                    firstName: "Skylar",
                                    lastName: "Olsen",
                                    time: {
                                        6: {
                                            _id: "6",
                                            hours: "1",
                                            isEdited: false
                                        }
                                    }
                                }
                            }
                        },
                        3: {
                            _id: "3",
                            name: "Group Other Thing",
                            isActive: true,
                            users: {
                                1: {
                                    _id: 1,
                                    firstName: "Logan",
                                    lastName: "Brown",
                                    time: {
                                        7: {
                                            _id: "7",
                                            hours: "2",
                                            isEdited: false
                                        }
                                    }
                                },
                                2: {
                                    _id: 2,
                                    firstName: "Rizwan",
                                    lastName: "Mohammed",
                                    time: {
                                        8: {
                                            _id: "8",
                                            hours: "2",
                                            isEdited: false
                                        }
                                    }
                                },
                                3: {
                                    _id: 3,
                                    firstName: "Skylar",
                                    lastName: "Olsen",
                                    time: {
                                        9: {
                                            _id: "9",
                                            hours: "2",
                                            isEdited: false
                                        }
                                    }
                                }
                            }
                        },
                        4: {
                            _id: "4",
                            name: "Group Four (Inactive)",
                            isActive: false,
                            users: {
                                1: {
                                    _id: 1,
                                    firstName: "Logan",
                                    lastName: "Brown",
                                    time: {
                                        10: {
                                            _id: "10",
                                            hours: "2",
                                            isEdited: false
                                        }
                                    }
                                },
                                2: {
                                    _id: 2,
                                    firstName: "Rizwan",
                                    lastName: "Mohammed",
                                    time: {
                                        11: {
                                            _id: "11",
                                            hours: "2",
                                            isEdited: false
                                        }
                                    }
                                },
                                3: {
                                    _id: 3,
                                    firstName: "Skylar",
                                    lastName: "Olsen",
                                    time: {
                                        12: {
                                            _id: "12",
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
                return null;
            }
        }

        $scope.project = $scope.getProject();

        $scope.createGroup = function () {
            //TODO Enable Create Group functionality, disable info toast
            //$http.post("/Home/CreateGroup", $scope._id)
            //    .then(function (response) {
            //        $location.path('/group/'+response.data);
            //    }, function () {
            //        toastr["error"]("Failed to create group.");
            //    });
            toastr["info"]("Attempted to create a group.");
        }

        $scope.saveProject = function () {
            //TODO Enable save group functionality, disable info toast
            //$http.post("/Home/SaveProject", $scope.project)
            //    .then(function (response) {
            //        toastr["success"]("Saved group.");
            //    }, function () {
            //        toastr["error"]("Failed to save group.");
            //    });
            toastr["info"]("Attempted to save project.");
        }

        var data = { //Data and labels are set in the setData function
            datasets: [{
                data: [],
                backgroundColor: [ //After 10 groups are included in a project, the color will just be gray, add more colors here if there can be more than 10 groups
                    '#2C3E50', '#3498DB', '#18BC9C', '#F39C12', '#e83e8c', '#6610f2', '#fd7e14', '#E74C3C', '#6f42c1','#95a5a6'
                ]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: []
            
        };

        $scope.setData = function () {
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