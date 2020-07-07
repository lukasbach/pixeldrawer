$(document).ready(function(){
    $(".settings .leftmenu div.tabBtn#tabDownload, .menubtn").click(function () {
        $.ajax({
            url: "ajax/downloadFile.php",
            type: "POST",
            data: {file: JSON.stringify(file)},
            dataType: "text",
            beforeSend: function() {
                $(".settings .content div.tab#download #output").html(
                    "<i class='icon-spinner icon-spin icon-large'></i> PNG image file is getting prepared..."
                );
            },
            success: function(answer) {
                //$("#downloadBtn").attr("href", "data:image/png;base64," + answer);
                //$("#downloadBtn").attr("download", "pixeldrawed.png");
                $(".settings .content div.tab#download #output").html(
                    "Click <a id='downloadBtn'>here</a> to download your drawing!"
                );
                
                $(".settings .content div.tab#download #output #downloadBtn")
                    //.addClass("btn btn-custom-red")
                    .attr("href", "data:image/png;base64," + answer)
                    .attr("download", "pixeldrawed.png");
                
                console.log(answer);
            },
            
         });
    });
});