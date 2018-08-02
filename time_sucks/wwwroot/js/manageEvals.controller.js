angular.module('time').controller('ManageEvalsCtrl', ['$scope', '$http', '$routeParams', '$location', 'usSpinnerService', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.config = {};
    $scope.config.currentTemplate = 0;
    $scope.group = {};
    $scope.group.users = {};
    $scope.group.evaulations = {};
    $scope.instructors = {};
    $scope.evaluations = {};

    $scope.load = function () {
        $scope.userID = $routeParams.ID;

        if (!$scope.userID) window.history.back();
        
        $scope.loadTemplates = function () {
            usSpinnerService.spin('spinner');
            $http.post("/Home/GetInstructorEvalTemplates", { userID: $scope.userID })
                .then(function (response) {
                    usSpinnerService.stop('spinner');
                }, function () {
                    usSpinnerService.stop('spinner');
                    toastr["error"]("Failed to retrieve instructor's evaluations. Using Dummy Data.");

                    //Dummy Data
                    $scope.evaluations = {
                        1: {
                            evalTemplateID: 1,
                            templateName: "Test Evalation Template 1",
                            inUse: true,
                            categories: {
                                1: {
                                    evalTemplateQuestionCategoryID: 1,
                                    categoryName: "Test Category 1"
                                },
                                2: {
                                    evalTemplateQuestionCategoryID: 2,
                                    categoryName: "Test Category 2"
                                }
                            },
                            templateQuestions: {
                                1: {
                                    evalTemplateQuestionID: 1,
                                    evalTemplateQuestionCategoryID: 1,
                                    questionType: 'N',
                                    questionText: "Test question 1, what do you think?",
                                    number: 2
                                },
                                2: {
                                    evalTemplateQuestionID: 2,
                                    evalTemplateQuestionCategoryID: 1,
                                    questionType: 'R',
                                    questionText: "Test question 2 (should be first), what do you think?",
                                    number: 1
                                },
                                3: {
                                    evalTemplateQuestionID: 3,
                                    evalTemplateQuestionCategoryID: 2,
                                    questionType: 'N',
                                    questionText: "Test question 3, what do you think?",
                                    number: 1
                                },
                                4: {
                                    evalTemplateQuestionID: 4,
                                    evalTemplateQuestionCategoryID: 2,
                                    questionType: 'R',
                                    questionText: "Test question 4, what do you think?",
                                    number: 2
                                },
                                5: {
                                    evalTemplateQuestionID: 4,
                                    evalTemplateQuestionCategoryID: 0,
                                    questionType: 'N',
                                    questionText: "Test question 4, what do you think?",
                                    number: 1
                                }
                            }
                        },
                        2: {
                            evalTemplateID: 2, 
                            templateName: "Test Evalation Template 2",
                            inUse: false,
                            number: 1,
                            categories: {
                                3: {
                                    evalTemplateQuestionCategoryID: 3,
                                    categoryName: "Category 3"
                                },
                                4: {
                                    evalTemplateQuestionCategoryID: 4,
                                    categoryName: "Category 4"
                                },
                                5: {
                                    evalTemplateQuestionCategoryID: 5,
                                    categoryName: "Category 5"
                                }
                            },
                            templateQuestions: {
                                1: {
                                    evalTemplateQuestionID: 1,
                                    evalTemplateQuestionCategoryID: 3,
                                    questionType: 'N',
                                    questionText: "Test question 1, what do you think?",
                                    number: 2
                                },
                                2: {
                                    evalTemplateQuestionID: 2,
                                    evalTemplateQuestionCategoryID: 3,
                                    questionType: 'R',
                                    questionText: "Test question 2 (should be first), what do you think?",
                                    number: 1
                                },
                                3: {
                                    evalTemplateQuestionID: 3,
                                    evalTemplateQuestionCategoryID: 4,
                                    questionType: 'N',
                                    questionText: "Test question 3, what do you think?",
                                    number: 1
                                },
                                4: {
                                    evalTemplateQuestionID: 4,
                                    evalTemplateQuestionCategoryID: 4,
                                    questionType: 'R',
                                    questionText: "Test question 4, what do you think?",
                                    number: 2
                                },
                                5: {
                                    evalTemplateQuestionID: 4,
                                    evalTemplateQuestionCategoryID: 5,
                                    questionType: 'N',
                                    questionText: "Test question 4, what do you think?",
                                    number: 1
                                }
                            }
                        }
                    }

                    $scope.config.currentTemplate = 1;
                });
        }

        if ($scope.$parent.user.type === 'A') {
            usSpinnerService.spin('spinner');
            $http.get("/Home/GetUsers")
                .then(function (response) {
                    //Setting users to be in the index of their userID
                    $.each(response.data, function (index, user) {
                        if (user.type === 'I' || user.userID === $scope.$parent.user.userID)
                            $scope.instructors[user.userID] = user;
                    });
                    usSpinnerService.stop('spinner');
                    $scope.loadTemplates();
                    $scope.loaded = true;
                    if (response.status === 204) {
                        toastr["error"]("Not an Admin.");
                        window.history.back();
                    }
                }, function () {
                    usSpinnerService.stop('spinner');
                    toastr["error"]("Failed to get instructors.");
                    $location.path('/dashboard');
                });
        } else if ($scope.$parent.user.type === 'I') {
            $scope.loadTemplates();
        } else {
            toastr["error"]("Not an Admin or Instructor.");
            window.history.back();
        }

        $scope.getResponse = function (evaluationID, evalID, evalTemplateQuestionID) {
            for (responseID in $scope.group.evaluations[evaluationID].responses) {
                if ($scope.group.evaluations[evaluationID].responses[responseID].evalID === evalID &&
                    $scope.group.evaluations[evaluationID].responses[responseID].evalTemplateQuestionID === evalTemplateQuestionID)
                    return $scope.group.evaluations[evaluationID].responses[responseID].response;
            }
            return '';
        };

        $scope.saveTemplate = function () {

        }

        $scope.loaded = true;
    };

    //Standard login check, if there is a user, load the page, if not, redirect to login
    usSpinnerService.spin('spinner');
    $http.get("/Home/CheckSession")
        .then(function (response) {
            usSpinnerService.stop('spinner');
            $scope.$parent.user = response.data;
            if ($scope.$parent.user.type !== 'A' && $scope.$parent.user.type !== 'I') {
                toastr["error"]("Not Admin or Instructor");
                $location.path('/dashboard');
            }
            $scope.$parent.loaded = true;
            $scope.load();
        }, function () {
            usSpinnerService.stop('spinner');
            toastr["error"]("Not logged in.");
            $location.path('/login');
        });
}]);