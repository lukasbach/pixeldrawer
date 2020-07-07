//$(document).ready(function(){
    var introLogoFadein        = setTimeout(function() {  $(".intro-logo").fadeIn(1500, function () {});  },    20);
    var introLogoFadeOut       = setTimeout(function() {  $(".intro-logo").fadeOut(1500, function () {});  }, 2000);
    
    var introTextFadein        = setTimeout(function() {  $(".intro-text").fadeIn(1500, function () {});  },  3500);
    var introTextFadeOut       = setTimeout(function() {  $(".intro-text").fadeOut(1500, function () {});  }, 5000);
    
    var introMainmenuSlideDown = setTimeout(function() {  $(".mainmenu").slideDown(600, function () {});  },  6500);
    
    var introUnbindAbort       = setTimeout(function() {  $( "html" ).unbind( "click", abortIntro);  },       7100);
    
    // Abort animations when clicking
    $( "html" ).bind( "click", abortIntro);
//});

function abortIntro() {
    clearTimeout(introLogoFadein);
    clearTimeout(introLogoFadeOut);
    clearTimeout(introTextFadein);
    clearTimeout(introTextFadeOut);
    clearTimeout(introUnbindAbort);
    clearTimeout(introMainmenuSlideDown);
    
    // Unbind this function
    $( "html" ).unbind( "click", abortIntro);
    
    // Hide all elements
    $(".intro-logo").css("display", "none");
    $(".intro-text").css("display", "none");
    
    // Show mainmenu
    $(".mainmenu").slideDown(600, function () {});
}

$(document).ready(function() {
    // TEMP
    options_abortIntro = false;
    
    if (options_abortIntro) {
        abortIntro();
    }
});