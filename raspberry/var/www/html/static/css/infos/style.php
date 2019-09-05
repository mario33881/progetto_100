<?php
    /** 
    *
    * Restituisce/visualizza il CSS "statico" della pagina delle informazioni.
    *
    * Imposta il contenuto della risposta a CSS e il set di caratteri a UTF-8
    * e usa la variabile $typecolor per scegliere il colore del "caret"
    *
    * @since 01_01
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    *
    */
    
    // contenuto CSS e set di caratteri Utf-8
    header("Content-type: text/css; charset: UTF-8");
    
    // colore tip/cursore
    $typecolor = "white";
?>

/*#######################################################################################################*/

/*  PARTE TYPEWRITER
    Credits: https://css-tricks.com/snippets/css/typewriter-effect/
*/

.typewriter h1 {
    overflow: hidden;  /* Si assicura che il contenuto non sia visibile prima dell'animazione */
    border-right: .15em solid <?php echo $typecolor; ?>;  /* typwriter cursore */
    white-space: nowrap;    /* Mantiene contenuto sulla stessa riga */
    margin: 0 auto;         /* Gives that scrolling effect as the typing happens */
    letter-spacing: .15em;  /* Spazio tra lettere */
    animation:
        typing 3.5s steps(40, end),          /* animazione scrittura: dura 3.5 secondi e impiega 40 step da inizio a fine animazione */
        blink-caret .75s step-end infinite;  /* animazione blink cursore: dura 0.74 secondi, l'animazione rimane nello stato iniziale finche' non e' terminata, ripeti all'infinito */
}

/* Effetto scrittura */
@keyframes typing {
    from { width: 0 }   /* passa da 0% lunghezza */
    to { width: 100% }  /* al 100% (gradualmente nei 40 step) */
}

/* Effetto scrittura cursore typewriter */
@keyframes blink-caret {
    from, to { border-color: transparent }  /* L'inizio e fine animazione rende trasparente/invisibile il cursore */
    50% { border-color: <?php echo $typecolor; ?>; }  /* A meta' animazione il cursore ha il colore $typecolor */
}

/*#######################################################################################################*/

/* TESTO LISTA DATI SUL DB */

.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;       /* nascondi il tooltip    */
    width: 120px;             /* 120 pixel di lunghezza */
    background-color: black;  /* colore di sfondo nero  */
    color: <?php echo $typecolor; ?>; /* colore del testo bianco */
    text-align: center;       /* allinea il testo al centro                  */
    border-radius: 6px;       /* raggio di 6 pixel sul bordo (smussa angoli) */
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;  /* posizione assoluta                                  */
    z-index: 1;          /* livello di sovrapposizione 1 (metti sopra al resto) */
    top: -5px;
    right: 105%;
}

.tooltip:hover .tooltiptext {
    visibility: visible;  /* Quando il cursore passa sopra al tooltip, visualizzalo */
}

/*#######################################################################################################*/

/* TESTI IN BASSO E IN ALTO A SINISTRA */

.w3-display-topleft {
    position: absolute;  /* posizione assoluta  */
    left: 0;             /* 0 pixel da sinistra */
    top: 0;              /* 0 pixel dall'alto   */
}

.w3-display-bottomleft {
    position: absolute;  /* posizione assoluta  */
    left: 0;             /* 0 pixel da sinistra */
    bottom: 0;           /* 0 pixel dal basso   */
}
