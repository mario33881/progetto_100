<?php
    /* header tipo di file -> CSS */ 
    header("Content-type: text/css; charset: UTF-8");

    $textcolor = "#ffffff"; // colore testo
    $bgcolor   = $cm_bgcolor4; // colore in home

    // BACKGROUND-COLOR light
    $bglight = adjustBrightness($bgcolor, 10, false); // false -> chiaro, 10 -> 10%

    // BACKGROUND-COLOR dark
    $bgdark = adjustBrightness($bgcolor, 10, true); // false -> chiaro, 10 -> 10%
    
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