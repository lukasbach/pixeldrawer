$(document).ready(function(){
    
    $(".settings .content #saveAs #saveBtn").click(function() {
        file.name = $(".settings .content #saveAs #inputSaveAs").val();
        
        if (typeof localStorage != "undefined") {            
            // Save
            var newStorageId = localStorage.length;
            var data = JSON.stringify(file);
            localStorage[newStorageId] = data;
            
            // Test if it worked
            if (localStorage[newStorageId] == data) {
                $(".settings #saveAs #successNote")
                    .html("<span class='text-success'>Your picture has been sucessfully saved.</span>")
                    .fadeIn('slow', function() {
                        setTimeout(function() {
                            $(".settings #saveAs #successNote").fadeOut('slow', function() {});
                        }, 5000);
                    }); 
            } else {
                $(".settings #saveAs #successNote")
                    .html("<span class='text-danger'>Your Browser wasn't able to save the picture. Maybe your Webstorage if full? (10mb by default per webpage for most browsers)</span>")
                    .fadeIn('slow', function() {
                        setTimeout(function() {
                            $(".settings #saveAs #successNote").fadeOut('slow', function() {});
                        }, 5000);
                    });
            }
        }
        else {
            $(".settings #saveAs #successNote")
                .html("<span class='text-danger'>Your Browser doesn't support HTML5 Web Storage.</span>")
                .fadeIn('slow', function() {
                    setTimeout(function() {
                        $(".settings #saveAs #successNote").fadeOut('slow', function() {});
                    }, 5000);
                });
        }
    });
    
});