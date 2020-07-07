$(document).ready(function(){
    
    $(".settings .content #publish #publishBtn").click(function() {
        file.name = $(".settings .content #publish #inputSaveAs").val();
        file.author = $(".settings .content #publish #inputAuthor").val();
        var error = false;
        
        if (typeof file.name == "undefined" || file.name == "") {
            error = "<span class='text-danger'>You have to enter a name for the drawing.</span>";
        } else if (typeof file.author == "undefined" || file.author == "") {
            error = "<span class='text-danger'>You have to enter a the author's name.</span>";
        }
        
        if (error != false) {
            $(".settings #publish #successNote")
                .html(error)
                .fadeIn('slow', function() {
                    setTimeout(function() {
                        $(".settings #publish #successNote").fadeOut('slow', function() {});
                    }, 5000);
                });
        } else {
            // Everything OK, send file to server
            console.log("k");
            $.ajax({
                url: "ajax/publishFile.php",
                type: "POST",
                data: {file: JSON.stringify(file)},
                dataType: "json",
                success: function(answer) {
                    console.log("success");
                    console.log(answer);
                    /* Note: Missing names and author is checked again by the server to prevent xss */
                    switch (answer.returnCode) {
                        case "missingName":
                            var returnMsg = "<span class='text-danger'>You have to enter a name for the drawing.</span>";
                            break;
                        case "missingAuthor":
                            var returnMsg = "<span class='text-danger'>You have to enter a the author's name.</span>";
                            break;
                        case "mysqlError":
                            var returnMsg = "<span class='text-danger'>The server was unable to connect to the MySql database</span>";
                            break;
                        case "success":
                            var returnMsg = "<span class='text-success'>The file has been published!";
                            break;
                        default:
                            var returnMsg = "<span class='text-danger'>No or unidentified response from the server: " + answer.returnCode + "</span>";
                    }
                    
                    // Return response
                    $(".settings #publish #successNote")
                        .html(returnMsg)
                        .fadeIn('slow', function() {
                            setTimeout(function() {
                                $(".settings #publish #successNote").fadeOut('slow', function() {});
                            }, 25000);
                        });
                }
             });
        }
    });
    
});