<?php 
    /**
	* Questo file ottiene la mappa selezionata dall'utente (tabella opzioni) 
    *
    * File usato dal JS "/static/js/main/home.js"
	* 
	* @since 1.0.0
    */

    include ($_SERVER["DOCUMENT_ROOT"] . '/static/php/db_connection.php'); // importa funzione dbconn($dbname) e queryToJson($mysqli, $query)

	// COSTANTI DATABASE
	$dbname = "db100_100";   // nome database
	$db_table = "t_options"; // nome tabella impostazioni nel database
    
    $mysqli = dbconn($dbname); // esegue la connessione al DB


    function get_map($t_mysqli, $t_dbtable){
        /**
		 * Questa funzione esegue la query per selezionare la mappa selezionata dall'utente.
		 *
		 * La funzione esegue con la funzione queryToJson() la query 
         * per selezionare la mappa e ottiene il JSON,
         * converte il JSON ottenuto in array che verra' restituito
         *
		 * @since 1.0.0
         * 
		 * @param object $t_mysqli oggetto connessione gia' connesso al DB
         * @param string $t_dbtable tabella impostazioni
		 * 
		 * @return array $array_opts array con la mappa
        */

        // QUERY PER OTTENERE I DATI DALLA TABELLA
        $query = sprintf("SELECT map FROM `$t_dbtable`");
        
        // ESEGUI QUERY, OTTIENI DATI IN JSON
        $json = queryToJson($t_mysqli, $query);
        $array_opts = json_decode($json, true); // decodifica json in un tipo php (array) 

        // RESTITUISCI I DATI IN ARRAY
        return ($array_opts);
    }
    

    function join_paths() {
        /**
		 * Questa funzione concatena i parametri in un percorso.
		 *
		 * La funzione scorre i parametri passati alla funzione, 
         * se non sono stringhe nulle le aggiunge in un array, 
         * gli elementi dell'array verranno uniti con il separatore di sistema,
         * infine verranno rimossi tutti i separatori di sistema doppi
         *
		 * @since 1.1.0
         * 
		 * @param string sono accettati piu' parametri stringhe
		 * 
		 * @return string percorso ottenuto concatenando i parametri
        */

        $paths = array(); // crea array
    
        foreach (func_get_args() as $arg) {
            // per ogni argomento passato alla funzione
            // se non vuoto, aggiungilo a paths
            if ($arg !== '') { $paths[] = $arg; }
        }
        
        // join unisce il contenuto di $paths
        // preg_replace esegue Regular Expression (primo parametro RE, sostituto al pattern, stringa)
        // + -> ricorrenze (/ , // , ///), # indica inizio e fine pattern
        // DIRECTORY_SEPARATOR, separatore di sistema

        return preg_replace('#' . DIRECTORY_SEPARATOR . '+#', DIRECTORY_SEPARATOR, join(DIRECTORY_SEPARATOR, $paths));
    }

    $map_array = get_map($mysqli, $db_table);

    $map = $map_array[0]["map"]; // mappa selezionata dall'utente
    
    $mappath = join_paths(__DIR__, "maps", $map . ".svg"); // percorso mappa
    if(file_exists($mappath)){
        // se la mappa si trova nella cartella maps, controlla se svg

        if (mime_content_type($mappath) === "image/svg+xml"){
            echo readfile($mappath);
        }
        else{
            echo "Il file non ha mime type = SVG";
        }
        
    }
    else{
        // qualcosa e' andato storto (DB manomesso/incompleto)
        echo "mappa '" . htmlspecialchars($map) . "' non trovata";
    }
    
    // CHIUDI CONNESSIONE
	$mysqli->close();
?>