<?php
    /**
    * Questo file recupera dall' URL i parametri GET, e li usa per modificare il record delle impostazioni
    *
    * Il programma accede al DB, controlla se il parametro:
    *
    * - color ($name_scheme): nome dell'insieme dei colori selezionati dagli utenti
    *
    * e' stato passato e se e' presente nella tabella dei colori selezionabili,
    * poi viene fatta una prima misura di prevenzione da dati indesiderati con il typecast:
    * il parametro deve essere una stringa.
    *
    * Viene effettuata la connessione al DB, viene controllato il successo di questa operazione
    * e poi viene attuata una seconda misura di sicurezza: l'escape dei dati:
    * quei caratteri che possono essere pericolosi in una query vengono preceduti da '\'.
    *
    * Ultima forma di prevenzione attuata sono le prepared statements:
    * la stringa SQL viene preparata sostituendo il '?' con la variabile "bind-ate",
    * deve essere una stringa.
    *
    * Infine viene eseguita la query e viene chiusa la connessione.
    * > Le prevenzioni sono state svolte per evitare SQL injections
    *
    * Javascript (/static/js/main/options.js) esegue una GET request a questa pagina
    * con il nome del colore che e' stato selezionato dall'utente dalla pagina delle impostazioni
    *
    * @since 01_01
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @see /static/php/get_colorslist.php definisce array dei colori selezionabili (presenti nel db)
    * @see /static/js/main/options.js script javascript con componente vue della pagina delle impostazioni
    * @todo Modificare metodo request da GET a POST sia in questo script sia in options.js
    */
    
    // include $colors_array, array con i colori selezionabili e
    // include da 'db_connection.php' le funzioni dbconn($dbname) e queryToJson($t_mysqli, $t_query)
    include ('get_colorslist.php');

    // COSTANTI DATABASE
    $dbname = "db100_100";  // nome database
    $dbtable = "t_options"; // nome tabella nel database

    // CONTROLLO SE E' STATO PASSATO IL PARAMETRO
    if (isset($_GET['color'])){

        // PARAMETRO DA URL (CON TYPECAST)
        $name_scheme = (string) $_GET['color'];

        if(in_array(array('color_name' => $name_scheme), $colors_array)){
            // il color scheme esiste sul database

            // CONNESSIONE E CONTROLLO SUCCESSO CONNESSIONE
            $conn = dbconn($dbname);

            // ESCAPE DEI DATI
            $name_scheme = mysqli_real_escape_string($conn, $name_scheme);

            // PREPARA STRINGA SQL ( con Prepared Statements)
            $query = "UPDATE `$dbtable` 
                      SET `color_scheme` = ? 
                      WHERE `id` = 1";

            // CONTROLLO QUERY
            if($stmt = $conn->prepare($query)){
                // query ok
                // BIND ? con variabili di tipo "s" -> string
                $stmt->bind_param('s', $name_scheme);

                // ESECUZIONE E CONTROLLO STRINGA SQL
                if ($stmt->execute()) {
                    // ha funzionato
                    echo "Modifica eseguita";
                    $stmt->close();
                }
                else {
                    // e' successo qualcosa di storto
                    echo "Errore: " . $stmt . "<br>" . $stmt->error;
                }
            }
            else{
                // problemi con la query
                $error = $conn->errno . ' ' . $conn->error;
                echo $error;
            }

            // TERMINA CONNESSIONE
            $conn->close();
        }
        else{
            // il color scheme non c'e' sul database
            echo "Color scheme non esistente sul database";
        }
    }
    else{
        // il parametro non e' stato passato nella richiesta
        echo "Non e' stato passato il parametro per poter modificare il record opzioni nel database";
    }
?>