<?php
// Return a random file (used while browsing images)

if( !isset($_GET["id"]) ) {
    echo '{"returnCode": "missingId"}';
    exit;
}

// Get file and decode the json string
$id = $_GET["id"];

// Get File data and voting info from db
include("inc.mysql.php");

// Escape variable to prevent MySql Injection
$id_escaped = $conn->real_escape_string($id);

if ($result = $conn->query("SELECT * FROM " . $mysqlVars["tables"]["drawings"] . "
                 WHERE id = " . $id_escaped . " LIMIT 1")) {
    
    $result_fetched = $result->fetch_object();
        
    $db_data = $result_fetched->data;
    $db_voteUp = $result_fetched->voteUp;
    $db_voteDown = $result_fetched->voteDown;
    
    // Add voting info to object
    $db_data_decoded = json_decode($db_data, true);
    
    $db_data_decoded = array_merge(
        $db_data_decoded,
        array(
            "voteUp" => $db_voteUp,
            "voteDown" => $db_voteDown
        )
    );
    
    // Encode array back to json
    $output = json_encode($db_data_decoded);
    
    
    echo $output;
} else {
    echo '{"returnCode": "unknownError"}';
}




?>