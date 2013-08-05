<?php


include_once("connect.php");


$encodeurl = rawurlencode($_GET["url"]);
$encodeurl = $encodeurl ? $encodeurl : 'public';
$message = $_GET["message"];
$msgid = rawurlencode($_GET["msgid"]);
$msgid = $msgid ? $msgid : 0;
$connect = new Connect();


if ($message) {

	echo $connect->setMessage($encodeurl, $message);

} else {

	echo $connect->getMessage($encodeurl, $msgid);

}


?>