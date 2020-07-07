
$(document).ready(function() {
    // onChange function
    $('.clpicker #picker').farbtastic( function(color) {
        
        // Set Bg color of big div
        $(".clpicker #currentColorPreview").css("background-color", color);
        
        // Set value of textfield
        $(".clpicker input#currentColor").val(color);
        
        // Set bg colors for color variations (shades)
        /* WIP
        $(".colorpicker .colorvariations.shades .0").css("background-color",
            colorLuminance(color, -0.3));
        $(".colorpicker .colorvariations.shades .1").css("background-color",
            colorLuminance(color, -0.2));
        $(".colorpicker .colorvariations.shades .2").css("background-color",
            colorLuminance(color, -0.1));
        $(".colorpicker .colorvariations.shades .3").css("background-color",
            color);
        $(".colorpicker .colorvariations.shades .4").css("background-color",
            colorLuminance(color, 0.1));
        $(".colorpicker .colorvariations.shades .5").css("background-color",
            colorLuminance(color, 0.2));
        $(".colorpicker .colorvariations.shades .6").css("background-color",
            colorLuminance(color, 0.3));
            */
    });
    
    // Change function
    $(".toolbar .clpicker button.use").click( function() {
        // Check if color already exists, if not, add Color
        var colorExists = false;
        var thisColor = $(".clpicker input#currentColor").val();
        
        $.each( colors, function( key, value ) {
            if (value.color == thisColor) {
                colorExists = true;
            }
        });

        if (!colorExists) {
            addColor(thisColor);
        }
    });
    
    // Manually changing color
    $(".clpicker input#currentColor").change( function() {
        $.farbtastic('.clpicker #picker').setColor($(".clpicker input#currentColor").val());
    });
    
    // Click function to open
    $(".toolbar .colors .changeColor").click(function () {
        $('.clpicker').slideDown();
    });
    
    // Close function
    $(".toolbar .clpicker button").click(function () {
        $('.clpicker').slideUp();
    });
    
});

