angular.module('time').controller('ViewEvalsCtrl', ['$scope', '$http', '$routeParams', '$location', 'usSpinnerService', function ($scope, $http, $routeParams, $location, usSpinnerService) {
    $scope.loaded = false;
    $scope.config = {};
    $scope.currentEval = 0;
    $scope.currentUser = 0;
    $scope.group = {};
    $scope.group.users = {};
    $scope.group.evaluations = {};

    $scope.load = function () {
        $scope.groupID = $routeParams.ID;

        if (!$scope.groupID) window.history.back();

        usSpinnerService.spin('spinner');
        $http.post("/Home/GetAllCompleteEvaluations", { groupID: $scope.groupID})
            .then(function (response) {
                usSpinnerService.stop('spinner');
                $.each(response.data, function (index, eval) {
                    $scope.group.evaluations[eval.number] = {};
                    $scope.group.evaluations[eval.number].evalID = eval.evalTemplateID;
                    $scope.group.evaluations[eval.number].number = eval.number;
                    $scope.group.evaluations[eval.number].categories = {};
                    $scope.group.evaluations[eval.number].templateQuestions = {};
                    $scope.group.evaluations[eval.number].responses = {};
                    if ($scope.group.evaluations[eval.number].evals === undefined)
                        $scope.group.evaluations[eval.number].evals = {};
                    $scope.group.evaluations[eval.number].evals[eval.evalID] = {
                        evalID: eval.evalID,
                        firstName: 'Team',
                        lastName: 'Member'
                    };
                    $.each(eval.categories, function (index, category) {
                        $scope.group.evaluations[eval.number].categories[category.evalTemplateQuestionCategoryID] = category;
                    });
                    $.each(eval.templateQuestions, function (index, templateQuestion) {
                        $scope.group.evaluations[eval.number].templateQuestions[templateQuestion.evalTemplateQuestionID] = templateQuestion;
                    });
                    $.each(eval.responses, function (index, response) {
                        $scope.group.evaluations[eval.number].responses[response.responseID] = response;
                    });
                    //$.each(eval.users, function (index, user) {
                    //    $scope.group.evaluations[eval.eval].responses = response;
                    //});
                });
                
            }, function () {
                usSpinnerService.stop('spinner');
                toastr["error"]("Failed to retrieve group evaluations. Using Dummy Data.");

                //Dummy Data
                $scope.group = {
                    groupID: $scope.groupID,
                    groupName: 'Test Group'
                }
                $scope.group.users = {
                    1: {
                        userID: 1,
                        firstName: 'Logan',
                        lastName: 'Brown',
                        isActive: true
                    },
                    2: {
                        userID: 2,
                        firstName: 'Tashi',
                        lastName: 'Aguilar',
                        isActive: true
                    },
                    3: {
                        userID: 3,
                        firstName: 'Steven',
                        lastName: 'Bate',
                        isActive: true
                    },
                    4: {
                        userID: 4,
                        firstName: 'Jeff',
                        lastName: 'Garcia',
                        isActive: true
                    }
                }
                $scope.group.evaluations = {
                    1: {
                        evalTemplateID: 1,
                        templateName: "Test Evalation", 
                        number: 1,
                        categories: {
                            1: {
                                evalTemplateQuestionCategoryID: 1,
                                categoryName: "Category 1"
                            },
                            2: {
                                evalTemplateQuestionCategoryID: 2,
                                categoryName: "Category 2"
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
                                evalTemplateQuestionID: 5,
                                evalTemplateQuestionCategoryID: 0,
                                questionType: 'N',
                                questionText: "Test question 4, what do you think?",
                                number: 1
                            }
                        },
                        evals: {
                            1: {
                                evalID: 1,
                                firstName: "Team",
                                lastName: "Member"
                            },
                            2: {
                                evalID: 2,
                                firstName: "Team",
                                lastName: "Member"
                            }
                        },
                        responses: {
                            1: {
                                evalResponseID: 1,
                                evalID: 1,
                                evalTemplateQuestionID: 1,
                                response: "5",
                                userID: 2
                            },
                            2: {
                                evalResponseID: 2,
                                evalID: 2,
                                evalTemplateQuestionID: 1,
                                response: "4",
                                userID: 1
                            },
                            3: {
                                evalResponseID: 3,
                                evalID: 1,
                                evalTemplateQuestionID: 2,
                                response: "Hello! This is a response that has been thought out and considered. It takes up more space, because they wanted to be detailed and make a coherent argument. Hopefully it illustrates what a long response could be.",
                                userID: 2
                            },
                            4: {
                                evalResponseID: 4,
                                evalID: 2,
                                evalTemplateQuestionID: 2,
                                response: "Hello! This is a response that has been thought out and considered. It takes up more space, because they wanted to be detailed and make a coherent argument. Hopefully it illustrates what a long response could be.",
                                userID: 1
                            },
                            5: {
                                evalResponseID: 5,
                                evalID: 1,
                                evalTemplateQuestionID: 3,
                                response: "5",
                                userID: 2
                            },
                            6: {
                                evalResponseID: 6,
                                evalID: 2,
                                evalTemplateQuestionID: 3,
                                response: "4",
                                userID: 1
                            },
                            7: {
                                evalResponseID: 7,
                                evalID: 1,
                                evalTemplateQuestionID: 4,
                                response: "Hello! This is a response that has been thought out and considered. It takes up more space, because they wanted to be detailed and make a coherent argument. Hopefully it illustrates what a long response could be.",
                                userID: 2
                            },
                            8: {
                                evalResponseID: 8,
                                evalID: 2,
                                evalTemplateQuestionID: 4,
                                response: "Hello! This is a response that has been thought out and considered. It takes up more space, because they wanted to be detailed and make a coherent argument. Hopefully it illustrates what a long response could be.",
                                userID: 1
                            }
                        }
                    }
                }

                $scope.currentUser = 1;
                $scope.currentEval = 1;
            });

        $scope.getResponse = function (evaluationID, evalID, evalTemplateQuestionID) {
            for (responseID in $scope.group.evaluations[evaluationID].responses) {
                if ($scope.group.evaluations[evaluationID].responses[responseID].evalID === evalID &&
                    $scope.group.evaluations[evaluationID].responses[responseID].evalTemplateQuestionID === evalTemplateQuestionID)
                    return $scope.group.evaluations[evaluationID].responses[responseID].response;
            }
            return '';
        };

        $scope.calculateCategoryTotal = function (categoryID, evalID) {
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