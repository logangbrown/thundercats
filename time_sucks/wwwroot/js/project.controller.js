angular.module('time').controller('ProjectCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.config = {};
    $scope.config.showInactiveGroups = false;

    $scope.load = function() {

        $scope._id = $routeParams.ID;

        if (!$scope._id) $location.path('/courses');

        $http.post("/Home/Project", { _id: $scope._id })
            .then(function (response) {
                $scope.project = response.data;
            }, function () {
                toastr["error"]("Failed to retrieve project.");
            });

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
            $http.post("/Home/SaveProject", $scope.project)
                .then(function (response) {
                    toastr["success"]("Saved group.");
                }, function () {
                    toastr["error"]("Failed to save group.");
                });
            //toastr["info"]("Attempted to save project.");
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