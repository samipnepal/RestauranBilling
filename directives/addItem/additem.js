app.directive('addItem', function(){
  return {
    restrict: 'E',
    templateUrl:'directives/addItem/additem.html',
	controller: 'itemCtrl'
  };
 
});
