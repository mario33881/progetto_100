# AUTOAPACHEPHP

## Introduzione

Questo script bash permette di installare e configurare:
* apache
* php 
* libapache2-mod-php

> E' possibile installare i 3 software contemporaneamente
o singolarmente in base al parametro passato al programma

## Guida all'uso

Il programma richiede un parametro per funzionare:
* "-apachephp" o "-phpapache" : installa apache, abilita mod_rewrite (apache), abilita htaccess (apache), 
installa php, installa libapache2-mod-php
* "-apache" : installa apache, abilita mod_rewrite (apache), abilita htaccess (apache)
* "-php" : installa php
* "-phpforapache" : installa libapache2-mod-php

## Descrizione ![](https://i.imgur.com/wMdaLI0.png)

Lo script:
1. Gestisce il parametro in ingresso (vedi ["Guida all'uso"](#guida-all'uso) per vedere i parametri accettati)

### Installa apache
2. se il parametro e' ```-apache``` viene richiamata la funzione ```apacheinstall()```

        apacheinstall()
    Esegue ```sudo apt-get install apache2 -y``` e richiama la funzione ```apacherewrite()```

3. La funzione richiamata da ```apacheinstall()```...

        apacherewrite()
    Esegue il comando ```sudo a2enmod rewrite``` per abilitare il modulo rewrite di apache,
    richiama la funzione ```apacherestart()```... 
    
        apacherestart()
    ... che esegue il comando ```sudo service apache2 restart``` per riavviare il servizio apache
    
    poi ```apacherewrite()``` richiama la funzione ```apacheallowhtaccess()```

4. La funzione ```apacheallowhtaccess()```...

        apacheallowhtaccess()
    ... usa l'utility "sed" per modificare il file di configurazione di apache,
    comando completo: ```sudo sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf```

    Dove:
    * "-i" indica la modifica diretta al file
    * "```/<Directory \/var\/www\/>/,/<\/Directory>/```" indica che dove c'e' "/,/" bisogna eseguire una operazione
    * "```s/AllowOverride None/AllowOverride All/```" la "s" indica la sostituzione di "AllowOverride None" con "AllowOverride All"
    * "```/etc/apache2/apache2.conf```" e' il percorso del file di configurazione di apache da modificare

    Poi la funzione richiama la funzione ```apacherestart()``` per riavviare apache

### Installa PHP
2. se il parametro e' ```-php``` viene richiamata la funzione ```phpinstall()```...

        phpinstall()
    ...che esegue il comando ```sudo apt-get install php  -y```
    per installare php

### Installa libapache2-mod-php
2. se il parametro e' ```-phpforapache``` viene richiamata la funzione ```phpforapacheinstall()```...

        phpforapacheinstall()
    ... che esegue il comando ```sudo apt-get install libapache2-mod-php  -y``` 
    per installare libapache2-mod-php

### Installa apache + PHP
2. Prima viene installato e configurato apache chiamando la funzione apacheinstall()
    > Per ulteriori informazioni leggere la sezione "[Installa apache](#installa-apache)"
3. Viene installato PHP chiamando la funzione phpinstall()
    > Per ulteriori informazioni leggere la sezione "[Installa PHP](#installa-php)"
4. Viene installato libapache2-mod-php chiamando la funzione phpforapacheinstall()
    > Per ulteriori informazioni leggere la sezione "[Installa libapache2-mod-php](#installa-libapache2-mod-php)"

## Requisiti ![](https://i.imgur.com/H3oBumq.png)
* Sistema operativo Unix like con interprete bash