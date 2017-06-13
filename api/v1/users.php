<?php 

$app->post('/userProfile', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $email = $r->customer;
    $user = $db->getOneRecord("select id,lname,phone,fname,email from users where phone='$email' or email='$email'");
    if ($user != NULL) {
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['fname'] = $user['fname'];
        $response['id'] = $user['id'];
        $response['email'] = $user['email'];
		$response['phone'] = $user['phone'];
        $response['lname'] = $user['lname'];
    }else {
            $response['status'] = "error";
            $response['message'] = 'No user is logged in';
        }
    echoResponse(200, $response);
});

$app->post('/deleteUser', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $id = $r->customer;
    $user = $db->deleteRecord("delete from users where id='$id'");
    if ($user != NULL) {
        $response["status"] = "info";
        $response["message"] = "User deleted successfully";
    } else{
        $response["status"] = "error";
        $response["message"] = "Not able to delete user";
    }
    echoResponse(200, $response);
});

$app->get('/listUser', function() {
    $response = array();
    $db = new DbHandler();
    $user = $db->getMultipleRecords("select * from users");
    echoResponse(200, $user);
});

$app->post('/updateProfile', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $id =  $r->customer->id;
    $fname =  $r->customer->fname;
    $lname = $r->customer->lname;
    $email = $r->customer->email;
    $phone = $r->customer->phone;
    $user = $db->updateRecord("update users set fname='$fname', lname='$lname', email='$email',phone='$phone' where id='$id'");
    if ($user != FALSE) {
        $response["status"] = "success";
        $response["message"] = "User updated successfully";
    } else{
        $response["status"] = "error";
        $response["message"] = "Not able to update user";
    }
    echoResponse(200, $response);
});

?>