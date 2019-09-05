<?php
    /**
    * Questo file recupera dall' URL i parametri GET, e li usa per modificare il record delle impostazioni
    *
    * Il programma accede al DB, controlla che il parametro sia stato passato:
    *
    * - map: mappa da visualizzare
    *
    * Poi viene fatta una prima misura di prevenzione da dati indesiderati con il typecast:
    * il parametro deve essere una stringa.
    *
    * Se "map" e' la proprieta' "nome" di una mappa presente nell'array $maps (recuperato con la funzione getmaps() dall'omonimo file)  
    * viene effettuata la connessione al DB,
    * 
    * viene controllato il successo di questa operazione
    * e poi viene attuata una seconda misura di sicurezza: l'escape dei dati:
    * quei caratteri che possono essere pericolosi in una query vengono preceduti da '\'.
    *
    * Ultima forma di prevenzione attuata sono le prepared statements:
    * la stringa SQL viene preparata sostituendo il '?' con la variabile "bind-ate",
    * che deve essere stringa.
    *
    * Infine viene eseguita la query per impostare la mappa nelle impostazioni e viene chiusa la connessione.
    * > Le prevenzioni sono state svolte per evitare SQL injections
    *
    * Javascript (/static/js/main/options.js) esegue una GET request a questa pagina
    * con il nome della planimetria che e' stata selezionata dall'utente dalla pagina delle impostazioni
    *
    * @since 01_01
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @see /static/php/db_connection.php definisce le funzioni che permettono la connessione e l'esecuzione di istruzioni SQL sul db
    * @see /static/php/getmaps.php contiene funzione che restituisce le planimetrie presenti nella cartella /static/img/maps
    * @see /static/js/main/options.js script javascript con componente vue della pagina delle impostazioni
    * @todo Modificare metodo request da GET a POST sia in questo script sia in options.js
    */
    
    include ('db_connection.php'); // importa funzione dbconn($dbname) e queryToJson($mysqli, $query)
    include ('getmaps.php');       // contiene funzione getmaps() che restituisce array di mappe
    
    $maps = getmaps($mapspath); // array di mappe
    
    // imposta header a "json"
    header('Content-Type: application/json');

    // COSTANTI DATABASE
    $dbname = "db100_100";  // nome database
    $dbtable = "t_options"; // nome tabella nel database

    // CONTROLLO SE E' STATO PASSATO IL PARAMETRO
    if (isset($_GET['map'])){

        // PARAMETRI DA URL (CON TYPECAST)
        $map = (string) $_GET['map'];
        
        $mapexists = false;

        foreach ($maps as $checkmap){
            if($checkmap["name"] === $map){
                $mapexists = true;
            }
        }

        if($mapexists){
            // CONNESSIONE E CONTROLLO SUCCESSO CONNESSIONE
            $conn = dbconn($dbname);

            // ESCAPE DEI DATI
            $map = mysqli_real_escape_string($conn, $map);


            // PREPARA STRINGA SQL ( con Prepared Statements)
            $stmt = $conn->prepare("UPDATE `$dbtable`
                                    SET `map` = ?
                                    WHERE `$dbtable`.`id` = 1");

            // BIND ? con variabili di tipo "s" -> string
            $stmt->bind_param('s', $map);

            // ESECUZIONE E CONTROLLO STRINGA SQL
            if ($stmt->execute()) {
                // ha funzionato
                echo "Modifica eseguita";
            }
            else {
                // e' successo qualcosa di storto
                echo "Errore: " . $stmt . "<br>" . $stmt->error;
            }

            // TERMINA CONNESSIONE
            $stmt->close();
            $conn->close();
        }
        else{
            echo "{success: 'false', message: 'Mappa non riconosciuta!'}";
        }
    }
    else{
        echo "Non sono stati passati tutti i parametri per poter modificare i dati nel database";
    }
?>
