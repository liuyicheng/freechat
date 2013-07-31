<?php


include_once("connect.php");


$encodeUrl = rawurlencode($_GET["url"]);
$connect = new Connect();
echo $connect->getRecentMessage($encodeUrl);


?>