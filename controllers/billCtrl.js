app.controller('billCtrl', function ($scope, $http, $timeout, $location, $rootScope, $route,Data) {
	$scope.order = {custname:'',tableno:'',type:'',unit:'',item:'',rate:''};
	$scope.bill= {};
	$scope.bill.items = [];
	
Data.get("getTypes").then(function(results) {
	$scope.types = results;
});
	
	$scope.addItem= function(order) {
		$scope.bill.items.push(order);
	}
	
	
});