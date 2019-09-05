<?php
    /**
    * Questo file recupera dall' URL i parametri GET, e li usa per modificare il record delle impostazioni
    *
    * Il programma accede al DB, controlla che i due parametri siano stati passati:
    *
    * - min_time: timestamp impostato come data di partenza per la visualizzazione dati
    *
    * - max_time: timestamp impostato come data massima per la visualizzazione dati
    *
    * Poi viene fatta una prima misura di prevenzione da dati indesiderati con il typecast:
    * i parametri devono essere numeri interi.
    *
    * Viene effettuata la connessione al DB, viene controllato il successo di questa operazione
    * e poi viene attuata una seconda misura di sicurezza: l'escape dei dati:
    * quei caratteri che possono essere pericolosi in una query vengono preceduti da '\'.
    *
    * Ultima forma di prevenzione attuata sono le prepared statements:
    * la stringa SQL viene preparata sostituendo i '?' con le variabili "bind-ate",
    * le quali devono essere numeri interi.
    *
    * Infine viene eseguita la query e viene chiusa la connessione.
    * > Le prevenzioni sono state svolte per evitare SQL injections
    *
    * Javascript (/static/js/main/options.js) esegue una GET request a questa pagina
    * con il timestamp iniziale e finale selezionati dall'utente dalla pagina delle impostazioni
    * con i timepicker e i datepicker. 
    * Questi valori indicano il range dei timestamp delle rilevazioni da visualizzare 
    * da visualizzare nella pagina dei grafici
    *
    * @since 01_01
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @see /static/php/db_connection.php definisce le funzioni che permettono la connessione e l'esecuzione di istruzioni SQL sul db
    * @see /static/js/main/options.js script javascript con componente vue della pagina delle impostazioni
    * @todo Modificare metodo request da GET a POST sia in questo script sia in options.js
    */
    
    include ('db_connection.php'); // importa funzione dbconn($dbname) e queryToJson($mysqli, $query)

    // imposta header a "json"
    header('Content-Type: application/json');

    // COSTANTI DATABASE
    $dbname = "db100_100";  // nome database
    $dbtable = "t_options"; // nome tabella nel database

    // CONTROLLO SE SONO STATI PASSATI I DUE PARAMETRI
    if (isset($_GET['mintime']) and isset($_GET['maxtime'])){

        // PARAMETRI DA URL (CON TYPECAST)
        $mintime = (int) $_GET['mintime'];
        $max_time = (int) $_GET['maxtime'];

        // CONNESSIONE E CONTROLLO SUCCESSO CONNESSIONE
        $conn = dbconn($dbname);

        // ESCAPE DEI DATI
        $mintime = mysqli_real_escape_string($conn, $mintime);
        $max_time = mysqli_real_escape_string($conn, $max_time);

        // PREPARA STRINGA SQL ( con Prepared Statements)
        $stmt = $conn->prepare("UPDATE `$dbtable`
                                SET `min_timestamp` = ?,
                                    `max_timestamp` = ?
                                WHERE `$dbtable`.`id` = 1");

        // BIND ? con variabili di tipo "i" -> integer
        $stmt->bind_param('ii', $mintime, $max_time);

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
        echo "Non sono stati passati tutti i parametri per poter modificare i dati nel database";
    }
?>
