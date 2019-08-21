<?php 
    /**
    * Questo file ottiene la lista dei colori selezionabili dall'utente sul DB 
    *
    * Verra' usato dal file "sendcolor.php" per riconoscere se l'utente ha selezionato un colore
    * esistente sul DB
    * 
    * @since 1.0.0
    */

    include ('db_connection.php'); // importa funzione dbconn($dbname) e queryToJson($mysqli, $query)

    // COSTANTI DATABASE
    $dbname = "db100_100";  // nome database
    $db_table = "t_colors"; // nome tabella colori nel database
    
    $mysqli = dbconn($dbname); // esegue la connessione al DB


    function get_colorslist($t_mysqli, $t_dbtable){
        /**
         * Questa funzione esegue la query per selezionare tutti i nomi dei colori dal DB, verranno restituiti in un array.
         *
         * La funzione esegue con la funzione queryToJson() la query 
         * per selezionare tutti i colori dal DB e ottiene il JSON,
         * converte il JSON ottenuto in array che verra' restituito
         *
         * @since 1.0.0
         * 
         * @param object $t_mysqli oggetto connessione gia' connesso al DB
         * @param string $t_dbtable tabella da dove prendere i colori
         * 
         * @return array $array_opts array di colori
        */

        // QUERY PER OTTENERE I DATI DALLA TABELLA
        $query = sprintf("SELECT color_name FROM `$t_dbtable`");
        
        // ESEGUI QUERY, OTTIENI DATI IN JSON
        $json = queryToJson($t_mysqli, $query); // ottengo colori in JSON
        $array_opts = json_decode($json, true); // decodifica json in un tipo php (array)
        
        // RESTITUISCI I DATI JSON
        return ($array_opts);
    }
    

    $colors_array = get_colorslist($mysqli, $db_table); // array pronto per il file "sendcolor.php"

    // CHIUDI CONNESSIONE
    $mysqli->close();
?>