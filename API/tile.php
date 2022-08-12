<?php
error_reporting(0);
$retObj = (object)[];
$_DATA = json_decode(file_get_contents('php://input'), true);
try{
if(isset($_GET["push"]) && $_GET["push"] == "change"){
    $tile = $_DATA["object"];
    $retObj->request = "push tile";
    $retObj->answer = "pushed tile #".$tile["id"]." into  game #".$_DATA["gameid"];
    echo json_encode($retObj);
}
if(isset($_GET["action"]) && $_GET["action"] == "all"){
    $tilelist = [];
    for ($count=0; $count < (31*31-9); $count++) { 
        $tile = array();
        $tile["id"] = $count;
        $tile["type"] = rand(1,6);
        $tilelist[] = $tile;
    }
    $retObj->request = "load tile";
    $retObj->answer = $tilelist;
    echo json_encode($retObj);
}
}catch(Exception $e){
    $retObj->error = $e->getMessage();
    echo json_encode($retObj);
}

?>