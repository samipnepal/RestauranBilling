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
?>