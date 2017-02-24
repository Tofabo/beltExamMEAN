app.controller('itemsController', ["$scope", "usersFactory", "itemsFactory", '$location', "$routeParams", function ($scope, usersFactory, itemsFactory, $location, $routeParams) {

    $scope.errors = [];
    $scope.checkUser = function () {
        usersFactory.checkUser(function (data) {
            $scope.curUser = data;
        })
    };

    $scope.getusers = function () {
        usersFactory.getusers(function (data) {
            $scope.users = data;
        })
    }

    $scope.getone = function (id) {
        usersFactory.getone({ id: id }, function (data) {
            $scope.oneuser = data;
        })
    }

    $scope.add = function (newItem, owner) {
        $scope.errors = [];
        //frontend validations
        if (!$scope.newItem || !$scope.newItem.title || !$scope.newItem.description) {
            $scope.errors.push('All fields required.');
        }
        else if ($scope.newItem.title.length < 5) {
            $scope.errors.push('Title must be at least 5 characters long.');
        }
        else if ($scope.newItem.description.length < 10) {
            $scope.errors.push('Description must be at least 10 characters long.');
        }
        else {
            //if input info passes all validations send to factory
            itemsFactory.add(newItem, owner, function () {
                $scope.newItem = {};
                $scope.checkUser();
            });
        }
    }

    $scope.changestatus = function (id) {
        itemsFactory.changestatus({ id: id }, function () {
            $scope.checkUser();
            if ($routeParams.userid) {
                $scope.getone($routeParams.userid);
            }
        })
    }

    $scope.checkUser();
    $scope.getusers();
    if ($routeParams.userid) {
        $scope.getone($routeParams.userid);
    }

}])
