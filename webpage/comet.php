<?php


include_once("connect.php");


$encodeurl = rawurlencode($_GET["url"]);
$msgid = rawurlencode($_GET["msgid"]);
$connect = new Connect();
echo $connect->getMessageComet($encodeurl, $msgid);


?>