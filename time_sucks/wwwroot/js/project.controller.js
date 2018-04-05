angular.module('time').controller('ProjectCtrl', function ($scope, $http, $routeParams, $location, userService) {
    $scope.$parent.user = userService.get();
    $scope.config = {};
    $scope.config.showInactiveGroups = false;

    //Check if a user is logged in, if not, redirect to login
    if (!$scope.$parent.user) {
        toastr["error"]("Not logged in.");
        $location.path('/login');
    } else { //TODO make Project controller

        $scope.projectID = $routeParams.ID;

        if (!$scope.projectID) $location.path('/courses');

        $scope.getProject = function () {
            //TODO get real project
            if ($scope.projectID === "1") {
                return {
                    name: "PHP Game",
                    projectID: "1",
                    isActive: true,
                    groups: {
                        1: {
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
                return null;
            }
        }

        $scope.project = $scope.getProject();

        $scope.createGroup = function () {
            //TODO Create functionality: hit endpoint to make a group, on success, go to group page with the returned ID
            toastr["info"]("Create group.");
        }

        $scope.saveProject = function () {
            //TODO Save course functionality
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
    }
});