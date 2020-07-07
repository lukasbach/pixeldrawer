$(document).ready(function(){
    var container = $(".mainmenu #load #openFilesList");
    
    if (typeof localStorage == "undefined") {
        // localStorage is not supported
        container.html("<p>WebStorage is not supported on this "
                       + "browser. This means that you neither can save nor open any image "
                       + "files, but still can directly publish them.</p>");
    } else if (localStorage.length == 0) {
        // no files saved yet
        container.html("<p>No drawings have been saved yet. Go and create some!</p>");
    } else {
        // List files
        $.each(localStorage, function(key, value) {
            var val = $.parseJSON(value);
            
            var element = $(document.createElement("div"));
            
            var icon = $(document.createElement("i"));
            var title = $(document.createElement("span"));
            
            icon.addClass("icon-picture");
            
            title.addClass("title");
            title.html(val.name);
            
            element.append(icon);
            element.append(title);
            
            element.click(function() {
                openFile(key);
            
                $(".toolbar").slideDown(600, function () {});
                $(".mainmenu").slideUp(600, function () {
                    // After sliding mainmenu up, show artboard
                    $('.artboard').fadeIn('slow', function() {});
                });
            });
            
            container.append(element);
        });
    }
});

// openFile() is very similar to artboardInit() .. Todo - create function
function openFile(key) {
    var artboardTable = $(".artboard table");
    artboardTable.html("");
    
    
    // Overwrite file-object
    file = $.parseJSON(localStorage[key]);
    
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
            
            // Define click function --> Color that cell
            $(td).hover(function() {
                if (isDrawing) {
                    drawPixel(this);
                    //this.style.backgroundColor = colors_selected;
                }
            });
            
            // Do the same if only clicking
            $(td).mousedown(function() {
                //this.style.backgroundColor = colors_selected;
                drawPixel(this);
            });
            
            tr.appendChild(td);
        }
        
        artboardTable.append($(tr));
    }
    
    // Create click/drag function
    $(".artboard table").mousedown(function() {
        isDrawing = true;
        
        // Return false to prevent selection
        return false;
    });
    $(document).mouseup(function() {
        isDrawing = false;
    });
}