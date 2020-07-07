$(document).ready(function(){
    // Scrolling for the about page
    //$('.mainmenu .content #about').tinyscrollbar();
    
    // Menu buttons
    $(".mainmenu .buttons #new").click(function () {
        $(".mainmenu .content #load").slideUp("slow", function () {});
        $(".mainmenu .content #about").slideUp("slow", function () {});
        $(".mainmenu .content #new").slideDown("slow", function () {});
    });
    
    $(".mainmenu .buttons #load").click(function () {
        $(".mainmenu .content #load").slideDown("slow", function () {});
        $(".mainmenu .content #about").slideUp("slow", function () {});
        $(".mainmenu .content #new").slideUp("slow", function () {});
    });
    
    $(".mainmenu .buttons #about").click(function () {            
        $(".mainmenu .content #load").slideUp("slow", function () {});
        $(".mainmenu .content #about").slideDown("slow", function () {});
        $(".mainmenu .content #new").slideUp("slow", function () {});
    });
    
    // Click function for browse is at js/browse.js
    
    
    $(".mainmenu .content #new #createBtn").click(function () {
        file.name = $(".mainmenu .content #inputName")[0].value;
        file.width = $(".mainmenu .content #inputWidth")[0].value;
        file.height = $(".mainmenu .content #inputHeight")[0].value;
        
        $(".settings .content #saveAs  #inputSaveAs")[0].value = file.name;
        $(".settings .content #publish #inputSaveAs")[0].value = file.name;
        
        artboardInit();
        
        $(".toolbar").slideDown(600, function () {});
        $(".mainmenu").slideUp(600, function () {
            // After sliding mainmenu up, show artboard
            $('.artboard').fadeIn('slow', function() {});
        });
    });
});