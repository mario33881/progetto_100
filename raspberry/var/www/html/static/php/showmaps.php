<?php
   /**
    * Questo file visualizza in JSON il nome e il percorso delle mappe nel percorso /static/img/maps 
    *
    * File usato dal JS /static/js/main/options.js, il quale esegue una GET request a questa pagina
    * per ottenere la lista delle planimetrie per poterle rendere selezionabili dall'utente nella frontend
    * 
    * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @see /static/js/main/options.js script javascript con componente vue della pagina delle impostazioni
    * @todo rinominare questo script in get_xxxx.php o getxxxx.php per seguire lo "standard" del progetto
    */

    include ('getmaps.php'); // contiene funzione getmaps() che restituisce array di mappe

    $maps = getmaps($mapspath);      // array di mappe
    $json_maps = json_encode($maps); // array -> json
    print_r($json_maps);             // visualizza json
?>