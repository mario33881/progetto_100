<?php
    /* header tipo di file -> CSS */ 
    header("Content-type: text/css; charset: UTF-8");

    header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");

    /* colori dal DB */
    include $_SERVER["DOCUMENT_ROOT"] . '/static/php/get_selectedcolor.php';   // recupera $color 
    include $_SERVER["DOCUMENT_ROOT"] . '/static/php/rgb_hexconvertion.php'; // conversioni rgb e hex
    
    $cm_bgcolor4 = $color; //$array_colors[0]['cm_bgcolor4'];

    /* Stile pulsante custom */
    include(__DIR__ . '/_cm_button.php'); 

    /* Stile switch custom */
    include(__DIR__ . '/_cm_switch.php'); 

    /* Stile datepicker/selettore data */
    include(__DIR__ . '/_cm_datepicker.php');

    /* Stile timepicker/selettore ore/minuti */
    include(__DIR__ . '/_cm_timepicker.php'); 
?>
