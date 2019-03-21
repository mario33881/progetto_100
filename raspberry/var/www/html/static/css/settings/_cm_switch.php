<?php
    /* header tipo di file -> CSS */ 
    header("Content-type: text/css; charset: UTF-8");

    $textcolor = "#ffffff";    // colore testo
    $bgcolor   = $cm_bgcolor4; // colore in home
    
    // BACKGROUND-COLOR CHECKED

    $bgchecked = adjustBrightness($bgcolor, 10, true); // true -> scuro, 10 -> 10%

    // BACKGROUND-COLOR AFTER
    $bgaft = adjustBrightness($bgcolor, 10, false); // false -> chiaro, 10 -> 10%

?>

/* Interruttore */
.switch label input[type=checkbox]:checked+.lever {
    background-color: <?php echo $bgchecked; ?>;
}

.switch label input[type=checkbox]:checked+.lever:after {
    background-color: <?php echo $bgaft; ?>;
}
