app.controller('billCtrl', function ($scope, $http, $timeout, $location, $rootScope, $route,Data) {
	$scope.order = {custname:'',tableno:'',type:''};
	
	$scope.order.items = [{item:'asds',rate:'11',total:'',unit:'asda',quantity:'2'}];
	
Data.get("getTypes").then(function(results) {
	$scope.types = results;
});
});