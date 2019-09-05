<?php
    /**
    * Questo script definisce la funzione per connettersi al DB e la 
    * funzione per eseguire una query e restituire il risultato in JSON
    *
    * Funzioni utilizzate in tutti i file php che fanno operazioni sul DB
    * 
    * @since 01_01
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @todo Si potrebbe rinominare la funzione queryToJson() in queryToArray()
    *       e fargli restituire il risultato della query in array 
    *       (rimuovendo l'istruzione ```json_encode($data)```),
    *       poiche' alcuni script fanno uso del risultato in array 
    *       e per fare questo ri convertono json in array,
    *       > In pratica veniva eseguito: Array + json_encode() -> JSON + json_decode() -> Array
    *       e poi creare una funzione queryToJson() che richiama la funzione queryToArray()
    *       che si occupa solamente di eseguire il ```json_encode($data)``` del suo return.
    */
    
    // nascondi warning dell'errore (non viene visualizzato in modo gradevole nella frontend), 
    // non necessario perche' verra' visualizzato nella frontend al posto della planimetria 
    // e poi usato per terminare ugualmente il corso del programma
    error_reporting(E_ALL ^ E_WARNING); 
    

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
         * @since 01_01
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
            // se c'e' un errore di connessione viene restituito alla frontend un SVG con il messaggio di errore
            echo '<svg height="100%" width="100%"><text x="0" y="50%" fill="red"> Connection failed: ' . $conn->connect_error . '</text></svg>';
            
            // e poi lo script termina avendo come causa l'errore di connessione
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
         * @since 01_01
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