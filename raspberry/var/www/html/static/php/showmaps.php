<?php
   /**
    * Questo file visualizza in JSON il nome e il percorso delle mappe nel percorso /static/img/maps 
    *
    * File usato dal JS /static/js/main/options.js
    * 
    * @since 1.1.0
    */

    include ('getmaps.php'); // contiene funzione getmaps() che restituisce array di mappe

    $maps = getmaps($mapspath);      // array di mappe
    $json_maps = json_encode($maps); // array -> json
    print_r($json_maps);             // visualizza json
?>