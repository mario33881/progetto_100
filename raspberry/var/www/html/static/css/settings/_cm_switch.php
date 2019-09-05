<?php
    /** 
     * Questo script viene incluso dallo script cm_style.php
     * che restituisce tutto il CSS dinamico della pagina delle impostazioni.
     * 
     * Nello specifico questo script usa la variabile stringa $cm_bgcolor4 ($color di get_selectedcolor.php)
     * per restituire il CSS dello switch
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

    $textcolor = "#ffffff";     // colore testo
    $bgcolor   = $cm_bgcolor4;  // valore esadecimale colore
    
    // BACKGROUND-COLOR CHECKED

    $bgchecked = adjustBrightness($bgcolor, 10, true);  // true -> scurisci colore, 10 -> del 10%

    // BACKGROUND-COLOR AFTER
    $bgaft = adjustBrightness($bgcolor, 10, false);  // false -> chiarisci colore, 10 -> del 10%

?>

/* Interruttore */
.switch label input[type=checkbox]:checked+.lever {
    background-color: <?php echo $bgchecked; ?>;
}

.switch label input[type=checkbox]:checked+.lever:after {
    background-color: <?php echo $bgaft; ?>;
}
