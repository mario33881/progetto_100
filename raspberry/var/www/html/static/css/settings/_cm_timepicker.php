<?php
    /* header tipo di file -> CSS */ 
    header("Content-type: text/css; charset: UTF-8");

    $textcolor = "#ffffff";    // colore testo
    $bgcolor   = $cm_bgcolor4; // colore in home

    // BACKGROUND-COLOR AFTER

    $bg = adjustBrightness($bgcolor, 10, false); // false -> chiaro, 10 -> 10%

    $bg_array = hextorgb($bg);
    $bg_r = intval($bg_array[0]);
    $bg_g = intval($bg_array[1]);
    $bg_b = intval($bg_array[2]);

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
