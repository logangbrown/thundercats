angular.module('time').controller('EvalCtrl', ['$scope', '$http', '$routeParams', '$location', 'usSpinnerService', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.config = {};
    $scope.currentEval = 0;
    $scope.group = {};
    $scope.group.users = {};
    $scope.group.evaulations = {};

    $scope.load = function () {
        $scope.evalID = $routeParams.ID;

        if (!$scope.evalID) window.history.back();

        usSpinnerService.spin('spinner');
        $http.post("/Home/GetGroupEvals", { groupID: $scope.groupID })
            .then(function (response) {
                usSpinnerService.stop('spinner');
            }, function () {
                usSpinnerService.stop('spinner');
                toastr["error"]("Failed to retrieve group evaluations. Using Dummy Data.");
            });

        $scope.getResponse = function (evaluationID, evalID, evalTemplateQuestionID) {
            for (responseID in $scope.group.evaluations[evaluationID].responses) {
                if ($scope.group.evaluations[evaluationID].responses[responseID].evalID === evalID &&
                    $scope.group.evaluations[evaluationID].responses[responseID].evalTemplateQuestionID === evalTemplateQuestionID)
                    return $scope.group.evaluations[evaluationID].responses[responseID].response;
            }
            return '';
        };

        $scope.loaded = true;
    };

    //Standard login check, if there is a user, load the page, if not, redirect to login
    usSpinnerService.spin('spinner');
    $http.get("/Home/CheckSession")
        .then(function (response) {
            usSpinnerService.stop('spinner');
            $scope.$parent.user = response.data;
            $scope.$parent.loaded = true;
            $scope.load();
        }, function () {
            usSpinnerService.stop('spinner');
            toastr["error"]("Not logged in.");
            $location.path('/login');
        });
}]);