app.controller('billCtrl', function ($scope, $http, $timeout, $location, $rootScope, $route,Data) {
	$scope.order = {itemid:'',custname:'',type:'',unit:'',item:'',rate:'',quantity:1};
	$scope.bill= {};
    $scope.tableno= 0;
    $scope.bill.discount= 0;
    $scope.bill.discountAmount= 0;
    $scope.bill.total= 0;
    $scope.bill.gtotal= 0;
	$scope.bill.items = [];
    $scope.today = new Date();
    $scope.showEdit = true;
	
Data.get("getTypes").then(function(results) {
	$scope.types = results;
});

	$scope.addItem= function(order) {
        $scope.itemTypes.forEach(function(obj){
            if(obj.itemname === order.item.trim()){
                order.rate = obj.rate;
                order.unit = obj.unit;
                order.itemid = obj.itemid;
            }
        });
        $scope.bill.total = $scope.bill.total + order.rate * order.quantity;
        if($scope.bill.discount>0){
            $scope.bill.discountAmount = ($scope.bill.discount/100)*$scope.bill.total;
             $scope.bill.gtotal = $scope.bill.total - $scope.bill.discountAmount;
        } else {
             $scope.bill.gtotal =  $scope.bill.total;
        }
        $scope.bill.items.push(order);
        $scope.order = {custname:'',tableno:'',type:'',unit:'',item:'',rate:'',quantity:1};
	}
    
    $scope.calculateDiscount = function() {
        if($scope.bill.discount>0){
            $scope.bill.discountAmount = ($scope.bill.discount/100)*$scope.bill.total;
             $scope.bill.gtotal = $scope.bill.total - $scope.bill.discountAmount;
        }else {
            $scope.bill.discountAmount = 0;
             $scope.bill.gtotal = $scope.bill.total;
        }
    }

    $scope.removeItem = function(item) {
        $scope.bill.total = $scope.bill.total - item.rate * item.quantity;
        $scope.calculateDiscount();
        $scope.bill.items.splice($scope.bill.items.indexOf(item),1);
    }
    
    $scope.clear = function() {
        $scope.order = {custname:'',type:'',unit:'',item:'',rate:'',quantity:1};
        $scope.bill= {};
        $scope.tableno= 1;
        $scope.bill.discount= 0;
        $scope.bill.discountAmount= 0;
        $scope.bill.total= 0;
        $scope.bill.gtotal= 0;
        $scope.bill.items = [];
    }
	
    $scope.getItemsByType = function(type) {
		Data.post('getItemsByType', {
            Type: type.type
        }).then(function (results) {
            $scope.itemTypes=results;
        });
	}
    
    $scope.printBill= function() {
         $scope.showEdit = false;
        $timeout(function(){
            var divToPrint=document.getElementById("billPreview");
            newWin= window.open('');
            newWin.document.write('<html><head><title></title>');
            newWin.document.write('<link href="css/bootstrap.min.css" rel="stylesheet"> <link href="css/custom.css" rel="stylesheet">');
            newWin.document.write('</head><body style="padding:20px;" >');
            newWin.document.write(divToPrint.outerHTML);
            newWin.document.write('</body ng-controller="billCtrl">');
            newWin.document.write('<script src="js/angular.min.js"></script><script src="app/app.js"></script>');
            newWin.document.write('<script src="controllers/billCtrl.js"></script>');
            newWin.document.write('</html>');
            $timeout(function(){
                newWin.print();
                newWin.close();
                $scope.showEdit = true;
            },200);
            
        },50);
    }
    $scope.preview = function() {
                $scope.showEdit = false;
        $timeout(function(){
            var divToPrint=document.getElementById("billPreview");
            newWin= window.open('', 'new div', 'height=400,width=600');
            newWin.document.write('<html><head><title> Bill Preview</title>');
            newWin.document.write('<link href="css/bootstrap.min.css" rel="stylesheet"> <link href="css/custom.css" rel="stylesheet">');
            newWin.document.write('</head><body ng-controller="billCtrl">');
            newWin.document.write(divToPrint.outerHTML);

            newWin.document.write('</body>');
            newWin.document.write('<script src="js/angular.min.js"></script><script src="app/app.js"></script>');
            newWin.document.write('<script src="controllers/billCtrl.js"></script>');
            newWin.document.write('</html>');
                            $scope.showEdit = true;
        },50);
    }

});