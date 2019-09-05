<?php
    /** 
     * 
     * Questo script viene incluso dallo script cm_style.php
     * che restituisce tutto il CSS dinamico della pagina delle impostazioni.
     * 
     * Nello specifico questo script usa la variabile stringa $cm_bgcolor4 ($color di get_selectedcolor.php)
     * per restituire il CSS dei pulsanti
     * 
     * @since 01_01
     * @author Stefano Zenaro (https://github.com/mario33881)
     * @license MIT
     * @see /static/css/settings/cm_style.php include questo script
     * @see /static/php/get_selectedcolor.php definisce $color, incluso da cm_style.php e ridefinito in $cm_bgcolor4
     * @todo Rendere chiara la provenienza di $cm_bgcolor4 includendo direttamente get_selectedcolor.php
     *       > nota: se get_selectedcolor.php viene incluso negli altri script _cm_xxxxx.php
     *       >       PHP dara' errore per avere ridefinito funzioni gia' definite (usare function_exists() )
     * 
    */
    
    /* header tipo di file -> CSS */ 
    header("Content-type: text/css; charset: UTF-8");

    $textcolor = "#ffffff";    // colore testo (bianco)
    $bgcolor   = $cm_bgcolor4; // stringa valore esadecimale colore selezionato dall'utente

    // BORDER-COLOR PULSANTI
    $bordercolor = adjustBrightness($bgcolor, 15, true);  // true -> scurisci colore $bgcolor, 15 -> del 15%

    // BACKGROUND-COLOR HOVER
    $bghover = adjustBrightness($bgcolor, 10, true);  // true -> scurisci colore $bgcolor, 10 -> del 10%

    // BACKGROUND-COLOR FOCUS/ACTIVE/VISITED
    $bgfav = adjustBrightness($bgcolor, 10, false);  // false -> rendi il colore piu' chiaro, 10 -> del 10%
    
?>

/* Pulsanti */
.bg-color {
    color: <?php echo $textcolor; ?>;  /* colore testo */
    background-color: <?php echo $bgcolor; ?>; /* colore interno */
    border-color: <?php echo $bordercolor; ?>; /* colore bordo */
}

.bg-color:hover{
    background-color: <?php echo $bghover; ?>; /* colore interno mouse sopra oggetto */
}

.bg-color:focus, .bg-color:active , .bg-color:visited {
    background-color: <?php echo $bgfav; ?>; /* colore interno mouse ci clicca / ha cliccato sopra */
}
