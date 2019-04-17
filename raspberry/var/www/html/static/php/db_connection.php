<?php
	/**
	* Questo file definisce la funzione per connettersi al DB e la funzione per eseguire una query e restituire il risultato in JSON
	*
	* Funzioni utilizzate in tutti i file php che fanno operazioni sul DB
	* 
	* @since 1.0.0
    */

	
    function dbconn($dbname){
        /**
		 * Questa funzione si occupa di connettersi al DB, e operare sulla tabella passati come parametri.
		 *
		 * La funzione recupera dal file 'credentials.ini' username e password per accedere al DB
         * in locale.
         * 
         * il parametro verra' usato per accedere al DB.
         * 
         * La funzione restituira' l'oggetto connessione con la connessione avvenuta correttamente
		 *
		 * @since 1.0.0
         * 
		 * @param string $dbname  nome del database
		 * 
		 * @return object $conn oggetto connessione (connessione avvenuta con successo)
		 */

        // file ini con credenziali
        $ini_array = parse_ini_file(__dir__ . "/../../../credentials/credentials.ini");

        // COSTANTI DATABASE
        $servername = "localhost";            // indirizzo macchina con database
        $username = $ini_array['DB_USER100']; // recupera user da file ini
        $password = $ini_array['DB_PASS100']; // recupera pass da file ini

        // CREA CONNESSIONE
		$conn = new mysqli($servername, $username, $password, $dbname);

		// CONTROLLA SUCCESSO CONNESSIONE
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
        }
        
        return $conn;
    }

    
    function queryToJson($t_mysqli, $t_query){
		/**
		 * Questa funzione si occupa di eseguire la query e di resituire i dati in formato json.
		 *
		 * Esegue la query, ottiene i dati e li inserisce in un array,
		 * svuota la memoria occupata dal risultato della query e restituisce l'array in formato json
		 *
		 * @since 1.0.0
		 * 
		 * @param object $t_mysqli oggetto connessione
		 * @param string $t_query query da eseguire nel database connesso in $t_mysqli
		 * 
		 * @return string json_encode($data) json del risultato della query
		*/

		// ESEGUI LA QUERY
		$result = $t_mysqli->query($t_query);

		// LOOP PER OTTENERE ARRAY DEI DATI RACCOLTI
		$data = array();
		foreach ($result as $row) {
			$data[] = $row;
		}

		// LIBERA MEMORIA OCCUPATA DA "result"
		$result->close();

		// RESTITUISCI I DATI SOTTO FORMA DI JSON
		return json_encode($data);
    }

?>