<?php


include_once("mysql.php");


class Connect {


    private $mysql;


    public function __construct() {

        $this->mysql = new Mysql("localhost", "root", "123456", "freechat");

    }


    public function getRecentMessage($encodeurl, $msgid) {

        $mysql = $this->mysql;
        $result = $mysql->query("select urlmap_urlid from freechat_urlmap where urlmap_encodeurl = '$encodeurl'");
        $urlid = $mysql->fetcharray($result);
        $urlid = $urlid["urlmap_urlid"];

        ini_set('max_execution_time', '7');
        $msgList = array();
        $timeout = 0;
        while (count($msgList) == 0 && $timeout++ < 6) {
            sleep(1);
            $result = $mysql->query("select message_msgid, message_datetime, message_content from freechat_message where message_urlid = '$urlid' and message_msgid > '$msgid' order by message_datetime");
            $msgList = $mysql->fetchall($result);
        }
        for ($i = 0; $i < count($msgList); $i++) {
            $msgList[$i] = array("msgid" => $msgList[$i]["message_msgid"], "datetime" => $msgList[$i]["message_datetime"], "message" => $msgList[$i]["message_content"]);
        }
        return json_encode($msgList);

    }


    public function setMessage() {

    }


    public function __destruct() {

        unset($this->mysql);

    }


}
?>