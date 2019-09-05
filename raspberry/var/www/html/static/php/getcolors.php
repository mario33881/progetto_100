<?php
    /**
    * Questo file ottiene e visualizza/restituisce al client la lista dei colori per la frontend, pagina impostazioni 
    *
    * Javascript della frontend richiede tramite GET request il JSON con tutti i colori
    * e li rende selezionabili dall'utente
    *
    * @since 01_01
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @see /static/js/main/options.js JS con componente Vue della pagina delle impostazioni
    */

    include ('db_connection.php'); // importa funzione dbconn($dbname) e queryToJson($mysqli, $query)

    // imposta header come json
    header('Content-Type: application/json');

    // COSTANTI DATABASE
    $dbname = "db100_100";       // nome database
    $db_senstable = "t_colors";  // nome tabella dati sensori nel database


    function getColors($t_mysqli, $t_dbtable){
        /**
         * Questa funzione esegue la query per selezionare i colori da visualizzare nella pagina impostazioni.
         *
         * @since 01_01
         * 
         * @param object $t_mysqli oggetto connessione gia' connesso al DB
         * @param string $t_dbtable tabella da dove prendere colori
         * 
         * @return string $json colori
        */
    
        // controllo se parametro n e' stato passato e se e' un numero
        if(isset($_GET["n"]) and is_numeric($_GET["n"])){
            // e' un numero
            $num = (int) $_GET["n"]; // typecast di sicurezza

            // ottieni i primi $num colori da visualizzare
            $query = sprintf("SELECT id, color_name, color_hex
                            FROM `$t_dbtable`
                            ORDER BY id
                            LIMIT $num");
        }
        else{
            // parametro non passato (o non e' numero, "caso ignorabile")
            // seleziono tutti i colori
            $query = sprintf("SELECT id, color_name, color_hex
                            FROM `$t_dbtable`
                            ORDER BY id");
        }
        
        // ESEGUI QUERY, OTTIENI DATI IN JSON
        $json = queryToJson($t_mysqli, $query);
            
        // RESTITUISCE DATI JSON
        return $json;
    }


    $mysqli = dbconn($dbname); // esegue la connessione al DB
    $json = getColors($mysqli, $db_senstable); // ottengo i colori in Json

    // CHIUDI CONNESSIONE
    $mysqli->close();
    print $json; // visualizza i dati ottenuti

?>