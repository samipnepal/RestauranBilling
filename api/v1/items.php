<?php
$app->post('/addItem', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $itemname = $r->Item->itemname;
    $item = $db->getOneRecord("select itemid,itemname,rate,unit,type from menu where itemname='$itemname'");
    if(!$item){
        $tabble_name = "menu";
        $column_names = array('itemname', 'rate','unit', 'type');
        $result = $db->insertIntoTable($r->Item, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "Item added successfully";
            $response["id"] = $result;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to add item. Please try again";
            echoResponse(201, $response);
        }            
    }else{
        $response["status"] = "error";
        $response["message"] = "An item with the provided name already exists!";
        echoResponse(201, $response);
    }
});

$app->get('/listItems', function() {
    $response = array();
    $db = new DbHandler();
    $user = $db->getMultipleRecords("select * from menu");
    echoResponse(200, $user);
});

$app->get('/getTypes', function() {
    $response = array();
    $db = new DbHandler();
    $user = $db->getMultipleRecords("select distinct type from menu");
    echoResponse(200, $user);
});

$app->post('/deleteItem', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $itemid = $r->Item->itemid;
	$result = $db->deleteRecord("delete from menu where itemid='$itemid'");
	if ($result != NULL) {
		$response["status"] = "success";
		$response["message"] = "Item deleted successfully";
		$response["id"] = $result;
		echoResponse(200, $response);
	} else {
		$response["status"] = "error";
		$response["message"] = "Failed to delete item. Please try again";
		echoResponse(201, $response);
	}            
});

$app->post('/getItemsByType', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $type = $r->Type;
	 $result = $db->getMultipleRecords("select itemid,itemname,rate,unit from menu  where type='$type'");
    echoResponse(200, $result);         
});

?>