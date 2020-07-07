<?php
session_start();
// Return a random file (used while browsing images)


// Create session variable if not existing
if(!isset($_SESSION["visited_drawings"])) {
    $_SESSION["visited_drawings"] = array();
}

// Get already visited files
$visitedDrawings = $_SESSION["visited_drawings"]/*array()*/;


// Get File data and voting info from db
include("inc.mysql.php");

// Create where not in statement for mysql query
if(empty($visitedDrawings)) {
    $whereNotInStatement = " ";
} elseif(count($visitedDrawings) == 1) {
    $whereNotInStatement = " WHERE id NOT LIKE '".$visitedDrawings[0]."'";
} else {
    $whereNotInStatement = " WHERE id NOT IN (".implode(",",$visitedDrawings).")";
}

if ($result = $conn->query("SELECT * FROM " . $mysqlVars["tables"]["drawings"]
                  . $whereNotInStatement . "
                 ORDER BY RAND()
                 LIMIT 1")) {
    
    $result_fetched = $result->fetch_object();
    
    //$db_numRows = $result_fetched->num_rows;
    $db_numRows = $result->num_rows;
        
    if($db_numRows != 0) {
        // if an drawing has been found
        $db_id = $result_fetched->id;
        $db_data = $result_fetched->data;
        $db_voteUp = $result_fetched->voteUp;
        $db_voteDown = $result_fetched->voteDown;
        
        // Add id to session variable, so that this drawing wont be showned up again
        $_SESSION["visited_drawings"][] = $db_id;
        
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
    }
    else {
        echo '{"returnCode": "noMoreDrawings"}';
        
        // Reset session
        $_SESSION["visited_drawings"] = array();
    }
} else {
    echo '{"returnCode": "unknownError"}';
}



?>