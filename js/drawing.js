var file_default = {
    name: undefined,
    width: undefined,
    height: undefined,
    drawing: []
}
var file = file_default;
var isDrawing = false;

function artboardInit() {
    var artboardTable = $(".artboard table");
    artboardTable.html(""); // Clear
    
    // Create table
    for (var y=0;y<file.height;y++) {
        // Create html
        var tr = document.createElement("tr");
        tr.setAttribute("id", "y" + y);
        
        // Create Object
        file.drawing[y] = [];
        
        for (var x=0;x<file.width;x++) {
            // Create Html
            var td = document.createElement("td");
            td.setAttribute("id", "x" + x);
            
            // Create Object
            file.drawing[y][x] = "#fff";
            
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

function drawPixel(element) {
    var x = element.getAttribute("id").substring(1);
    var y = element.parentNode.getAttribute("id").substring(1);
    
    console.log(x + " " + y);
    
    // Change Html
    element.style.backgroundColor = colors_selected;
    
    // Save in object
    file.drawing[y][x] = colors_selected;
}