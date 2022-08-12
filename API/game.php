<?php
$retObj = (object)[];
if(isset($_GET["gameid"]) && $_GET["gameid"] == "new"){
    $retObj->request = "gameid";
    $retObj->answer = 1;
}

echo json_encode($retObj);
?>