app.controller('itemCtrl', function ($scope, $http, $timeout, $location, $rootScope, Data) {
	$scope.units = ["Plate", "Cup", "Nos"];
    $scope.types = ["Beverage", "Starter", "Main Course"];
	
	$scope.item = {itemname: '', rate: '', unit: '', type: ''}
	$scope.addItem = function(item) {
		Data.post('addItem', {
            Item: item
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('additem');
            }
        });
	}
});