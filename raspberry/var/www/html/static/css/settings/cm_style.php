<?php
    /** 
     * Questo script include tutti gli script _cm_xxxxx.php
     * e restituisce tutto il CSS dinamico della pagina delle impostazioni.
     * 
     * Nello specifico questo script usa la variabile stringa $cm_bgcolor4 ($color di get_selectedcolor.php)
     * per restituire il CSS del timepicker (orologio)
     * 
     * @since 01_01
     * @author Stefano Zenaro (https://github.com/mario33881)
     * @license MIT
     * @see /static/php/rgb_hexconvertion.php include funzioni utili a operare sui colori
     * @see /static/php/get_selectedcolor.php definisce $color, ridefinito in $cm_bgcolor4
     * @todo Rimuovere la definizione di $cm_bgcolor4 e usare direttamente $color negli altri script:
     *       > Si potrebbe rimuovere l'inclusione di get_selectedcolor.php, includerlo negli altri
     *       > script e evitare errori causati dalla ridefinizione delle funzioni con function_exists().
     *       > Ancora meglio sarebbe richiamare la funzione get_colors() di get_selectedcolor.php
     *       > per ottenere il colore dal database e non usare una variabile definita in un altro script, 
     *       > renderebbe il codice piu' leggibile e manutenibile
     * @todo Come per lo script get_selectedcolor.php si potrebbe includere rgb_hexconvertion.php 
     *       direttamente negli altri script per rendere il codice piu' leggibile perche'
     *       piu' facile da "navigare"
     *       > E' sempre necessaria la funzione function_exists()
     * 
    */

    // header tipo di file -> CSS, set di caratteri utf-8
    header("Content-type: text/css; charset: UTF-8");

    // Fai scadere il CSS per permettere al client di scaricare il CSS con l'ultimo colore selezionato
    header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");

    // includi script per ottenere colore selezionato dall'utente dal DB (valore contenuto in stringa $color)
    include $_SERVER["DOCUMENT_ROOT"] . '/static/php/get_selectedcolor.php';

    // includi script che permette di convertire colori RGB in esadecimale e viceversa, e di chiarire/scurire i colori di una certa percentuale
    include $_SERVER["DOCUMENT_ROOT"] . '/static/php/rgb_hexconvertion.php';
    
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
