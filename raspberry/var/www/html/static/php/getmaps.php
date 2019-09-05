<?php
    /**
    * Questo file definisce la funzione getmaps() che restituisce in array altri array 
    * con il nome e il percorso delle mappe nel percorso /static/img/maps 
    *
    * File usato dai file PHP "sendmap.php" e "showmaps.php"
    * 
    * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
    * @author Stefano Zenaro (https://github.com/mario33881)
    * @license MIT
    * @see /static/php/sendmap.php script PHP che riceve dalla frontend la planimetria selezionata dall'utente
    * @see /static/php/showmaps.php script PHP che restituisce il json delle planimetrie selezionabili dall'utente
    * @todo Rinominare questo script: inizia con "get" che in base allo "standard" del progetto indicherebbe
    *       che lo script restituisce al client informazioni, invece viene usato da altri script PHP
    */

    // percorso cartella delle mappe
    $mapspath = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . "static" . DIRECTORY_SEPARATOR . "img" . DIRECTORY_SEPARATOR . "maps";
   

    function getmaps($path){
        /**
         * Questa funzione restituisce un array con le planimetrie in "/static/img/maps".
         *
         * La funzione compone il percorso di ogni file presente nella cartella maps 
         * e verifica il mime type:
         *
         * se sono documenti SVG viene aggiunto all'array delle mappe
         * un array associativo (ogni valore contenuto ha un nome)
         * che ha come "name" il valore del nome del file (senza ".svg")
         * e ha come "path" il percorso relativo al webserver ("/static/img/maps/<file.svg>")
         * 
         * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
         * @param string $path percorso di sistema cartella con le planimetrie
         * @return array $maps array di array con nomi e percorsi (rispetto al webserver) delle planimetrie 
        */

        // percorso relativo alla root del webserver, con "/"
        $rootrelpath = str_replace($_SERVER['DOCUMENT_ROOT'], "", str_replace(DIRECTORY_SEPARATOR, "/", $path));

        // tutti i file del percorso $path, rimuove "." e ".."
        $files = array_diff(scandir($path), array('.', '..'));
        
        $maps = array();

        foreach ($files as $file){
            // per ogni file controlla se hanno mime type SVG
            if (mime_content_type($path . DIRECTORY_SEPARATOR . $file) === "image/svg+xml"){

                // percorso relativo del file
                $filerelpath = $rootrelpath . "/" . $file;

                // nome mappa
                $mapname = pathinfo($path . DIRECTORY_SEPARATOR . $file)['filename'];

                // aggiungi dettagli mappa nell'array delle mappe
                $maps[] = array("name" => $mapname, "path" => $filerelpath);
            }
        }

        return $maps;
    }
?>