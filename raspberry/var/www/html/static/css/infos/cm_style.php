<?php
    header("Content-type: text/css; charset: UTF-8");

    header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");

    $textcolor = "white"; // colore testo

    /* colori dal DB */
    include $_SERVER["DOCUMENT_ROOT"] . '/static/php/get_selectedcolor.php';   // recupera $color
    
    $cm_bgcolor3 = $color; //$array_colors[0]['cm_bgcolor3'];

?>

/* sfondi colorati */
.bg-color-infos{
      background-color: <?php echo $cm_bgcolor3; ?>;
      color: <?php echo $textcolor; ?>;
}