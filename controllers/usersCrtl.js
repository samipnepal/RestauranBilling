
app.filter('startFrom', function($rootScope) {
    return function(input, start) {
        if(input && $rootScope.isAdmin) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
app.controller('usersCrtl', function ($scope, $http, $timeout, $location, $rootScope, Data) {
        Data.get('listUser').then(function (results) {
            $scope.list = results;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.list.length; //Initially for no filter 
            $scope.totalItems = $scope.list.length;
            if($rootScope.isAdmin){
                $location.path('listuser');
            } else {
                $scope.list = {};
                $location.path('home')
            }
           });
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() {
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
    
    $scope.getUserProfile =function(profile) {
        $rootScope.$emit("getProfileMethod", profile.email);
    }

});
