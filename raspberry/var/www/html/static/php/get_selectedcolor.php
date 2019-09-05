<?php 
    /**
    * Questo file ottiene dalla tabella dei colori il valore esadecimale del colore selezionato dall'utente (tabella opzioni) 
    *
    * File usato dai CSS "dinamici" in php ( "/static/infos/cm_style.php" e "/static/settings/cm_style.php" )
    * 
    * @since 01_01
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @see /static/css/infos/cm_style.php script PHP che restituisce il CSS dinamico della pagina delle informazioni
    * @see /static/css/settings/cm_style.php script PHP che restituisce il CSS dinamico della pagina delle impostazioni
    * @todo Per migliorare la leggibilita' e manutenibilità del codice sarebbe opportuno 
    *       richiamare get_colors nei due script dei CSS dinamici
    */
        
    include ('db_connection.php'); // importa funzione dbconn($dbname) e queryToJson($mysqli, $query)

    // COSTANTI DATABASE
    $dbname = "db100_100";     // nome database
    $opttable = "t_options";   // nome tabella opzioni
    $colorstable = "t_colors"; // nome tabella colori


    function get_colors($t_mysqli, $t_opttable, $t_colorstable){
        /**
         * Questa funzione esegue la query per selezionare il colore selezionato dall'utente.
         *
         * La funzione esegue con la funzione queryToJson() la query 
         * per selezionare il colore (esadecimale) e ottiene il JSON,
         * converte il JSON ottenuto in array che verra' restituito
         *
         * @since 01_01
         * 
         * @param object $t_mysqli oggetto connessione gia' connesso al DB
         * @param string $t_opttable tabella da dove prendere colore selezionato
         * @param string $t_colorstable tabella da dove prendere esadecimale del colore selezionato
         * 
         * @return array $array_opts array con il colore in esadecimale
        */
        
        // QUERY PER OTTENERE I DATI DALLA TABELLA
        $query = sprintf("SELECT color_hex 
                        FROM $t_colorstable
                        INNER JOIN $t_opttable 
                        ON $t_colorstable.color_name = $t_opttable.color_scheme");

        // ESEGUI QUERY, OTTIENI DATI IN JSON
        $json = queryToJson($t_mysqli, $query);
        
        // CONVERTI JSON IN ARRAY
        $t_array_colors = json_decode($json, true);

        // RESTITUISCI I DATI ARRAY
        return $t_array_colors;
    }


    $mysqli = dbconn($dbname); // esegue la connessione al DB

    $array_colors = get_colors($mysqli, $opttable, $colorstable); // ottengo l'array con il colore

    // CHIUDI CONNESSIONE
    $mysqli->close();

    $color = $array_colors[0]['color_hex']; // variabile pronta per essere usata dai CSS "dinamici" 

?>
