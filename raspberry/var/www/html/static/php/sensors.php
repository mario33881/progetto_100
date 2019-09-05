<?php
    /**
    * Questo file recupera dall' URL i parametri GET, e li usa per creare il record dei dati raccolti dai sensori
    *
    * Il programma accede al DB, controlla che i quattro parametri siano stati passati:
    *
    * - node: id del node, corrispondente alla stanza dove si trova
    *
    * - humidity: umidita', precisione al centesimo, in percentuale
    *
    * - celsiusTemp: temperatura in celsius, precisione al centesimo
    *
    * - heatIndexCelsius: indice di calore (tiene conto di umidita' e temperatura), precisione al centesimo
    *
    * - rssi: RSSI, potenza del segnale
    *
    * Poi viene fatta una prima misura di prevenzione da dati indesiderati con il typecast:
    * il parametro "node" deve essere stringa, gli altri "float"
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
    * I node MCU eseguono le GET request per mandare i dati a questa pagina
    *
    * @since 01_01
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @see /static/php/db_connection.php definisce le funzioni che permettono la connessione e l'esecuzione di istruzioni SQL sul db
    * @todo Cambiare $_GET in $_POST in questo script e usare metodo POST anche nello sketch del node MCU
    * @todo "Standardizzare" il nome dello script al resto del progetto chiamandolo postxxxx.php, post_xxxx.php, sendxxxx.php o send_xxxx.php
    */
    
    include ('db_connection.php'); // importa funzione dbconn($dbname) e queryToJson($mysqli, $query)
    
    // COSTANTI DATABASE
    $dbname = "db100_100";   // nome database
    $dbtable = "t_sensors";  // nome tabella nel database

    // TIMESTAMP
    date_default_timezone_set('Europe/Rome');
    $timestamp = date_create();
    $timestamp = date_timestamp_get($timestamp);

    // CONTROLLO PARAMETRI
    if (isset($_GET['node']) and isset($_GET['humidity']) and isset($_GET['celsiusTemp']) and isset($_GET['heatIndexCelsius']) and isset($_GET['rssi'])){

        // PARAMETRI DA URL (CON TYPECAST)
        $node = (string) $_GET['node'];
        $humidity = (float) $_GET['humidity'];
        $celsiusTemp = (float) $_GET['celsiusTemp'];
        $heatIndexCelsius = (float) $_GET['heatIndexCelsius'];
        $rssi = (int) $_GET['rssi'];

        // EVITO XSS (caratteri pericolosi diventano inoffensivi)
        $node = htmlspecialchars($node);
        $humidity = htmlspecialchars($humidity);
        $celsiusTemp = htmlspecialchars($celsiusTemp);
        $heatIndexCelsius = htmlspecialchars($heatIndexCelsius);
        $rssi = htmlspecialchars($rssi);

        // _DEBUG
        echo "node = $node <br>";
        echo "humidity = $humidity <br>";
        echo "celsiusTemp = $celsiusTemp<br>";
        echo "heatIndexCelsius = $heatIndexCelsius<br>";
        echo "rssi = $rssi <br>";
        echo "timestamp = $timestamp <br>";

        // CREA CONNESSIONE E CONTROLLO SUCCESSO CONNESSIONE
        $conn = dbconn($dbname);

        // ESCAPE DEI DATI
        $node = mysqli_real_escape_string($conn, $node);
        $humidity = mysqli_real_escape_string($conn, $humidity);
        $celsiusTemp = mysqli_real_escape_string($conn, $celsiusTemp);
        $heatIndexCelsius = mysqli_real_escape_string($conn, $heatIndexCelsius);
        $rssi = mysqli_real_escape_string($conn, $rssi);

        // PREPARA STRINGA SQL ( con Prepared Statements)
        $stmt = $conn->prepare("INSERT INTO `$dbtable` (measure_timestamp, id_node, humidity, celsius_temp, heatindex_celsius, rssi) VALUES($timestamp, ?, ?, ?, ?, ?)");
        // BIND ? con variabili di tipo "s" -> string, "d" -> double e "i" -> integer
        $stmt->bind_param('sdddi', $node, $humidity, $celsiusTemp, $heatIndexCelsius, $rssi);

        // ESECUZIONE E CONTROLLO STRINGA SQL
        if ($stmt->execute()) {
            // ha funzionato
            echo "E' stato creato un nuovo record!";
        }
        else {
            // qualcosa e' andato storto
            echo "Errore: " . $stmt . "<br>" . $stmt->error;
        }

        // TERMINA CONNESSIONE
        $stmt->close();
        $conn->close();
    }
    else{
        echo "Non sono stati passati tutti i parametri per poter mettere i dati nel database";
    }
?>
