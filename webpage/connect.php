<?php


include_once("mysql.php");


class Connect {


    private $mysql;


    public function __construct() {

        $this->mysql = new Mysql("localhost", "root", "123456", "freechat");

    }


    public function getRecentMessage($encodeUrl) {

        $mysql = $this->mysql;
        $result = $mysql->query("select message_datetime, message_content from freechat_urlMap inner join freechat_message on urlMap_urlId = message_urlId where urlMap_encodeUrl = '$encodeUrl' order by message_datetime desc limit 0, 10");
        $codeList = $mysql->fetchall($result);
        for ($i = 0; $i < count($codeList); $i++) {
            $codeList[$i] = array("datetime" => $codeList[$i]["message_datetime"], "message" => $codeList[$i]["message_content"]);
        }
        return json_encode($codeList);

    }


    public function __destruct() {

        unset($this->mysql);

    }


}
?>