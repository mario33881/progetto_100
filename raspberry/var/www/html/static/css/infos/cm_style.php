<?php
    /**
    *
    * Questo script restituisce/visualizza il CSS custom per la pagina delle informazioni.
    *
    * Prima imposta il content type a CSS e il set di caratteri a UTF-8,
    * impedisce al client di salvarsi nella cache il CSS facendo "scadere"
    * il CSS appena restituito,
    * recupera dallo script "/static/php/get_selectedcolor.php" 
    * il colore selezionato dall'utente e lo usa per restituire il CSS custom.
    *
    * > Il CSS NON deve essere salvato dal client per permettere 
    * > all'utente di cambiare colore all'interfaccia 
    * > (altrimenti il browser memorizza e usa il vecchio colore)
    *
    * @see "/static/php/get_selectedcolor.php"
    * @since 01_01
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @todo Per migliorare la leggibilita' e manutenibilità del codice sarebbe opportuno 
    *       richiamare get_colors() di get_selectedcolor.php, non usare $color definito nell'altro script
    *
    */

    // contenuto CSS, set caratteri UTF-8
    header("Content-type: text/css; charset: UTF-8");

    // imposta la scadenza del CSS per farlo scadere immediatamente
    // e permettere al client di richiederlo di nuovo
    header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");

    $textcolor = "white"; // colore testo

    // include/richiama lo script che definisce $color con il colore selezionato dall'utente
    include $_SERVER["DOCUMENT_ROOT"] . '/static/php/get_selectedcolor.php';

?>

/* sfondi colorati */
.bg-color-infos{
    background-color: <?php echo $color; ?>;
    color: <?php echo $textcolor; ?>;
}