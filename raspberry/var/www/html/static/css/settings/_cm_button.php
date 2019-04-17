<?php
    /* header tipo di file -> CSS */ 
    header("Content-type: text/css; charset: UTF-8");

    $textcolor = "#ffffff"; // colore testo
    $bgcolor   = $cm_bgcolor4; //"#5B4E77"; // colore in home

    // BORDER-COLOR PULSANTI
    $bordercolor = adjustBrightness($bgcolor, 15, true); // false -> chiaro, 10 -> 10%

    // BACKGROUND-COLOR HOVER
    $bghover = adjustBrightness($bgcolor, 10, true); // false -> chiaro, 10 -> 10%

    // BACKGROUND-COLOR FOCUS/ACTIVE/VISITED
    $bgfav = adjustBrightness($bgcolor, 10, false); // false -> chiaro, 10 -> 10%
    
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
