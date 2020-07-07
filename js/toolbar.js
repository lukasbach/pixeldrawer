var colors = {};
var colors_count = 0;
var colors_selected = "#000";

$(document).ready( function() {
    // onClick for the settings btn
    $(".menubtn").click(function() {
        $('.settings').fadeIn('slow', function() {});
    });
    
    /* [NOT USING MINICOLORS ANYMORE - NOW USING FARBTASTIC, CODE IN js/colorpicker.js and lib/jqueryFarbtastic/]
    // Enabling miniColors
    $(".color-picker").minicolors({
            position: "top left",
            textfield: false,
            change: function(hex, rgb) {
                //$(".changeColor")[0].style.backgroundColor = hex;
            },
            open: function(hex, rgb) {
            },
            hide: function() {
                // Check if color already exists, if not, add Color
                var colorExists = false;
                var thisColor = $(".color-picker").minicolors("value");
                
                $.each( colors, function( key, value ) {
                    if (value.color == thisColor) {
                        colorExists = true;
                    }
                });
    
                if (!colorExists) {
                    addColor(thisColor);
                }
            }
    });
        
    $(".changeColor").click(function () {
           $(".color-picker").minicolors('show');
    });
    */
});

function addColor(hex) {
    // Count up to get this colors id
    colors_count++;
    
    // Create Element
    var container = $(".colors")[0];
    var element = document.createElement("div");
    element.setAttribute("class", "color");
    element.setAttribute("id", colors_count);
    element.style.backgroundColor = hex;
    
    // Create Click element
    $(element).click(function() {
        selectColor(this.getAttribute("id"));
    });
    
    // Create right click element
    $(element).bind("contextmenu",function(){
        return removeColor(this.getAttribute("id"));
    });
    
    
    container.appendChild(element);
    
    
    // Add to colors variable
    colors[colors_count] = {
        color: hex,
        selected: false
    }
    
    // Select color
    selectColor(colors_count);
}

function selectColor(id) {
    // Deselect all Colors
    $.each( colors, function( key, value ) {
        // Delete from object
        colors[key]["selected"] = false;
        
        // Remove class from html element
        $(".colors .color#" + key)[0].setAttribute("class", "color");
        $(".colors .color#" + key)[0].style.borderTop = "none";
    });
    
    // Select color
    colors[id]["selected"] = true;
    colors_selected = colors[id]["color"];
    
    // Add class to html object
    $(".colors .color#" + id)[0].setAttribute("class", "color selected");
    $(".colors .color#" + id)[0].style.borderTop = "solid " + LightenDarkenColor(colors_selected, 60) + " 4px";
}

function removeColor(id) {
    var $this = $(".colors .color#" + id);
    var wasSelected = colors[id]["selected"];
    
    // Remove html element
    $this.remove();
    
    // Remove object
    delete colors[id];
    
    // Select another element if this one was selected
    if (wasSelected) {
        // Select the first color in the colors object
        selectColor(Object.keys(colors)[0]);
    }
    
    return false; // prevent context menu
}