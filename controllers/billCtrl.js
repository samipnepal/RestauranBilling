app.controller('billCtrl', function ($scope, $http, $timeout, $location, $rootScope, $route,Data) {
Data.get("getTypes").then(function(results) {
	$scope.types = results;
});
});