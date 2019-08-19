# AUTOINSTALL

## Introduzione

Questo script richiama tutti gli altri script che automatizzano il processo 
di installazione del sistema di monitoraggio di temperatura e umidita'

## Guida all'uso

Modificare il valore di queste variabili a proprio piacimento:

* mysqlpass : password di mysql (username e' root)
* touchdevice : dispositivo con input touch
* hostapd_ip : ip statico del raspberry pi 
* hostapd_ssid : ssid dell'Access Point
* hostapd_password : password per connettersi all'AP

Eseguire lo script da terminale:

    ./autoinstall.sh

> Se il file non e' considerato eseguibile eseguire questo comando ```find . -type f -iname "*.sh" -exec chmod +x {} \;``` che
> si occupera' di rendere eseguibili tutti gli script nelle sotto cartelle

> Se eseguendo lo script appare l'errore "/bin/bash^m bad interpreter no such file or directory" occorre modificare gli EOL (end of line),
> per fare questo installare dos2unix con il comando ```sudo apt-get install dos2unix``` e eseguire il comando ```find . -type f -iname "*.sh" -exec dos2unix {} \;```

## Descrizione

Lo script, dopo aver definito le variabili, richiama i seguenti script:

    ./autoapachephp/install.sh -apachephp
Installa e configura Apache, PHP e libapache2-mod-php

    ./automysql/install.sh -mysql -mysqlforphp
Installa MySQL e php-mysql

    ./internalfunctions/install.sh -unclutter -wallpaper -database -monsys -credentials ${mysqlpass} -chromium ${touchdevice}
Installa unclutter, imposta il wallpaper, importa il file SQL in MySQL, copia i file del sistema di monitoraggio in /var/www, 
imposta nel file delle credenziali (/var/www/credentials/credentials.ini) la password 
e configura l'avvio automatico di chromium utilizzando come dispositivo con touch input "${touchdevice}"

    ./automysql/install.sh -mysqlpass ${mysqlpass}
Modifica la password dell'utente root di MySQL
> Questa operazione viene eseguita dopo aver chiamato  "./internalfunctions/install.sh",
in questo modo non e' stata richiesta la password per importare il file SQL 

Poi lo script prepara il file di configurazione per lo script autohostapd con il comando
    
    echo -e "[HOSTAPD SETTINGS]\nip = ${hostapd_ip}\nssid = ${hostapd_ssid}\npassword = ${hostapd_password}" > autohostapd/settings.ini

Infine viene richiamato lo script autohostapd

    ./autohostapd/install.sh
Installa e configura hostapd
> Il computer si riavviera' due volte

## Requisiti
* Sistema operativo Unix like con interprete bash