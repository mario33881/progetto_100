<?php
    /** 
     * Questo script viene incluso dallo script cm_style.php
     * che restituisce tutto il CSS dinamico della pagina delle impostazioni.
     * 
     * Nello specifico questo script usa la variabile stringa $cm_bgcolor4 ($color di get_selectedcolor.php)
     * per restituire il CSS del timepicker (orologio)
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

    $textcolor = "#ffffff";    // colore testo
    $bgcolor   = $cm_bgcolor4; // valore esadecimale colore 

    // BACKGROUND-COLOR AFTER

    $bg = adjustBrightness($bgcolor, 10, false); // false -> chiarisci colore, 10 -> del 10%

    $bg_array = hextorgb($bg);     // ottieni array con i valori decimali dei componenti di $bg
    $bg_r = intval($bg_array[0]);  // assicurati che il componente rosso (red) sia un numero
    $bg_g = intval($bg_array[1]);  // assicurati che il componente verde (green) sia un numero
    $bg_b = intval($bg_array[2]);  // assicurati che il componente blu (blue) sia un numero

?>


/* colori timepicker/selettore ore e minuti */
.timepicker-digital-display{
    background-color: <?php echo $bg; ?>;
}

timepicker-svg > g > line{
    fill: <?php echo $bg; ?>;
    stroke: <?php echo $bg; ?>;
}

.timepicker-canvas line {
    stroke: <?php echo $bg; ?>;
}

.timepicker-canvas-bg{
    fill: <?php echo $bg; ?>;
}

.timepicker-canvas-bearing{
    fill: <?php echo $bg; ?>;
}

.btn-flat.timepicker-close.waves-effect{
    color: <?php echo $bg; ?>;
}

.text-primary{
    color: <?php echo $textcolor; ?>!important;
}

.timepicker-tick:hover{
    background-color: <?php echo "rgba($bg_r, $bg_g, $bg_b, 0.25)"; ?>;
}
