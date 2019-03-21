<?php
  /**
	* Questo file ottiene lo spazio libero e occupato sul disco di sistema
	*
	* Compatibile con la maggior parte dei sistemi operativi
	* 
	* @since 1.0.0
  */


  function HumanSize($Bytes){
    /**
		 * Questa funzione si occupa di cambiare unita' di misura ai byte passati come parametro.
		 *
		 * @since 1.0.0
     * 
		 * @param int $Bytes numero di byte da convertire in forma "umana"/leggibile
		 * 
		 * @return string $humanbytes stringa byte convertiti in unita' di misura diverse
    */
    
    $Type = array("", "K", "M", "G", "T", "P", "E", "Z", "Y"); // unita' di misura byte
    $Index = 0; // indice che "scorre" array $Type
    
    while($Bytes >= 1024){
      // finche' il numero di byte e' maggiore o uguale a 1024
      // posso cambiare scala di misura

      $Bytes /= 1024; // divido byte per 1024
      $Index++;       // incremento indice, cambia unita' di misura
    }

    $Bytes = round($Bytes, 2); // arrotonda dopo 2 cifre decimali
    $humanbytes = "".$Bytes." ".$Type[$Index]."B"; // numero "byte" nell'unita' piu' leggibile 
    
    return($humanbytes);
  }

  $os = php_uname('s'); // ottiene nome del sistema operativo

  $diskInfos = new \stdClass(); // crea oggetto che conterra' spazio libero, occupato e totale

  $maindisk = "/"; // "parto" dando per scontato macchina linux/mac

  if (strpos($os, "Windows") !== false){
      // era macchina windows
      $maindisk = "C:";
  }

  // OTTENGO SPAZIO LIBERO E TOTALE, CALCOLO SPAZIO OCCUPATO
  $diskInfos->freespace = disk_free_space($maindisk);                         // proprieta' spazio libero 
  $diskInfos->totalspace = disk_total_space($maindisk);                       // proprieta' spazio totale
  $diskInfos->occupiedspace = $diskInfos->totalspace - $diskInfos->freespace; // proprieta' spazio occupato

  // CAMBIO TUTTI I BYTE IN UNA NUOVA UNITA' DI MISURA
  $diskInfos->freespace = HumanSize($diskInfos->freespace);         // cambio misura spazio libero
  $diskInfos->totalspace = HumanSize($diskInfos->totalspace);       // cambio misura spazio totale
  $diskInfos->occupiedspace = HumanSize($diskInfos->occupiedspace); // cambio misura spazio occupato

  $json = json_encode($diskInfos); // converto l'oggetto in JSON
  print $json;                     // e lo visualizzo (verra' preso dalla Frontend)

?>