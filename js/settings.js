$(document).ready( function() {
    // onClick for back btn
    $(".backBtn").click(function() {
        $('.settings').fadeOut('slow', function() {});
    });
    
    // onClick for menu element
    $(".settings .leftMenu div.tabBtn").click(function() {
        var newTab = $(this).attr("data-tabid");
        console.log("try");
        
        // Fade old tab out
        $('.settings .content .display').fadeOut('fast', function() {
            $('.settings .content .display').removeClass("display");
            
            // Fade new tab in after old one has finished fading out
            $('.settings .content ' + newTab).fadeIn('slow', function() {});
            $('.settings .content ' + newTab).addClass("display");
        });
        
    });
    
    // onClick for close Btn
    $("#closeAsk #closeBtn").click(function() {
        // Hide modal
        $("#closeAsk").modal("hide");
        
        // Destroy file variable
        file = file_default;
        
        // Get back to main menu
        $(".toolbar").slideUp(100, function () {});
        $(".artboard").slideUp(100, function () {});
        $(".settings").fadeOut(600, function () {
            // After sliding mainmenu up, show artboard
            $('.mainmenu').slideDown('slow', function() {});
        });
    });
});
