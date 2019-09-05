<?php 
    /**
    * Questo script restituisce/visualizza la planimetria selezionata dall'utente (tabella opzioni) 
    *
    * Script usato dal JS "/static/js/main/home.js":
    * javascript esegue una GET request a questa pagina per ottenere l'SVG
    * con la planimetria e la inserisce nel DOM
    * 
    * > Dalla versione 01_04 lo script puo' restituire una qualsiasi planimetria (SVG) presente in /static/img/maps,
    * > prima restituiva o la planimetria "colorful.svg" o la planimetria "realistic.svg"
    *
    * @since 01_01
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @see "/static/js/main/home.js", JS contenente componente Vue con pagina principale frontend
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
         * @since 01_01
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
         * infine verranno rimossi tutti i separatori di sistema extra
         *
         * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
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

    $map = $map_array[0]["map"]; // nome mappa/file selezionata dall'utente
    
    $mappath = join_paths(__DIR__, "maps", $map . ".svg"); // percorso "teorico" mappa

    if(file_exists($mappath)){
        // se la mappa si trova nella cartella maps, controlla se il mime type e' SVG

        if (mime_content_type($mappath) === "image/svg+xml"){
            // visualizza/restituisci al client il contenuto del documento
            echo readfile($mappath);
        }
        else{
            // restituisci un tag SVG con il testo che indica all'utente che ha selezionato un documento non SVG
            // > Nota: non dovrebbe succedere, l'utente NON PUO' selezionare dalla frontend una planimetria con mimetype diverso da SVG
            // > (nella frontend le planimetrie non SVG non vengono neppure visualizzate)
            echo '<svg height="100%" width="100%"><text x="0" y="50%" fill="red"> Il file della planimetria "' . htmlspecialchars($map) . '" non ha mime type = SVG</text></svg>';
            echo "Il file non ha mime type = SVG";
        }
        
    }
    else{
        // la mappa selezionata dall'utente non e' stata trovata (DB manomesso/incompleto: l'utente NON PUO' impostare dalla frontend una mappa non esistente)
        echo '<svg height="100%" width="100%"><text x="0" y="50%" fill="red"> planimetria "' . htmlspecialchars($map) . '" non trovata</text></svg>';
        echo "planimetria '" . htmlspecialchars($map) . "' non trovata";
    }
    
    // CHIUDI CONNESSIONE
    $mysqli->close();
?>