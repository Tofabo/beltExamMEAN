app.controller('usersController', ["$scope", "usersFactory", '$location', function ($scope, usersFactory, $location) {

    $scope.errors = [];

    $scope.login = function () {
        $scope.errors = [];
        if (!$scope.user || !$scope.user.name) {
            $scope.errors.push('Please enter a name.');
        }
        else if ($scope.user.name.length < 3) {
            $scope.errors.push('Name should be at least 3 characters long.');
        } else {
            usersFactory.login($scope.user);
        }
    }
}])
