<?php
    /**
	* Questo file recupera le ultime letture dei singoli nodi da visualizzare sulla mappa nella pagina principale
	*
	* @since 1.0.0
	* @see dbconn($dbname) in 'db_connection.php'
    */
    
    include ('db_connection.php'); // importa funzione dbconn($dbname) e queryToJson($mysqli, $query)

    // imposta header come json
    header('Content-Type: application/json');

    // COSTANTI DATABASE
    $dbname = "db100_100";       // nome database
    $db_senstable = "t_sensors"; // nome tabella dati sensori nel database


    function getLatestData($t_mysqli, $t_dbtable){
         /**
		 * Questa funzione esegue la query per selezionare le ultime rilevazioni dei singoli nodi.
		 *
		 * La funzione esegue con la funzione queryToJson() la query 
         * per selezionare le ultime rilevazioni dei singoli nodi (JSON),
         *
		 * @since 1.0.0
         * 
		 * @param object $t_mysqli oggetto connessione gia' connesso al DB
         * @param string $t_dbtable tabella da dove prendere rilevazioni
		 * 
		 * @return string $json ultime rilevazioni
        */
    
        $query = sprintf("SELECT id, id_node, humidity, celsius_temp -- seleziona questi campi 
                            FROM `$t_dbtable`                        -- dalla tabella rilevazioni
                            WHERE id IN (                            -- dove l'id e' nel record set
                                SELECT MAX(id)                       -- degli id massimi
                                FROM `$t_dbtable`                    -- dalla tabella rilevazioni
                                GROUP BY id_node                     -- per ogni nodo/stanza
                            )
                            ORDER BY id_node
                            "
        );
        // ESEGUI QUERY, OTTIENI DATI IN JSON
        $json = queryToJson($t_mysqli, $query);
            
        // RESTITUISCE DATI JSON
        return $json;
    }


    $mysqli = dbconn($dbname); // esegue la connessione al DB
    $json = getLatestData($mysqli, $db_senstable);


    // CHIUDI CONNESSIONE
    $mysqli->close();

    print $json; // visualizza i dati ottenuti
?>