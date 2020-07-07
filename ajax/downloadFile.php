<?php

// Convert a given array of colors (drawing) to an png image

if( !isset($_POST["file"]) ) {
    echo "noFileGiven";
    exit;
}

$file = $_POST["file"];
$file_decoded = json_decode($file, true);

$im = @imagecreatetruecolor($file_decoded["width"], $file_decoded["height"]);

$x = 0;
$y = 0;

foreach($file_decoded["drawing"] AS $rowY) {
    $y++;

    foreach($rowY AS $rowX) {    
        $x++;
        
        // Get color
        $rgb = hexToRGB($file_decoded["drawing"][$y - 1][$x - 1]);
        $color = imagecolorallocate ( $im , $rgb["r"] , $rgb["g"] , $rgb["b"] );
        
        // Draw pixel
        imagesetpixel ( $im , $x - 1 , $y - 1 , $color );
    }
    
    $x = 0;
}

// Get the output and convert to base64
// Trick idea from http://stackoverflow.com/questions/9370847/php-create-image-with-imagepng-and-convert-with-base64-encode-in-a-single-file

ob_start();
imagepng($im);
$imagedata = ob_get_contents();
ob_end_clean();

// Output image
echo base64_encode($imagedata);


// http://snipplr.com/view.php?codeview&id=4621
function hexToRGB($hex) {
        $hex = preg_replace("/#/", "", $hex);
        $color = array();
        
        if(strlen($hex) == 3) {
                $color['r'] = hexdec(substr($hex, 0, 1) . substr($hex, 0, 1));
                $color['g'] = hexdec(substr($hex, 1, 1) . substr($hex, 1, 1));
                $color['b'] = hexdec(substr($hex, 2, 1) . substr($hex, 2, 1));
        }
        else if(strlen($hex) == 6) {
                $color['r'] = hexdec(substr($hex, 0, 2));
                $color['g'] = hexdec(substr($hex, 2, 2));
                $color['b'] = hexdec(substr($hex, 4, 2));
        }
        
        return $color;
}
?>