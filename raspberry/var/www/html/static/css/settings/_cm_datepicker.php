<?php
    /** 
     * Questo script viene incluso dallo script cm_style.php
     * che restituisce tutto il CSS dinamico della pagina delle impostazioni.
     * 
     * Nello specifico questo script usa la variabile stringa $cm_bgcolor4 ($color di get_selectedcolor.php)
     * per restituire il CSS del datepicker (calendario)
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
    $bgcolor   = $cm_bgcolor4; // valore esadecimale colore utente, proveniente da get_selectedcolor.php

    // BACKGROUND-COLOR light
    $bglight = adjustBrightness($bgcolor, 10, false);  // false -> chiarisci il colore, 10 -> del 10%

    // BACKGROUND-COLOR dark
    $bgdark = adjustBrightness($bgcolor, 10, true);  // true -> scurisci il colore, 10 -> del 10%
    
    // dividi il valore esadecimale $bglight nei tre componenti (red, green, blue) definiti con valori decimali ( 0 - 255 )
    $bglight_r = intval(hextorgb($bglight)[0]);  // intval converte stringa in numero (si assicura che il return di hextorgb sia numerico)
    $bglight_g = intval(hextorgb($bglight)[1]);  // intval converte stringa in numero (si assicura che il return di hextorgb sia numerico)
    $bglight_b = intval(hextorgb($bglight)[2]);  // intval converte stringa in numero (si assicura che il return di hextorgb sia numerico)
?>

/* datepicker / selettore data */
.datepicker-date-display {
    background-color: <?php echo $bglight; ?>;
}

.datepicker-cancel, .datepicker-clear, .datepicker-today, .datepicker-done {
    color: <?php echo $bgdark; ?>;
    padding: 0 1rem;
}

.datepicker-table td.is-selected {
    background-color: <?php echo $bgdark; ?>;
    color: <?php echo $textcolor; ?>;
}

.datepicker-table td:active {
    background-color: <?php echo $bgdark; ?>;
    color: <?php echo $textcolor; ?>;
}

.datepicker-table td:focus {
    background-color: <?php echo $bgdark; ?>;
    color: <?php echo $textcolor; ?>;
}

.datepicker-table td.is-today {
    color: <?php echo $bgdark; ?>;    
}
.datepicker-table td.is-today.is-selected {
    color: white;    
}

button.month-prev:active{
  background-color: <?php echo $bgdark; ?>;
}

button.month-next:active{
  background-color: <?php echo $bgdark; ?>;
}

.dropdown-content li>a, .dropdown-content li>span {
    color: <?php echo $bgdark; ?>;
}

.datepicker-day-button:focus {
    /* Giorno tabatto/trascinato */
    background-color: <?php echo "rgba($bglight_r, $bglight_g, $bglight_b, 0.25)" ?>;
}