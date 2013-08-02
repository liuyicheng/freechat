<?php


class Mysql {


    private $server;
    private $user;
    private $password;
    private $database;
    private $charset;
    private $link;


    public function __construct($server, $user, $password, $database, $charset = 'utf8') {

        $this->server = $server;
        $this->user = $user;
        $this->password = $password;
        $this->database = $database;
        $this->charset = $charset;
        $this->connect();

    }


    private function connect() {

        $this->link = mysql_connect($this->server, $this->user, $this->password) or die($this->error("Error connecting to the server!"));
        mysql_select_db($this->database, $this->link) or die($this->error("Error connecting to the database!"));
        mysql_query("set names '$this->charset'");

    }


    public function query($sql) {

        $result = mysql_query($sql, $this->link);
        if (!$result) {
            $this->error($sql . "Statement fails!");
            return false;
        } else {
            return $result;
        }

    }


    public function fetcharray($result) {

        return mysql_fetch_array($result);

    }


    public function fetchall($result) {

        $arr = array ();
        while ($row = mysql_fetch_array($result)) {
            $arr[] = $row;
        }
        mysql_free_result($result);
        return $arr;

    }


    public function numrows($result) {

        return mysql_num_rows($result);

    }


    public function numfields($result) {

        return mysql_num_fields($result);

    }


    public function affectedrows() {

        return mysql_affected_rows($this->link);

    }


    public function version() {

        return mysql_get_server_info();

    }


    public function insertid() {

        return mysql_insert_id($this->link);

    }


    private function close() {

        mysql_close($this->link);

    }


    private function error($err_msg = "") {

        if ($err_msg == "") {
            echo "errno: " . mysql_errno . "</br>";
            echo "error: " . mysql_error . "</br>";
        } else {
            echo $err_msg;
        }

    }


    public function __destruct() {

        $this->close();

    }


}


?>