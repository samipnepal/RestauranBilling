app.controller('itemCtrl', function ($scope, $http, $timeout, $location, $rootScope, $window, Data) {
	$scope.units = ["Plate", "Cup", "Nos"];
    $scope.types = ["Beverage", "Starter", "Main Course", "Soups", "Thali", "Pizzas", "Burgers", "Meal", "Chinese","Snacks"];

	$scope.item = {itemname: '', rate: '', unit: '', type: ''}

	$scope.addItem = function(item) {
		Data.post('addItem', {
            Item: item
        }).then(function (results) {
            if (results.status == "success") {
                $window.location.reload();
            }
            Data.toast(results);
        });
	}
    
    $scope.deleteItem =  function(item) {
        Data.post('deleteItem', {
            Item: item
        }).then(function (results) {
            if (results.status == "success") {
                $window.location.reload();
            }
            Data.toast(results);
        });
    }
    
    
	Data.get('listItems').then(function (results) {
		$scope.list = results;
		$scope.currentPage = 1; //current page
		$scope.entryLimit = 10; //max no of items to display in a page
		$scope.filteredItems = $scope.list.length; //Initially for no filter 
		$scope.totalItems = $scope.list.length;
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
});