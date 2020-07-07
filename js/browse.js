$(document).ready(function(){    
    // Goto Browse section btn
    $(".mainmenu .buttons #browse").click(function () {
        $(".mainmenu").slideUp("slow", function () {});
        $(".browse .bar").slideDown("slow", function () {});
        showNewDrawing();
    });
    
    // leave browse section btn
    $(".browse #leave button").click(function () {
        $(".mainmenu").slideDown("slow", function () {});
        $(".browse .bar").slideUp("slow", function () {});
        $('.browseartboard').fadeOut('slow', function() {});
    });
});


function showNewDrawing() {
    $.ajax({
        url: "ajax/browseFile.php",
        dataType: "json",
        success: function(file) {
            if(!("returnCode" in file)) {

                var artboardTable = $(".browseartboard table");
                artboardTable.html("");
                
                
                // Overwrite file-object
                //file = $.parseJSON(answer);
                
                $(".browse #imgname .value").html(file.name);
                $(".browse #author .value").html(file.author);

                // Create table
                for (var y=0;y<file.height;y++) {
                    // Create html
                    var tr = document.createElement("tr");
                    tr.setAttribute("id", "y" + y);
                    
                    for (var x=0;x<file.width;x++) {
                        // Create Html
                        var td = document.createElement("td");
                        $(td).attr("id", "x" + x);
                        $(td).css("background-color", file.drawing[y][x]);
                        
                        tr.appendChild(td);
                    }
                    
                    artboardTable.append($(tr));
                }

                $('.browseartboard').fadeIn('slow', function() {});
            } else {
                showNewDrawing();
            }
        }
     });
}