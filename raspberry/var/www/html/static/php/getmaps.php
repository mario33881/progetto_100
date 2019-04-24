<?php
    /**
	* Questo file restituisce in array il nome e il percorso delle mappe nel percorso /static/img/maps 
    *
    * File usato dai file PHP "sendmap.php" e "showmaps.php"
	* 
	* @since 1.1.0
    */

    // percorso cartella delle mappe
    $mapspath = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . "static" . DIRECTORY_SEPARATOR . "img" . DIRECTORY_SEPARATOR . "maps";
   

    function getmaps($path){
        /**
		 * Questa funzione concatena i parametri in un percorso.
		 *
		 * La funzione scorre i parametri passati alla funzione, 
         * se non sono stringhe nulle le aggiunge in un array, 
         * gli elementi dell'array verranno uniti con il separatore di sistema,
         * infine verranno rimossi tutti i separatori di sistema doppi
         *
		 * @since 1.1.0
         * 
		 * @param string percorso delle mappe
		 * 
		 * @return array mappe (nome e percorso per ogni mappa)
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