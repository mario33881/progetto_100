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
    

    $map_array = get_map($mysqli, $db_table);

    $map = $map_array[0]["map"]; // mappa selezionata dall'utente
    
    if ($map == "colorful"){
        // l'utente ha selezionato mappa "colorful"
        echo readfile("colorful.svg");
    }
    elseif($map == "realistic"){
        // l'utente ha selezionato mappa "realistic"
        echo readfile("realistic.svg");
    }
    else{
        // qualcosa e' andato storto (DB manomesso/incompleto)
        echo "mappa non trovata";
    }
    
    // CHIUDI CONNESSIONE
	$mysqli->close();
?>