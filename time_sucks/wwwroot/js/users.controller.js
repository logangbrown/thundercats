angular.module('time').controller('UsersCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.loaded = false;
    $scope.load = function() {
        //TODO Enable Users functionality, disable dummy data
        //$http.get("/Home/Users")
        //    .then(function (response) {
        //        $scope.users = response.data;
        //    }, function () {
        //        toastr["error"]("Failed to get users.");
        //        $location.path('/dashboard');
        //    });

        //Dummy Data
        $scope.users = {
            '1': {
                userID: '1',
                username: "test",
                firstName: "Test",
                lastName: "User",
                isActive: true,
                isInstructor: true
            },
            '5': {
                userID: '15',
                username: "logan",
                firstName: "Logan",
                lastName: "Brown",
                isActive: true,
                isInstructor: false
            },
            '2': {
                    userID: '2',
                username: "riz",
                firstName: "Rizwan",
                lastName: "Mohammed",
                isActive: true,
                isInstructor: false
            },
            '3': {
                userID: '3',
                username: "skylar",
                firstName: "Skylar",
                lastName: "Olsen",
                isActive: false,
                isInstructor: false
            },
            '4': {
                userID: '4',
                username: "brad",
                firstName: "Brad",
                lastName: "Peterson",
                isActive: true,
                isInstructor: true
            }
        };

        $scope.saveUser = function (user) {
            //TODO Enable save user functionality, disable info toast
            //$http.post("/Home/SaveUser", user)
            //    .then(function (response) {
            //        toastr["success"]("User saved.");
            //    }, function () {
            //        toastr["error"]("Failed to save user.");
            //    });
            toastr["info"]("Attempted to save user: " + user.userID + " - enable REST endpoint");
        }
        $scope.loaded = true;
    }

    //Standard login check, if there is a user, load the page, if not, redirect to login
    if (!$scope.$parent.user || $scope.$parent.user === '') {
        //TODO Enable CheckSession, remove dummy data
        //$http.get("/Home/CheckSession")
        //    .then(function (response) {
        //        $scope.$parent.user = response.data;
        //        if (!$scope.$parent.user.isInstructor) {
        //            toastr["error"]("Not Instructor.");
        //            $location.path('/dashboard');
        //        }
        //        $scope.$parent.loaded = true;
        //        $scope.load();
        //    }, function () {
        //        toastr["error"]("Not logged in.");
        //        $location.path('/login');
        //    });

        //Dummy data
        toastr["error"]("Not logged in - enable REST endpoint");
        $location.path('/login');
    } else if (!$scope.$parent.user.isInstructor) {
        toastr["error"]("Not Instructor.");
        $location.path('/dashboard');
    } else {
        $scope.load();
    }
});