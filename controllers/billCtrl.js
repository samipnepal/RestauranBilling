app.controller('billCtrl', function ($scope, $http, $timeout, $location, $rootScope, $route,Data) {
	$scope.order = {custname:'',tableno:'',type:''};
	
	$scope.billItems = [{item:'asdf',rate:'',total:'',unit:'',quantity:''}];
	
Data.get("getTypes").then(function(results) {
	$scope.types = results;
});
	
	$scope.addItem= function(item) {
		$scope.order.items.push(item);
	}
	
	
});