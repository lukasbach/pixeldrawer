<?php
/*
 *
 * INSERT NEW AUTHOR AND NAME INTO OBJECT
 *
 */
// Publish a given file

if( !isset($_POST["file"]) ) {
    echo '{"returnCode": "noFileGiven"}';
    exit;
}

// Get file and decode the json string
$file = $_POST["file"];
$file_decoded = json_decode($file, true);

// Check if name exists
if( !isset($file_decoded["name"]) OR $file_decoded["name"] == "" ) {
    echo '{"returnCode": "missingName"}';
    exit;
}

// Check if author exists
if( !isset($file_decoded["author"]) OR $file_decoded["author"] == "" ) {
    echo '{"returnCode": "missingAuthor"}';
    exit;
}

// Save file in db
include("inc.mysql.php");

// Escape variable to prevent MySql Injection
$file_escaped = $conn->real_escape_string($file);

if ($conn->query("INSERT into " . $mysqlVars["tables"]["drawings"] . "
                 (data, timestamp, voteUp, voteDown)
                 VALUES
                 ('$file_escaped', '".time()."', '0', '0')")) {
    
    $url = $conn->insert_id;
    echo '{"returnCode": "success", "url": "'.$url.'"}';
} else {
    echo '{"returnCode": "unknownError"}';
}




?>