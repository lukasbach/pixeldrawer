<?php

$mysqlVars = array(
    "server" => "localhost",
    "user" => "root",
    "psw" => "",
    "db" => "pixeldrawer",
    
    "tablePrefix" => "pxldr_",
    
    "tables" => array(
        "drawings" => "pxldr_drawings",
        "votings" => "pxldr_votings"
    )
);

$conn = new mysqli($mysqlVars["server"], $mysqlVars["user"], $mysqlVars["psw"], $mysqlVars["db"]);
 
// check connection
if ($conn->connect_error) {
    echo '{"returnCode": "mysqlError"}';
    exit;
}

?>