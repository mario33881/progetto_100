<?php
	/**
	* Questo file utilizza tre funzioni: dbconn($dbname), getOptions($t_dbname, $t_dbtable) e getData($min_timestamp, $max_timestamp)
	* per recuperare le impostazioni utente e usarle per estrarre dal DB i dati necessari
	*
	* La prima funzione viene usata dalla terza funzione per accedere al database
	*
	* La seconda funzione restituisce un array contentente le impostazioni dell'utente,
	* le quali verranno usate dalla terza funzione per accedere al database e recuperare i dati:
	*
	* - se $min_timestamp == 0 e $max_timestamp == 0: prendi tutti i dati
	* - altrimenti visualizza dati che hanno timestamp compreso fra i due parametri
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
	$db_opttable = "t_options";  // nome tabella dati / opzioni


	function getOptions($t_mysqli, $t_dbtable){
		/**
		 * Questa funzione si occupa di OTTENERE le OPZIONI dell'utente da "getoptions.php".
		 *
		 * Esegue una GET request dal file php "getoptions.php" per ottenere il json
		 * delle impostazioni scelte dall'utente:
		 * - color_scheme: dato non ancora utilizzato,
		 *                 permettera' di far scegliere all'utente lo stile delle pagine
		 *
		 * - min_timestamp: timestamp impostato come data di partenza per la visualizzazione dati
		 *
		 * - max_timestamp: timestamp impostato come data massima per la visualizzazione dati
		 *
		 * Queste opzioni verranno restituite sotto forma di array.
		 *
		 * @since 1.0.0
		 *
		 * @return array Opzioni utente da DB
		*/

		// QUERY PER OTTENERE I DATI DALLA TABELLA
		$query = sprintf("SELECT color_scheme, min_timestamp, max_timestamp FROM `$t_dbtable`");

		// ESEGUI QUERY, OTTIENI DATI IN JSON
		$json = queryToJson($t_mysqli, $query);
		
		// RESTITUISCI I DATI JSON
		return $json;
	};


	function getData($t_mysqli, $t_dbtable, $min_timestamp, $max_timestamp){
		/**
		 * Ottiene tutti o parte dei dati dal DB
		 *
		 * Controlla i parametri per eseguire la query attraverso l'oggetto connessione $t_mysqli:
		 * - se $min_timestamp == 0 e $max_timestamp == 0: prende tutti i dati
	 	 * - altrimenti seleziona i dati che hanno timestamp compreso fra i due parametri
		 *
		 * Dopo aver ottenuto un array con i dati utili, li "restituisce" sotto forma di json
		 *
		 * @since 1.0.0
		 *
		 * @see queryToJson($t_mysqli, $query) in 'db_connection.php'
		 *
		 * @param object $t_mysqli oggetto connessione
		 * @param string $t_dbtable nome tabella nel database connesso in $t_mysqli
		 *
		 * @param int $min_timestamp timestamp di partenza per selezione dati
		 * @param int $max_timestamp timestamp massimo per selezione dati
		 */

		// STRINGA SQL
		if ($min_timestamp == 0 && $max_timestamp == 0){
			// se entrambe le opzioni sono 0, prendo tutti i dati
			$query = sprintf("SELECT measure_timestamp, id_node, celsius_temp, humidity
												FROM `$t_dbtable`
												ORDER BY measure_timestamp");
		}

		else{
			// ci sono dei limitatori
			$query = sprintf("SELECT measure_timestamp, id_node, celsius_temp, humidity
												FROM `$t_dbtable`
												WHERE  $min_timestamp <= measure_timestamp AND measure_timestamp <= $max_timestamp
												ORDER BY measure_timestamp");
		}

		// ESEGUI QUERY, OTTIENI DATI IN JSON
		$json = queryToJson($t_mysqli, $query);
		
		// RESTITUISCE DATI JSON
		return $json;
	};

	$mysqli = dbconn($dbname); // esegue la connessione al DB

	$json_opts = getOptions($mysqli, $db_opttable);      // ottengo opzioni dell'utente in json
	$array_opts = json_decode($json_opts, true); // decodifica json in un tipo php (array) ?$array_opts = $json = json_decode($json_opts, true);?

	$min_timestamp = $array_opts[0]['min_timestamp']; // estraggo il timestamp minimo
	$max_timestamp = $array_opts[0]['max_timestamp']; // estraggo il timestamp massimo

	//echo $min_timestamp; // visualizzo i dati ( ?? ATTENZIONE: POTREBBE SPORCARE IL RISULTATO JSON ?? )
	//echo $max_timestamp; // visualizzo i dati ( ?? ATTENZIONE: POTREBBE SPORCARE IL RISULTATO JSON ?? )

	$selected_json = getData($mysqli, $db_senstable, $min_timestamp, $max_timestamp); // ottiene i dati in json
	
	// CHIUDI CONNESSIONE
	$mysqli->close();

	print $selected_json; // visualizza i dati ottenuti
?>
