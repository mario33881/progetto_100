<?php
    /**
     * Questo file rende disponibili funzioni utili all'elaborazione dei colori
     * 
     * File usato dai CSS "dinamici" in php ( "/static/settings/cm_style.php" )
     * 
     * @since 01_01
     * @author Stefano Zenaro (https://github.com/mario33881)
     * @license MIT
     * @see "/static/settings/cm_style.php" script PHP che restituisce il CSS dinamico della pagina delle impostazioni
    */

    $boold = false;


    function adjustBrightness($hex, $percent, $darken = true) { 
        /**
         * Prende una stringa colore esadecimale $hex, e se:
         *   - $darken = true -> rende piu' scuro il colore di $percent %
         *   - $darken = false -> rende piu' chiaro il colore di $percent %
         * 
         * infine restituisce la stringa del nuovo colore in esadecimale
         * 
         * @since 01_01
         * @param string $hex valore esadecimale di un colore
         * @param integer $percent valore percentuale per cui chiarire/scurire colore $hex
         * @param bool $darken se vero scurisce $hex del $percent %, altrimenti lo chiarisce del $percent %
         * @return string $return valore esadecimale del colore chiarito/scurito
        */     
        
        $brightness = $darken ? -255 : 255; // $brightness = -255 se $darken = true, altrimenti $brightness = 255
        
        $steps = $percent*$brightness/100; // $steps e' in proporzione alla percentuale

        // $steps deve essere compreso tra -255 e 255, negativo = colore piu' scuro, positivo = colore piu' chiaro
        $steps = max(-255, min(255, $steps)); 

        // Rende l'esadecimale lungo 6 caratteri
        $hex = str_replace('#', '', $hex);
        if (strlen($hex) == 3) {
            $hex = str_repeat(substr($hex,0,1), 2).str_repeat(substr($hex,1,1), 2).str_repeat(substr($hex,2,1), 2);
        }

        // Divide in tre parti $hex: R, G and B
        $color_parts = str_split($hex, 2);
        $return = '#';

        foreach ($color_parts as $color) {
            $color   = hexdec($color);                                // converte parte di colore in decimale
            $color   = max(0,min(255,$color + $steps));               // Modifica colore ( 0 < $color + $steps < 255)
            $return .= str_pad(dechex($color), 2, '0', STR_PAD_LEFT); // esadecimale di 2 caratteri
        }

        return $return;
    }


    function hextorgb(string $t_hex){
        /** 
         * 
         * Converte una stringa colore esadecimale
         * in un array colore rgb (r, g, b)
         * 
         * @since 01_01
         * @param string $t_hex valore esadecimale di un colore
         * @return array array($dec_r, $dec_g, $dec_b) componenti del colore $t_hex con valori decimali
         * 
        */

        $hex_r = substr($t_hex, 1, 2); // prende 2 caratteri dal 1 (r in hex , salta #)
        $hex_g = substr($t_hex, 3, 2); // prende 2 caratteri dal 3 (g in hex)
        $hex_b = substr($t_hex, 5, 2); // prende 2 caratteri dal 5 (b in hex)
        
        $dec_r = hexdec($hex_r); // converte r in dec
        $dec_g = hexdec($hex_g); // converte g in dec
        $dec_b = hexdec($hex_b); // converte b in dec

        if($GLOBALS['boold']){
            // visualizzazione debug
            echo "hex_r = $hex_r -> $dec_r <br />";
            echo "hex_g = $hex_g -> $dec_g <br />";
            echo "hex_b = $hex_b -> $dec_b <br /><br />";
        }

        // return array "rgb"
        return array($dec_r, $dec_g, $dec_b);
    }


    function rgbtohex(string $t_rgb){
        /**
         * 
         * Converte una stringa colore rgb
         * in una stringa colore esadecimale
         * 
         * @since 01_01
         * @param string $t_rgb colore con componenti r, g e b
         * @return string "#$hex_r$hex_g$hex_b" colore $t_rgb in esadecimale
         */

        // Prende il contenuto fra parentesi
        $rgbcsv = substr($t_rgb, 4, -1);

        // Fa split su ','
        $rgbarray = explode(',', $rgbcsv);

        $dec_r = $rgbarray[0]; // valore decimale r
        $dec_g = $rgbarray[1]; // valore decimale g
        $dec_b = $rgbarray[2]; // valore decimale b

        // evito che i valori siano maggiori di 255
        if ($dec_r > 255){
            $dec_r = 255;
        }
        if ($dec_g > 255){
            $dec_g = 255;
        }
        if ($dec_b > 255){
            $dec_b = 255;
        }

        $hex_r = dechex($dec_r); // conversione r in hex
        $hex_g = dechex($dec_g); // conversione g in hex
        $hex_b = dechex($dec_b); // conversione b in hex

        // conversioni in stringhe
        $hex_r = "$hex_r";
        $hex_g = "$hex_g";
        $hex_b = "$hex_b";

        // i numeri hex devono essere due per colore: 
        // risolve problema: #0x -> x -> #x
        if (strlen($hex_r) == 1){
            $hex_r = "0" . $hex_r;
        }
        if (strlen($hex_g) == 1){
            $hex_g = "0" . $hex_g;
        }
        if (strlen($hex_b) == 1){
            $hex_b = "0" . $hex_b;
        }

        if($GLOBALS['boold']){
            // visualizzazione debug
            echo "dec_r = $dec_r ->  $hex_r <br />";
            echo " dec_g = $dec_g ->  $hex_g <br />";
            echo " dec_b = $dec_b -> $hex_b <br /><br />";
        }

        // return stringa "hex"
        return "#$hex_r$hex_g$hex_b";
    }


    if ($boold){
        // se $boold e' true viene eseguito questo breve test
        $hex = '#4285F4';

        $rgbarray = hextorgb($hex);
        $rgb = "rgb(" . $rgbarray[0] . ", " . $rgbarray[1] . "," . $rgbarray[2] . ")";
        echo $rgb;
        $result = rgbtohex($rgb);

        echo $result;
        echo "<br />============================================ <br />";

        if (strtolower($result) == strtolower($hex)){
            echo "Test delle funzioni RIUSCITO<br />";
            echo "Working as expected!";
        }
        
        else{
            echo "Test delle funzioni FALLITO<br />";
            echo "There's an error somewhere!";
        }
    }

?>