<?php
    header("Content-type: text/css; charset: UTF-8");
    $typecolor = "white";// colore tip
?>

/*#######################################################################################################*/

/* PARTE TYPEWRITER */

.typewriter h1 {
  overflow: hidden; /* Si assicura che il contenuto non sia visibile prima dell'animazione */
  border-right: .15em solid <?php echo $typecolor; ?>;  /* typwriter cursore */
  white-space: nowrap; /* Mantiene contenuto sulla stessa riga */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Spazio tra lettere */
  animation:
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

/* Effetto scrittura */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* Effetto scrittura cursore typewriter */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: <?php echo $typecolor; ?>; }
}

/*#######################################################################################################*/

/* TESTO LISTA DATI SUL DB */

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: <?php echo $typecolor; ?>;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 105%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

/*#######################################################################################################*/

/* TESTI IN BASSO E IN ALTO A SINISTRA */

.w3-display-topleft {
  position: absolute;
  left: 0;
  top: 0;
}

.w3-display-bottomleft {
  position: absolute;
  left: 0;
  bottom: 0;
}
