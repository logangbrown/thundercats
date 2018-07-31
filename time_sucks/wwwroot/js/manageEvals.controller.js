angular.module('time').controller('ManageEvalsCtrl', ['$scope', '$http', '$routeParams', '$location', 'usSpinnerService', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.config = {};
    $scope.currentEval = 0;
    $scope.group = {};
    $scope.group.users = {};
    $scope.group.evaulations = {};

    $scope.load = function () {
        $scope.userID = $routeParams.ID;

        if (!$scope.userID) window.history.back();

        usSpinnerService.spin('spinner');
        $http.post("/Home/GetInstructorEvalTemplates", { userID: $scope.userID })
            .then(function (response) {
                usSpinnerService.stop('spinner');
            }, function () {
                usSpinnerService.stop('spinner');
                toastr["error"]("Failed to retrieve instructor's evaluations. Using Dummy Data.");
            });

        //Dummy Data
        $scope.evaluation = {
            evalID: 1, //Should we randomize this number on the back end?
            templateName: "Test Evalation Template 1",
            number: 1,
            categories: {
                1: {
                    evalTemplateQuestionCategoriesID: 1,
                    categoryName: "Test Category 1"
                },
                2: {
                    evalTemplateQuestionCategoriesID: 2,
                    categoryName: "Test Category 2"
                }
            },
            templateQuestions: {
                1: {
                    evalTemplateQuestionID: 1,
                    evalTemplateQuestionCategoriesID: 1,
                    questionType: 'N',
                    questionText: "Test question 1, what do you think?",
                    number: 2
                },
                2: {
                    evalTemplateQuestionID: 2,
                    evalTemplateQuestionCategoriesID: 1,
                    questionType: 'R',
                    questionText: "Test question 2 (should be first), what do you think?",
                    number: 1
                },
                3: {
                    evalTemplateQuestionID: 3,
                    evalTemplateQuestionCategoriesID: 2,
                    questionType: 'N',
                    questionText: "Test question 3, what do you think?",
                    number: 1
                },
                4: {
                    evalTemplateQuestionID: 4,
                    evalTemplateQuestionCategoriesID: 2,
                    questionType: 'R',
                    questionText: "Test question 4, what do you think?",
                    number: 2
                },
                5: {
                    evalTemplateQuestionID: 4,
                    evalTemplateQuestionCategoriesID: 0,
                    questionType: 'N',
                    questionText: "Test question 4, what do you think?",
                    number: 1
                }
            }
        }

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