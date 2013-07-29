<?php

$encodeURL = $_GET["url"];

$json = '
	[
		{
			"message": "hello world",
			"datetime": "2013-7-28 19:12:30"
		},
		{
			"message": "hey jack",
			"datetime": "2013-10-20 10:03:54"
		}
	]
';

echo $json;

?>