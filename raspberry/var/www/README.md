# PROGETTO 100+100 WEBSERVER SCRIPTS

## Sezioni documentazione
* [Introduzione](#introduzione)
* [Descrizione breve](#descrizione-breve)
    * [PHP](#php)
        * [Script PHP richiamati da altri script](#script-php-richiamati-da-altri-script)
        * [Script PHP per accedere a dati](#script-php-per-accedere-a-dati)
        * [Script PHP che ricevono dati](#script-php-che-ricevono-dati)
        * [Script PHP per CSS dinamico](#script-php-per-css-dinamico)
        * [Script PHP per planimetria SVG dinamica](#script-php-per-planimetria-svg-dinamica)
    * [Javascript](#javascript)
        * [Vue](#vue)
        * [Utilities](#utilities)
        * [Pagine frontend](#pagine-frontend)    
    * [CSS](#css)
        * [Frameworks](#frameworks)
        * [Specifici per il progetto](#specifici-per-il-progetto)
* [Descrizione](#descrizione)
    * [Descrizione per navigazione](#descrizione-per-navigazione)
        * [CSS specifico](#css-specifico)
        * [CSS dinamico (PHP)](#css-dinamico-(php))
            * [CSS pagina informazioni](#css-pagina-informazioni)
            * [CSS dinamico pagina informazioni](#css-dinamico-pagina-informazioni)
            * [CSS dinamico pagina impostazioni](#css-dinamico-pagina-impostazioni)
        * [HTML](#html)
        * [Javascript](#javascript)
            * [Utility javascript](#utility-javascript)
                * [SVG.JS](#svg.js)
                * [Axios.JS](#axios.js)
                * [Hammer.JS](#hammer.js)
                * [t2ts.JS](#t2ts.js)
            * [Vue e Vue router](#vue-e-vue-router)
            * [Descrizione pagine Frontend](#descrizione-pagine-frontend)
                * [Home](#home)
                    * [planselector.php](#planselector.php)
                    * [getlatestdata.php](#getlatestdata.php)
                * [Graph](#graph)
                    * [getdata.php](#getdata.php)
                * [Options](#options)
                * [Infos](#infos)
            * [Inizializzazione Vue Router e Vue](#inizializzazione-vue-router-e-vue)
    * [Descrizione per componente](#descrizione-per-componente)

## Introduzione
Nella cartella "html" sono contenuti tutti gli script, backend e frontend, del sistema di monitoraggio.

Nelle cartella "credentials" e' presente il file "credentials.ini" letto da ```db_connection.php``` con le credenziali per accedere al database

## Descrizione breve
Questa sezione parlera' brevemente di cosa fanno i file presenti nella cartella "html",
per i dettagli di funzionamento andare nella sezione [Descrizione](#descrizione)

### PHP
![](/images/php-wikipedia.org.png)
> Credits: https://en.wikipedia.org/wiki/File:PHP-logo.svg

Lato backend viene utilizzato il linguaggio PHP:

#### Script PHP richiamati da altri script
Questi script non restituiscono niente di visualizzabile, definiscono variabili/funzioni usati da altri script

* ```db_connection.php``` permette di connettersi al database db100_100 di MySQL (viene usato da tutti gli script che inseriscono/selezionano dati dal database)
* ottenere la lista dei colori selezionabili dall'utente per verificare che il colore spedito dalla frontend sia valido (definisce array con i colori, ```get_colorslist.php```)
* ottenere la lista delle planimetrie in img/maps (definisce la funzione per ottenere l'array, ```getmaps.php```)
* ```rgb_hexconvertion.php``` permette di convertire i valori dei colori esadecimali in rgb e viceversa
  e di ottenere colori piu' chiari o scuri di un colore (valore esadecimali)

> Sono presenti nel percorso ```/static/php/```

[Torna su](#sezioni-documentazione)

#### Script PHP per accedere a dati
Questi sono script che formalmente rispondono a richieste GET

Permettono di:
* ottenere le proprieta' spazio libero, spazio totale e spazio occupato e li restituisce in formato JSON (```diskinfo.php```)
* ottenere il colore selezionato dall'utente (```get_selectedcolor.php```)
* ottenere la lista dei colori selezionabili dall'utente in formato JSON per poterli visualizzare nella pagina impostazioni (```getcolors.php```)
* ottenere la lista delle rilevazioni in formato JSON (```getdata.php```)
    > Ottiene tutte le rilevazioni, sarebbe meglio utilizzare un parametro per ottenere l'id_node
* ottenere la lista delle ultime rilevazioni per nodo (```getlatestdata.php```)
* ottenere gli ultimi valori di RSSI per nodo (```getrssi.php```)
* ottenere la lista delle planimetrie in JSON per visualizzarle nella frontend (```showmaps.php```)

> Sono presenti nel percorso ```/static/php/```

[Torna su](#sezioni-documentazione)

#### Script PHP che ricevono dati
Questi sono script che formalmente dovrebbero rispondere a richieste POST
> Tutti gli script usano richieste GET per semplicita', ma bisognerebbe usare POST

Permettono di:
* ricevere il colore selezionato dalla frontend per inserirlo nella tabella t_options (```sendcolor.php```)
* ricevere la planimetria selezionata dalla frontend, inserisce l'opzione nella tabella t_options (```sendmap.php```)
* ricevere il range dei timestamp (timestamp minimo e timestamp massimo) delle rilevazioni da visualizzare nella frontend, inserisce le opzioni nella tabella t_options (```sendopt.php```)
* ricevere la rilevazione dal node MCU per inserirlo nella tabella t_sensors (```sensors.php```)

> Sono presenti nel percorso ```/static/php/```

[Torna su](#sezioni-documentazione)

#### Script PHP per CSS dinamico
Questi sono script importati da index.html come se fossero file CSS

Permettono di:
* restituire il CSS per la pagina delle informazioni con il colore selezionato dall'utente (```infos/cm_style.php```)
* restituire il CSS per la pagina delle informazioni per l'effetto "typewriter" (```infos/style.php```)
    > Permetterebbe facilmente la possibilita' di modificare la tip da bianco ad un altro colore,
    > ma attualmente e' possibile modificarlo solo modificando il file
* restituire il CSS per modificare il colore (selezionato dall'utente) dei pulsanti nella pagina delle impostazioni (```settings/_cm_button.php```, usato da ```settings/cm_style.php```)
* restituire il CSS per modificare il colore (selezionato dall'utente) del datepicker nella pagina delle impostazioni (```settings/_cm_datepicker.php```, usato da ```settings/cm_style.php```)
* restituire il CSS per modificare il colore (selezionato dall'utente) dello switch nella pagina delle impostazioni (```settings/_cm_switch.php```, usato da ```settings/cm_style.php```)
* restituire il CSS per modificare il colore (selezionato dall'utente) del timepicker nella pagina delle impostazioni (```settings/_cm_timepicker.php```, usato da ```settings/cm_style.php```)
* restituire il CSS per modificare il colore (selezionato dall'utente) di tutti gli elementi nella pagina delle impostazioni (```settings/cm_style.php```)
    > Il css modificato e' materialize

> Sono presenti nel percorso ```/static/css/```

[Torna su](#sezioni-documentazione)

#### Script PHP per planimetria SVG dinamica

```planselector.php``` restituisce l'elemento SVG con la planimetria selezionata dall'utente,
dopo aver verificato il suo mime type e la sua reale esistenza

> Risiede nel percorso ```/static/img/```

---

### Javascript
![](/images/js-glue-labs.com.png)
> Credits: https://glue-labs.com/articoli/come-scrivere-codice-javascript-usare-una-styleguide-google

Javascript, in particolare il framework [Vue](https://vuejs.org/), si occupa del lato Frontend.

#### Vue
![](/images/vue-vuejs.org.png)
> Credits: https://vuejs.org/

Vue e' un framework Javascript per creare interfacce utente.
> Alternative altrettanto valide sarebbero [Angular](https://angular.io/) e [React](https://it.reactjs.org/)

Si potrebbe dire che permette di avere istruzioni di linguaggi di programmazione all'interno del semplice HTML,
quindi e' possibile usare variabili, cicli for, condizioni if-elif-else...

In questo modo e' possibile rendere la pagina piu' dinamica e grazie al suo DOM virtuale la pagina e' "reattiva",
gli eventi hanno effetto in tempo reale

Vue e' stato usato nel sistema piu' facile possibile: e' stato "allegato" all'html come tutti gli altri script javascript.

Per progetti complessi sarebbe opportuno utilizzare componenti Vue (file .vue per componente con i propri CSS, javascript e html),
renderebbero l'applicazione "scalable" e i componenti sarebbero facilmente riutilizzabili in altri progetti
ma aumenterebbero la complessita' di passare dalla fase di sviluppo alla produzione: sarebbe necessaria una fase di build
per convertire i file vue (file non riconosciuti dai browser) in javascript successivamente allegabile all'HTML.
Per fare le build occorrerebbe utilizzare un "module bundler" come [Webpack](https://webpack.js.org/) e configurarlo a dovere.

Oltre a Vue questo progetto utilizza [Vue Router](https://router.vuejs.org/) per gestire la navigazione tra le pagine,
rendendo l'applicazione una [SPA (Single Page Application)](https://www.devapp.it/wordpress/single-page-application-cosa-sono-come-funzionano-e-quali-framework-utilizzare/). 
La navigazione nell'applicazione appare fluida lato utente perche' tutte le pagine vengono caricate contemporaneamente una volta sola.

[Torna su](#sezioni-documentazione)

#### Utilities
L'HTML importa diversi script javascript per aggiungere funzionalita':
* ```floorplan/svg.min.js``` : utility per fare operazioni su elementi svg
    ![](/images/svgjs-svgjs.com.png)
    > Credits: https://svgjs.com/docs/2.7/
* ```materialize/materialize.min.js``` per gli elementi di materialize (usato per il datepicker e il timepicker nelle impostazioni)
* ```mdbootstrap/bootstrap.min.js```, ```mdbootstrap/jquery-3.3.1.min.js```, ```mdbootstrap/mdb.min.js``` e ```mdbootstrap/popper.min.js```: javascript per mdbootstrap
* ```options/axios.min.js```: permette di fare richieste asincrone (GET, POST...)
* ```timestamp/t2ts.js```: permette di fare conversione tempo da formato "hh:mm tt" a timestamp
* ```touch/hammer.min.js```: gestisce eventi touch, come lo swipe

[Torna su](#sezioni-documentazione)

#### Pagine frontend

* ```main/graph.js```: Crea oggetto con pagina grafici
    ![](https://i.imgur.com/WLxOBgX.png)
* ```main/home.js```: Crea oggetto con pagina principale
    ![](https://i.imgur.com/xPlIjIH.png)
* ```main/infos.js```: Crea oggetto con pagina informazioni
    ![](https://i.imgur.com/HCK1New.png)
* ```main/options.js```: Crea oggetto con pagina impostazioni
    ![](https://i.imgur.com/YYGBdPq.png)
    ![](https://i.imgur.com/UwtuSxs.png)
* Javascript in index.html: usa le variabili con le pagine per configurare le route delle pagine

[Torna su](#sezioni-documentazione)

---

### CSS
![](/images/cssimage-wikipedia.org.png)
> Credits: https://en.wikipedia.org/wiki/Cascading_Style_Sheets

Il CSS si occupa di rendere gradevole l'interfaccia utente

[Torna su](#sezioni-documentazione)

#### Frameworks
![](/images/mdbootstrap-github.com.jpg)
> Credits: https://github.com/mdbootstrap

Molti degli elementi usano come stile lo stile di [mdbootstrap](https://mdbootstrap.com/):
* ```/static/css/all.css```: file font-awesome per il font (posizionato in ```/static/font/roboto```)
* ```/static/css/bootstrap.min.css```: stili bootstrap
* ```/static/css/mdb.min.css```: stili specifici di mdbootstrap
> mdbootstrap e' un framework che si basa su bootstrap sul quale aggiunge lo stile material design ("md")

mdbootstrap e' disponibile sia in versione gratuito sia in versione a pagamento:
purtroppo la versione gratuita non include timepicker e datepicker e lo stile dello switch gratuito non
e' bello come lo switch disponibile in altre alternative 

![](/images/materializecss-extensions.typo3.org.png)
> Credits: https://extensions.typo3.org/extension/t3content_materializecss/

Per il timepicker, datepicker e switch viene usato [materialize](https://materializecss.com/):
```/static/css/materialize.min.css```

[Torna su](#sezioni-documentazione)

#### Specifici per il progetto
Una parte del CSS e' stata scritta apposta per questo progetto in ```/static/css/main/style.css```:

* Rende la pagina alta almeno di una pagina e larga tutta la pagina
* Rende le pagine assolute per rendere piu' gradevole l'effetto di traslazione delle pagine
* Mantiene responsive planimetria e titolo riducendo la loro dimensione per i dispositivi mobile
* Crea l'effetto di traslazione quando si passa tra una pagina ad un'altra
* Crea la griglia con i quadrati colorati per permettere la selezione da parte dell'utente del colore da utilizzare nell'interfaccia
* Definisce lo stile dei pulsanti per tornare indietro

[Torna su](#sezioni-documentazione)

---

## Descrizione
La prima parte parlera' di cosa succede quando l'utente naviga la frontend,
mentre la seconda parte sara' divisa per "componente"

[Torna su](#sezioni-documentazione)

### Descrizione per navigazione
Quando l'utente naviga nella pagina index questa viene scaricata con tutti i suoi fogli di stile,
le sue immagini e i suoi script Javascript

La pagina comincia a richiedere tutti i file css:
1. Per primo richiede il CSS di materialize
2. Poi richiede il CSS del font, bootstrap e mdbootstrap

[Torna su](#sezioni-documentazione)

#### CSS specifico

3. Viene richiesto il CSS specifico per il progetto (```/static/css/main/style.css```):

    La prima proprieta' viene definita sull'elemento con id="app":

    ```css
    #app{
        /* Nascondo le pagine che stanno entrando */
        overflow: hidden; 
    }
    ```
    
    ```overflow: hidden``` indica di nascondere tutto quello che va fuori l'elemento
    e viene usato per nascondere la pagina che sta entrando durante la transizione.
    Se non ci fosse questa proprieta' la larghezza della pagina sarebbe due volte quella dello schermo.

    ---

    La seconda proprieta' viene usata da tutti gli elementi che usano class="page"

    ```css
    .page{
        /* Da usare per tutte le pagine */
        position: absolute; /* Posizione assoluta per evitare effetto "bump/salto"            */
        min-height: 100vh;  /* L'altezza della pagina deve essere minimo tutta pagina         */
        width: 100vw;       /* La lunghezza della pagina deve essere sempre SOLO tutta pagina */
    }
    ```
    Questa proprieta' viene assegnata ad ogni pagina che ha bisogno di definire altezza e larghezza 
    uguali al 100% della pagina. E' stata rimossa da alcune pagine perche' provoca l'effetto opposto 
    (la pagina diventava piu' alta/lunga del 100%)

    ---

    Le prossime due proprieta' sono definite per la planimetria:
    ```css
    .floorplan{
        height: 80vh; /* Altezza del div con mappa -> "centra" la mappa */
    }
    .floorplan > svg{
        /* Mappa della casa */
        width: 100%; 
        height: 80%;
        display: block; 
        margin: auto; 
    }
    ```
    La prima proprieta' (class="floorplan") e' data al div che contiene il file svg con la planimetria:
    gli indica di occupare 80/100 di una pagina.
    
    La seconda proprieta' (valida per gli elementi ```<svg></svg>``` dentro a elementi con class="floorplan"):
    * ```width: 100%;```  e ```height: 80%;``` fa occupare all'elemento tutto lo spazio orizzontale possibile e di occupare l'80%   dell'altezza dell'elemento che lo contiene ("\<div class="floorplan">\</div>")

    * ```display:block``` gli indica di occupare tutto lo spazio possibile, permettendo alla prossima proprieta' di centrare l'elemento
    * ```margin:auto``` imposta automaticamente i margini

    ---

    Poi vengono definita la proprieta' per il titolo della pagina principale e della pagina:

    ```css
    /* TITOLI */
    .title{
        height: 10vh;
        margin-bottom: 0;
    }
    ```
    L'elemento:
    * ```height: 10vh;``` e' alto 10/100 di una pagina
    * ```margin-bottom: 0;``` non ha margine sotto l'elemento

    e la proprieta' che permette di centrare verticalmente e orizzontalmente i suoi elementi:

    viene usata per centrare i titoli e i sottotitoli
    ```css
    .text-container{
        display: flex;           /* Per centrare testo*/
        justify-content: center; /* Per centrare testo*/
        align-items: center;     /* Per centrare testo*/
    }
    ```
    Dove:
    * ```display: flex;``` indica di usare flexbox, usato solo per le sue proprieta'
    * ```justify-content: center;``` centra orizzontalmente gli elementi
    * ```align-items: center;``` centra verticalmente gli elementi

    ---

    Ora viene definita' la proprieta' per il div che contiene i grafici
    
    ```css
    /* Parte dei grafici */
    .graph-container{
        height: 39vh;
    }
    ```

    Definisce semplicemente l'altezza uguale a 39/100 di pagina
    > Questo valore e' stato dato per fare in modo che i due titoli e 
    > i due grafici rimangano dentro alla singola pagina di altezza

    ---

    Poi viene definita la classe per impostare i pulsanti della pagina principale
    uguale a meta' pagina
    ```css
    /* Per avere pulsanti in Home mezza pagina l'uno */
    .halfpage{
        width: 50vw;
    }
    ```
    Indica all'elemento di occupare 50/100 orizzontalmente di una pagina

    ---

    Alcuni degli elementi con queste proprieta' "escono" dallo schermo
    quando lo schermo e' piu' piccolo, come nei tablet e su mobile,
    per questo motivo vengono definite le media queries

    ```css
    @media only screen and (max-width: 365px){
        /* media per schermi mobile small */
        .title{
            /* Titolo troppo grande su mobile (va su due righe...) 
                Todo: Mobile first...
            */
            font-size: 2.0rem;
        }
    }
    @media only screen and (max-height: 450px){
        /* media per schermi mobile small */
        .floorplan > svg{
            /* Mappa della casa */
            width: 90%; height: 100%;
        }
    }

    @media only screen and (max-height: 380px){
        /* media per schermi mobile small */
        .floorplan > svg{
            /* Mappa della casa */
            width: 79%; height: 100%;
        }
    }
    @media only screen and (max-height: 325px){
        /* media per schermi mobile small */
        .floorplan > svg{
            /* Mappa della casa */
            width: 65%; height: 100%;
        }
    }

    @media only screen and (max-height: 450px) and (min-width: 800px){
        /* media per schermi mobile small */
        .floorplan > svg{
            /* Mappa della casa */
            width: 60%; height: 100%;
        }
    }
    ```
    Tutte questi valori sono stati dati testando con la "device toolbar"
    di Google Chrome la [responsivita'](https://www.html.it/guide/responsive-web-design-la-guida/) della pagina

    > La "device toolbar" e' attivabile aprendo gli "strumenti per gli sviluppatori" e cliccando in alto a sinistra
    > il pulsante che ha come icona uno smartphone e un tablet. 
    > E' possibile usare la shortcut <kbd>CTRL</kbd>+<kbd>⇧  Shift</kbd>+<kbd>M</kbd> all'interno degli "strumenti per gli sviluppatori"

    ---
    
    <a id="vue-transition-css"></a>

    Le 4 classi successive servono per definire l'animazione di entrata e uscita durante il cambio delle pagine

    ![](/images/vue-pagetransition.gif)

    ```css
    /* VUE TRANSITION - TRANSIZIONE TRA PAGINE */

    .slide-fade-enter-active {
        transition: all .4s ease; /* .4 secondi per entrare */
    }
    .slide-fade-leave-active {
        transition: all .4s;      /* .4 secondi per uscire */
    }

    .slide-fade-enter{
        transform: translateX(100%); /* Transizione */
        opacity: 0;
    }
    .slide-fade-leave-to{
        transform: translateX(100%); /* Transizione */
        opacity: 0;
    }
    ```

    Dove per ```transition: all .4s ease;```:
    * ```transition``` : indica di fare una transizione
    * ```all```: indica che l'effetto incide su tutte le proprieta'
    * ```.4s```: e' il tempo che dura la transizione (0.4 secondi)
    * ```ease```: comportamento della transizione, in questo caso inizia la transizione lentamente, 
    poi diventa piu' veloce e termina piu' lentamente

    In ```transform: translateX(100%);```:
    * ```transform``` indica di trasformare l'elemento (ruotare/aumentare o diminuire dimensione/muovere ecc...)
    * ```translateX(100%);``` indica di traslare per l'asse X l'elemento del 100%, quindi ha l'effetto di traslare
    fino a fine schermo verso destra l'intera pagina
    * ```opacity: 0``` indica di impostare l'opacita' a 0, quindi non visibile

    ---
    
    La prossima proprieta' serve per rimuovere un problema relativo al timepicker e al datepicker

    ```css
    /* IMPOSTAZIONI - CALENDARIO E SELETTORE DATA/ORA 
    Togli da calendario e selettore data/ora la parte bianca che "esce" dallo schermo
    */

    .modal {
        bottom: unset;
    }
    ```
    Toglie la proprieta' bottom alla classe .modal di materialize.
    Questo e' necessario perche' altrimenti l'elemento si estenderebbe verso il basso fino a fine pagina
    > Quando si apre il timepicker/datepicker lo sfondo diventa leggermente opaco, tranne la parte
    > inferiore che rimane bianca

    ---

    Questo CSS serve per i quadrati con i colori selezionabili dall'utente

    ![](/images/options-squares.png)

    ```css
    /* IMPOSTAZIONI - SELEZIONE COLORE INTERFACCIA
    quadrati colorati
    
    https://spin.atomicobject.com/2015/07/14/css-responsive-square/
    */

    .square {
        position: relative; /* posizione relativa */
        width: 80%;         /* larghezza 80 % del parent (aggiunge )*/
    }
    
    .square:after {
        content: ""; /* Clearfix */
        display: block;
        padding-bottom: 100%;
    }
    
    .content {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center; /* Per centrare testo*/
        align-items: center;     /* Per centrare testo*/
    }
    ```

    .square:
    * ```position: relative``` : posizione relativa, permette, insieme a "position:absolute" di .content, di inserire un contenuto al quadrato
    * ```width: 80%``` : 80% dell'altezza dell'elemento che lo contiene

    .square:after serve per permettere al quadrato di mantenere altezza e lunghezza uguali:
    * ```content: ""``` serve perche' e' necessario avere un contenuto, anche nullo, per poter aggiungere stili ad un elemento
    * ```display: block``` permette all'elemento di espandersi a sinistra e a destra
    * ```padding-bottom: 100%``` permette di calcolare l'altezza dell'elemento in base alla sua lunghezza,
    mantenendolo un quadrato

    > :after e' uno "pseudo elemento", un elemento che non e' presente nell'html ma esiste come proprieta'

    .content:
    * ```position: absolute```: posizione assoluta, permette, insieme a "position: relative" di .square, di inserire un contenuto al quadrato
    * ```display:flex```: usa flexbox, usato esclusivamente per le proprieta' "justify-content" e "align-items"
    * ```width: 100%;``` e ```height: 100%;``` impostano il contenuto del quadrato grande quanto l'intero quadrato
    * ```justify-content: center;``` centra orizzontalmente gli elementi
    * ```align-items: center;``` centra verticalmente gli elementi

    ---

    La classe .w3-border-grey viene usata nella pagina delle informazioni dagli elementi \<hr>
    
    ```css
    /* RIGA BIANCA NELLE INFORMAZIONI */

    .w3-border-grey{
        background-color: white; 
    }
    ```
    Rende bianca la riga orizzontale

    ---

    Le ultime classi servono per avere un testo centrato e un pulsante alla sua sinistra:
    viene usato nella pagina delle informazioni e delle impostazioni

    ```css
    /* TITOLI E PULSANTI PER ANDARE INDIETRO
    Parte che centra il testo e allinea a sinistra il pulsante per tornare indietro 
    */

    .align-left{
        float:left !important; /* allinea a sinistra */ 
    }
    
    .center-text-vert{
        line-height:30px;  /* altezza del pulsante */
    }

    .center {
        text-align: center; /* testo centrato */
        margin-right: 55px; /* margine da destra (e da sinistra) del pulsante */   
    }
    ```

    .align-left:
    * ```float:left !important``` impone all'elemento di posizionarsi a sinistra del parent (l'elemento che lo contiene), !important fa in modo che la proprieta' sia considerata con piu' priorita'

    .center-text-vert:
    * ```line-height:30px;``` indica che la riga deve essere alta 30px, tanto quanto il pulsante
    per garantire che il testo sia alto quanto il pulsante

    .center:
    * ```text-align: center;``` centra il testo
    * ```margin-right: 55px;``` aggiunge margine a destra per complementare il margine a sinistra causato dal pulsante

[Torna su](#sezioni-documentazione)

#### CSS dinamico (PHP)

4. Infine vengono richiesti i "CSS" dalle pagine PHP:
    
    ##### CSS pagina informazioni

        "/static/css/infos/style.php"
    
    Le prime due righe sono PHP
    
    ```php
    <?php
        header("Content-type: text/css; charset: UTF-8");
        $typecolor = "white";// colore tip
    ?>
    ```
    La prima imposta nell'header del documento (documento restituito al browser)
    il tipo di contenuto ("Content-type") come "text/css" e il set di caratteri ("charset") a "UTF-8"

    La seconda riga definisce una variabile stringa a "white"

    ---

    Poi vengono definite le classi per il typewriter nella pagina delle informazioni
    (l'effetto scrittura)

    ![](/images/infos-typewriter.gif)

    ```css
    /* PARTE TYPEWRITER 
    https://css-tricks.com/snippets/css/typewriter-effect/
    */

    .typewriter h1 {
        overflow: hidden; /* Si assicura che il contenuto non sia visibile prima dell'animazione */
        border-right: .15em solid <?php echo $typecolor; ?>;  /* typwriter cursore */
        white-space: nowrap; /* Mantiene contenuto sulla stessa riga */
        margin: 0 auto; /* Gives that scrolling effect as the typing happens */
        letter-spacing: .15em; /* Spazio tra lettere */
        animation:
            typing 3.5s steps(40, end),
            blink-caret .75s step-end infinite;
    }

    /* Effetto scrittura */
    @keyframes typing {
    from { width: 0 }
    to { width: 100% }
    }

    /* Effetto scrittura cursore typewriter */
    @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: <?php echo $typecolor; ?>; }
    }

    ```

    .typewriter h1 ( h1 in \<div class="typewriter">\</div>):
    * ```overflow: hidden;``` nasconde contenuto che "esce" dall'elemento, questo permette di nascondere il testo prima del passaggio del cursore
    * ```border-right: .15em solid <?php echo $typecolor; ?>;```: cursore, formato da bordo destro grande .15 volte 
    la grandezza del font, tipo di bordo "solid", colore della variabile $typecolor di php ```<?php echo $typecolor; ?>``` (bianco)
    * ```white-space: nowrap```: il testo continua sulla stessa riga
    * ```margin: 0 auto;```: imposta margine destro e sinistro automaticamente, "muovendo" verso sinistra il testo
    ad ogni lettera "scritta"
    * ```letter-spacing: .15em;```: spazio tra ogni lettera uguale a 0.15 volte la grandezza del font
    * ```animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;```: specifica due animazioni:
        * ```typing 3.5s steps(40, end)```: animazione "typing" che dura 3.5 secondi e che impiega 40 step per andare dall'inizio VERSO la fine ("end")
        * ```blink-caret .75s step-end infinite;```: animazione "blink-caret" che dura .75 secondi, l'animazione rimane nello stato iniziale finche' non e' terminata, ripeti all'infinito
    
    effetto "typing":
    * ```from { width: 0 }```: passa dallo stato "lunghezza 0%"
    * ```from { width: 100% }```: allo stato "lunghezza 100%"
    > Effetto scrittura

    effetto "blink-caret":
    * ```from, to { border-color: transparent }```: stato iniziale e stato finale hanno colore del bordo (cursore) trasparente ("invisibile")
    * ```50% { border-color: <?php echo $typecolor; ?>; }```: a meta' animazione il colore del bordo diventa il colore nella variabile di PHP, ```<?php echo $typecolor; ?>```, cioe' bianco

    ---

    La parte successiva definisce lo stile delle tooltip al passaggio del cursore sulla lista 
    nella pagina delle impostazioni

    ```css
    /* TESTO LISTA DATI SUL DB */

    .tooltip {
        position: relative;
        display: inline-block;
        border-bottom: 1px dotted black;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: <?php echo $typecolor; ?>;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
        top: -5px;
        right: 105%;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
    }
    
    ```

    TODO: documentazione css tooltip

    ---

    Le ultime due classi servono per posizionare il testo in alto a sinistra
    e in basso a sinistra, vengono usate nella pagina delle informazioni

    ```css
    /* TESTI IN BASSO E IN ALTO A SINISTRA */

    .w3-display-topleft {
        position: absolute;
        left: 0;
        top: 0;
    }

    .w3-display-bottomleft {
        position: absolute;
        left: 0;
        bottom: 0;
    }
    ```

    Le proprieta' utilizzate dalle classi sono:
    * ```position: absolute;```: posiziona l'elemento in modo assoluto
    * ```left: 0```: posiziona l'elemento in posizione 0 da sinistra
    * ```top: 0```: posiziona l'elemento in posizione 0 dall'alto
    * ```bottom: 0```: posiziona l'elemento in posizione 0 dal basso

    [Torna su](#sezioni-documentazione)

    ##### CSS dinamico pagina informazioni

        "/static/css/infos/cm_style.php"

    Lo script PHP prima configura l'header
    ```php
    header("Content-type: text/css; charset: UTF-8");
    ```
    Il contenuto e' impostato a "text/css" e il set di caratteri a "UTF-8"

    ---

    ```php
    header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    ```
    Queste istruzioni impediscono al client di salvare la cache del file CSS
    e si impone la sua scadenza ad una data precedente alla data attuale.

    Questo e' necessario per permettere all'utente di modificare il colore dell'interfaccia:
    se il client crea la cache del file CSS verra' utilizzata quella e non il nuovo CSS
    con il nuovo colore impostato

    ---

    Poi viene definita la variabile $textcolor, stringa "white"
    ```php
    $textcolor = "white"; // colore testo
    ```
    sara' il colore del testo

    ---

    Poi viene importato e eseguito lo script ```/static/php/get_selectedcolor.php```
    ```php
    /* colori dal DB */
    include $_SERVER["DOCUMENT_ROOT"] . '/static/php/get_selectedcolor.php';   // recupera $color
    ```
    Lo script si occupa di connettersi al database, recuperare dalla tabella t_options il "color_scheme" del colore selezionato dall'utente e recuperare dalla tabella t_colors il suo valore esadecimale.

    Nello specifico:
    1. Lo script importa lo script ```db_connection.php```:

        * ```db_connection.php```, dopo aver disabilitato la visualizzazione dei warning (verranno gestiti visualizzandoli per poi terminare lo script)
        * viene definita la funzione ```dbconn($dbname)```:

                dbconn($dbname)
            
            Questa funzione si occupa di connettersi al DB, e operare sulla tabella passati come parametri.
            La funzione recupera dal file 'credentials.ini' username e password per accedere al DB in locale.
         
            il parametro verra' usato per accedere al DB.
            
            La funzione restituira' l'oggetto connessione con la connessione avvenuta correttamente

            @since 1.0.0                                                                 <br>
            @param string $dbname  nome del database                                     <br>
            @return object $conn oggetto connessione (connessione avvenuta con successo)

        
        * viene definita la funzione ```queryToJson($t_mysqli, $t_query)```:

                queryToJson($t_mysqli, $t_query)

            Questa funzione si occupa di eseguire la query e di resituire i dati in formato json.
         
            Esegue la query, ottiene i dati e li inserisce in un array,
            svuota la memoria occupata dal risultato della query e restituisce l'array in formato json

            @since 1.0.0
    
            @param object $t_mysqli oggetto connessione                                 <br>
            @param string $t_query query da eseguire nel database connesso in $t_mysqli
         
            @return string json_encode($data) json del risultato della query

    2. Lo script usa la funzione ```dbconn($dbname)``` per connettersi al database
    3. Lo script richiama la sua funzione ```get_colors($t_mysqli, $t_opttable, $t_colorstable)```
       per ottenere un array

            get_colors($t_mysqli, $t_opttable, $t_colorstable)
        Questa funzione esegue la query per selezionare il colore selezionato dall'utente.
        
        La funzione esegue con la funzione queryToJson() la query
        per selezionare il colore (esadecimale) e ottiene il JSON,
        converte il JSON ottenuto in array che verra' restituito
        
        @since 1.0.0
        
        @param object $t_mysqli oggetto connessione gia' connesso al DB                          <br>
        @param string $t_opttable tabella da dove prendere colore selezionato                    <br>
        @param string $t_colorstable tabella da dove prendere esadecimale del colore selezionato
        
        @return array $array_opts array con il colore in esadecimale

    4. Dall'array ottenuto ```Array ( [0] => Array ( [color_hex] => #xxxxxx ) )```
       viene recuperato il numero esadecimale e il suo valore viene salvato nella variabile "$color"
    
    ---

    Dopo aver salvato il valore esadecimale del colore contenuto in $color nella variabile $cm_bgcolor3
    viene restituito il CSS che usa il colore esadecimale:

    ```css
    /* sfondi colorati */
    .bg-color-infos{
        background-color: <?php echo $cm_bgcolor3; ?>;
        color: <?php echo $textcolor; ?>;
    }
    ```
    La classe definisce il colore di sfondo (```background-color```) uguale al colore selezionato
    dall'utente (colore espresso in valore esadecimale) e il colore del testo (```color```)
    del valore della variabile $textcolor ("white", bianco)

    > Nota: il cambio nome di variabile e' stato fatto per integrare vecchio codice a quello nuovo
    > (codice appartenente al "prototipo" del progetto 100+100)

    [Torna su](#sezioni-documentazione)

    ##### CSS dinamico pagina impostazioni

        "/static/css/settings/cm_style.php"

    Per ultimo viene importato il CSS delle impostazioni.

    Lo script PHP prima configura l'header
    ```php
    header("Content-type: text/css; charset: UTF-8");
    ```
    Il contenuto e' impostato a "text/css" e il set di caratteri a "UTF-8"

    ---

    ```php
    header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    ```
    Queste istruzioni impediscono al client di salvare la cache del file CSS
    e si impone la sua scadenza ad una data precedente alla data attuale.

    Questo e' necessario per permettere all'utente di modificare il colore dell'interfaccia:
    se il client crea la cache del file CSS verra' utilizzata quella e non il nuovo CSS
    con il nuovo colore impostato

    ---

    Poi viene importato e eseguito lo script ```/static/php/get_selectedcolor.php```
    ```php
    /* colori dal DB */
    include $_SERVER["DOCUMENT_ROOT"] . '/static/php/get_selectedcolor.php';   // recupera $color
    ```
    Lo script si occupa di connettersi al database, recuperare dalla tabella t_options il "color_scheme" del colore selezionato dall'utente e recuperare dalla tabella t_colors il suo valore esadecimale.

    Nello specifico:
    1. Lo script importa lo script ```db_connection.php```:

        * disabilita la visualizzazione dei warning (verranno gestiti visualizzandoli per poi terminare lo script)
        * viene definita la funzione ```dbconn($dbname)```:

                dbconn($dbname)
            
            Questa funzione si occupa di connettersi al DB, e operare sulla tabella passati come parametri.
            La funzione recupera dal file 'credentials.ini' username e password per accedere al DB in locale.
         
            il parametro verra' usato per accedere al DB.
            
            La funzione restituira' l'oggetto connessione con la connessione avvenuta correttamente

            @since 1.0.0                                                                 <br>
            @param string $dbname  nome del database                                     <br>
            @return object $conn oggetto connessione (connessione avvenuta con successo) <br>

        
        * viene definita la funzione ```queryToJson($t_mysqli, $t_query)```:

                queryToJson($t_mysqli, $t_query)

            Questa funzione si occupa di eseguire la query e di resituire i dati in formato json.
         
            Esegue la query, ottiene i dati e li inserisce in un array,
            svuota la memoria occupata dal risultato della query e restituisce l'array in formato json

            @since 1.0.0
    
            @param object $t_mysqli oggetto connessione
            @param string $t_query query da eseguire nel database connesso in $t_mysqli
         
            @return string json_encode($data) json del risultato della query

    2. Lo script usa la funzione ```dbconn($dbname)``` per connettersi al database
    3. Lo script richiama la sua funzione ```get_colors($t_mysqli, $t_opttable, $t_colorstable)```
       per ottenere un array

            get_colors($t_mysqli, $t_opttable, $t_colorstable)
        Questa funzione esegue la query per selezionare il colore selezionato dall'utente.
        
        La funzione esegue con la funzione queryToJson() la query
        per selezionare il colore (esadecimale) e ottiene il JSON,
        converte il JSON ottenuto in array che verra' restituito
        
        @since 1.0.0
        
        @param object $t_mysqli oggetto connessione gia' connesso al DB                          <br>
        @param string $t_opttable tabella da dove prendere colore selezionato                    <br>
        @param string $t_colorstable tabella da dove prendere esadecimale del colore selezionato
        
        @return array $array_opts array con il colore in esadecimale

    4. Dall'array ottenuto ```Array ( [0] => Array ( [color_hex] => #xxxxxx ) )```
       viene recuperato il numero esadecimale e il suo valore viene salvato nella variabile "$color"
    
    ---

    Viene importato lo script ```/static/php/rgb_hexconvertion.php```
    ```php
    include $_SERVER["DOCUMENT_ROOT"] . '/static/php/rgb_hexconvertion.php'; // conversioni rgb e hex
    ```

    Lo script si occupa di definire tre funzioni:

        adjustBrightness($hex, $percent, $darken = true)
    Prende una stringa colore esadecimale $hex, e se:
    * $darken = true -> rende piu' scuro il colore di $percent %
    * $darken = false -> rende piu' chiaro il colore di $percent %

    infine restituisce la stringa del nuovo colore in esadecimale

        hextorgb(string $t_hex)
    Converte una stringa colore esadecimale
    in un array colore rgb (r, g, b)

        rgbtohex(string $t_rgb)
    Converte una stringa colore rgb
    in una stringa colore esadecimale

    ---

    Il colore $color viene salvato nella variabile $cm_bgcolor4
    e vengono importato il CSS dei pulsanti:

    ```php
    include(__DIR__ . '/_cm_button.php');
    ```

    Lo script:
    
    ```php
    header("Content-type: text/css; charset: UTF-8");

    $textcolor = "#ffffff"; // colore testo
    $bgcolor   = $cm_bgcolor4; //"#5B4E77"; // colore in home
    ```
    
    prima impone il content type a "text-css" e il set di caratteri "UTF-8",
    definisce la variabile $textcolor a #ffffff (bianco) e la variabile $bgcolor a $cm_bgcolor4

    ```php
    // BORDER-COLOR PULSANTI
    $bordercolor = adjustBrightness($bgcolor, 15, true); // false -> chiaro, 10 -> 10%

    // BACKGROUND-COLOR HOVER
    $bghover = adjustBrightness($bgcolor, 10, true); // false -> chiaro, 10 -> 10%

    // BACKGROUND-COLOR FOCUS/ACTIVE/VISITED
    $bgfav = adjustBrightness($bgcolor, 10, false); // false -> chiaro, 10 -> 10%
    ```

    Poi viene richiamata la funzione ```adjustBrightness()``` di ```/static/php/rgb_hexconvertion.php```
    per ottenere:
    * un colore del bordo il 15% piu' scuro di $bgcolor
    * un colore all'hover ("cursore sopra il pulsante") il 10% piu' scuro di $bgcolor
    * un colore quando il pulsante viene premuto del 10% piu' chiaro di $bgcolor

    ```css
    /* Pulsanti */
    .bg-color {
        color: <?php echo $textcolor; ?>;  /* colore testo */
        background-color: <?php echo $bgcolor; ?>; /* colore interno */
        border-color: <?php echo $bordercolor; ?>; /* colore bordo */
    }

    .bg-color:hover{
        background-color: <?php echo $bghover; ?>; /* colore interno mouse sopra oggetto */
    }

    .bg-color:focus, .bg-color:active , .bg-color:visited {
        background-color: <?php echo $bgfav; ?>; /* colore interno mouse ci clicca / ha cliccato sopra */
    }
    ```
    Infine viene restituito il CSS per il pulsante:
    * ```color```, $textcolor/bianco, e' il colore del testo
    * ```background-color``` e' il colore di sfondo
    * ```border-color``` e' il colore del bordo

    Questo e' il risultato:
    ![](/images/options-button.gif)

    ---

    Dopo il CSS dei pulsanti viene importato il css per lo switch
    ```php
    include(__DIR__ . '/_cm_switch.php');
    ```

    Lo script:
    
    ```php
    header("Content-type: text/css; charset: UTF-8");

    $textcolor = "#ffffff"; // colore testo
    $bgcolor   = $cm_bgcolor4; //"#5B4E77"; // colore in home
    ```
    
    prima impone il content type a "text-css" e il set di caratteri "UTF-8",
    definisce la variabile $textcolor a #ffffff (bianco) e la variabile $bgcolor a $cm_bgcolor4

    ```php
    // BACKGROUND-COLOR CHECKED

    $bgchecked = adjustBrightness($bgcolor, 10, true); // true -> scuro, 10 -> 10%

    // BACKGROUND-COLOR AFTER
    $bgaft = adjustBrightness($bgcolor, 10, false); // false -> chiaro, 10 -> 10%
    ```

    Poi viene richiamata la funzione ```adjustBrightness()``` di ```/static/php/rgb_hexconvertion.php```
    per ottenere:
    * un colore dello switch attivo il 10% piu' scuro di $bgcolor
    * un colore della levetta dello switch attivo il 10% piu' chiaro di $bgcolor

    ```css
    .switch label input[type=checkbox]:checked+.lever {
        background-color: <?php echo $bgchecked; ?>;
    }

    .switch label input[type=checkbox]:checked+.lever:after {
        background-color: <?php echo $bgaft; ?>;
    }
    ```

    Infine viene restituito il CSS per lo switch:
    * ```background-color``` e' il colore di sfondo

    Visualizzato nel browser:
    ![](/images/options-switch.gif)

    ---

    Da cm_style.php viene importato lo script per il datepicker (calendario)
    ```php
    include(__DIR__ . '/_cm_datepicker.php');
    ```

    Lo script:

    ```php
    header("Content-type: text/css; charset: UTF-8");

    $textcolor = "#ffffff"; // colore testo
    $bgcolor   = $cm_bgcolor4; //"#5B4E77"; // colore in home
    ```
    
    prima impone il content type a "text-css" e il set di caratteri "UTF-8",
    definisce la variabile $textcolor a #ffffff (bianco) e la variabile $bgcolor a $cm_bgcolor4

    ```php
    // BACKGROUND-COLOR light
    $bglight = adjustBrightness($bgcolor, 10, false); // false -> chiaro, 10 -> 10%

    // BACKGROUND-COLOR dark
    $bgdark = adjustBrightness($bgcolor, 10, true); // false -> chiaro, 10 -> 10%
    ```

    Poi viene richiamata la funzione ```adjustBrightness()``` di ```/static/php/rgb_hexconvertion.php```
    per ottenere:
    * un colore il 10% piu' chiaro di $bgcolor
    * un colore il 10% piu' scuro di $bgcolor

    ```php
    // divide $bglight hex to decimal values
    $bglight_r = intval(hextorgb($bglight)[0]);
    $bglight_g = intval(hextorgb($bglight)[1]);
    $bglight_b = intval(hextorgb($bglight)[2]);
    ```

    Con la funzione hextorgb() vengono recuperati i valori red, green, blue in decimale
    > intval() converte il valore in intero, quando viene visualizzato non si nota alcuna
    > differenza ma si assicura che il valore sia numerico

    > E' necessario per poter utilizzare i colori espressi in rgba (red, green, blue, alpha/opacita')

    ```css
    /* datepicker / selettore data */
    .datepicker-date-display {
        background-color: <?php echo $bglight; ?>;
    }

    .datepicker-cancel, .datepicker-clear, .datepicker-today, .datepicker-done {
        color: <?php echo $bgdark; ?>;
        padding: 0 1rem;
    }

    .datepicker-table td.is-selected {
        background-color: <?php echo $bgdark; ?>;
        color: <?php echo $textcolor; ?>;
    }

    .datepicker-table td:active {
        background-color: <?php echo $bgdark; ?>;
        color: <?php echo $textcolor; ?>;
    }

    .datepicker-table td:focus {
        background-color: <?php echo $bgdark; ?>;
        color: <?php echo $textcolor; ?>;
    }

    .datepicker-table td.is-today {
        color: <?php echo $bgdark; ?>;
    }
    .datepicker-table td.is-today.is-selected {
        color: white;
    }

    button.month-prev:active{
    background-color: <?php echo $bgdark; ?>;
    }

    button.month-next:active{
    background-color: <?php echo $bgdark; ?>;
    }

    .dropdown-content li>a, .dropdown-content li>span {
        color: <?php echo $bgdark; ?>;
    }

    .datepicker-day-button:focus {
        /* Giorno "tabbatto"/trascinato */
        background-color: <?php echo "rgba($bglight_r, $bglight_g, $bglight_b, 0.25)" ?>;
    }

    ```

    TODO: documentare CSS datepicker _cm_datepicker.php
    
    Il CSS viene infine visualizzato

    Datapicker nel browser:
    ![](/images/options-datepicker.gif)

    ---

    Da cm_style.php viene importato lo script per il timepicker (orologio)
    ```php
    include(__DIR__ . '/_cm_timepicker.php');
    ```

    Lo script:

    ```php
    header("Content-type: text/css; charset: UTF-8");

    $textcolor = "#ffffff"; // colore testo
    $bgcolor   = $cm_bgcolor4; //"#5B4E77"; // colore in home
    ```
    
    prima impone il content type a "text-css" e il set di caratteri "UTF-8",
    definisce la variabile $textcolor a #ffffff (bianco) e la variabile $bgcolor a $cm_bgcolor4

    ```php
    // BACKGROUND-COLOR AFTER
    $bg = adjustBrightness($bgcolor, 10, false); // false -> chiaro, 10 -> 10%
    ```
    Poi viene richiamata la funzione ```adjustBrightness()``` di ```/static/php/rgb_hexconvertion.php```
    per ottenere un colore il 10% piu' chiaro di $bgcolor

    ```php
    $bg_array = hextorgb($bg);
    $bg_r = intval($bg_array[0]);
    $bg_g = intval($bg_array[1]);
    $bg_b = intval($bg_array[2]);
    ```

    Con la funzione hextorgb() vengono recuperati i valori red, green, blue in decimale
    > intval() converte il valore in intero, quando viene visualizzato non si nota alcuna
    > differenza ma si assicura che il valore sia numerico

    > E' necessario per poter utilizzare i colori espressi in rgba (red, green, blue, alpha/opacita')

    ```css
    /* colori timepicker/selettore ore e minuti */
    .timepicker-digital-display{
    background-color: <?php echo $bg; ?>;
    }

    timepicker-svg > g > line{
    fill: <?php echo $bg; ?>;
    stroke: <?php echo $bg; ?>;
    }

    .timepicker-canvas line {
        stroke: <?php echo $bg; ?>;
    }

    .timepicker-canvas-bg{
    fill: <?php echo $bg; ?>;
    }

    .timepicker-canvas-bearing{
    fill: <?php echo $bg; ?>;
    }

    .btn-flat.timepicker-close.waves-effect{
    color: <?php echo $bg; ?>;
    }

    .text-primary{
    color: <?php echo $textcolor; ?>!important;
    }

    .timepicker-tick:hover{
    background-color: <?php echo "rgba($bg_r, $bg_g, $bg_b, 0.25)"; ?>;
    }
    ```

    TODO: documentare CSS timepicker _cm_timepicker.php

    Il CSS viene infine visualizzato/restituito
    
    Timepicker visualizzato nella frontend:
    ![](/images/options-timepicker.gif)

    [Torna su](#sezioni-documentazione)

> Nota: l'ordine del CSS (Cascade Style Sheet) e' importante perche', come dice il nome,
> viene "interpretato" a cascata: 
> se vengono definite due stili con la stessa definizione e le stesse proprieta', l'ultima sostituisce la prima 
> (SE HANNO LA STESSA PRIORITA', guarda [QUI](https://www.mrwebmaster.it/css/risoluzione-conflitti-stili_11928.html) per maggiori informazioni)

#### HTML
Dopo aver importato i file css, viene creato il container vue
che verra' controllato da Vue stesso

```html
<!-- Contenitore vue -->
<div id="app">
    <transition name="slide-fade">
        <!-- Animazione cambio pagine -->
        <router-view></router-view> <!-- Pagina visualizzata -->
    </transition>
</div>
```

* Il div con l'id="app" e' il container vue
* ```<transition name="slide-fade">``` e' un elemento di Vue e permette di aggiungere animazioni durante il cambio di pagine
    > Il CSS per "slide-fade" e' stato definito nel file ```/static/css/main/style.css```: [Vedi qui](#vue-transition-css)
* ```<router-view>``` e' un elemento di Vue Router e serve per visualizzare la pagina

[Torna su](#sezioni-documentazione)

#### Javascript

Per ultimi vengono importati e eseguiti gli script Javascript:
1. Viene importato il javascript di materialize.js (```/static/js/materialize/materialize.min.js```)
2. Vengono importati gli javascript necessari per mdbootstrap:
    * ```/static/js/mdbootstrap/jquery-3.3.1.min.js```: jquery per mdbootstrap
    * ```/static/js/mdbootstrap/popper.min.js```: javascript necessario per bootstrap 
    * ```/static/js/mdbootstrap/bootstrap.min.js```: javascript di bootstrap
    * ```/static/js/mdbootstrap/mdb.min.js```: javascript di mdbootstrap 

#### Utility javascript

3. Vengono importate le utility:
    
    ##### SVG.JS
    ![](/images/svgjs-svgjs.com.png)
    > Credits: https://svgjs.com/docs/2.7/

        /static/js/floorplan/svg.min.js
    
    [svg js](https://svgjs.com/docs/2.7/) e' una libreria che permette
    facilmente la manipolazione e l'animazione di elementi SVG

    Nel progetto 100+100 viene usato solo per inserire la
    planimetria svg nella pagina principale ( home )
    nel file ```/static/js/main/home.js```, funzione in mounted:

    ```js
    var draw = SVG(document.getElementById("floorplan")); // seleziona elemento dove inserire la mappa
    draw.svg(resp.data);
    ```

    la prima istruzione richiama la funzione SVG() al quale viene passato
    l'elemento in cui si intende controllare l'elemento svg,
    mentre la seconda istruzione indica di inserire l'svg "resp.data"
    nell'elemento controllato da svg.js
    > Nel codice non vengono queste istruzioni non vengono richiamate
    > una dopo l'altra immediatamente, resp.data e' il contenuto
    > di una richiesta GET fatta da axios.js

    [Torna su](#sezioni-documentazione)

    ##### Axios.JS

        /static/js/options/axios.min.js

    [Axios.js](https://github.com/axios/axios) e' un client http
    che permette di fare richieste asincrone basate sulle "promesse".
    Questo significa che quando viene eseguita una richiesta
    non viene atteso un risultato immediato, semplicemente "promette"
    che quando si sara' un risultato si comportera' come
    gli specifichiamo nel metodo "then" (appunto "quando")

    Esempio di uso preso da [targetweb.it](https://www.targetweb.it/guida-axios-js-effettuare-chiamate-asincrone-con-la-libreria-axios/):
    ```js
    axios.get('/url-get?ID=12345')
    .then(function (response) {
        // success
        console.log(response);
    })
    .catch(function (error) {
        // error
        console.log(error);
    })
    .then(function () {
        // esempio di funzione che verrà eseguita sempre, sia in caso di errore che in caso di success
    });
    ```

    Nel progetto e' usato per fare tutte le richieste tra frontend e backend:
    * richiedere le rilevazioni da visualizzare nei grafici (pagina "graph.js")
    * richiedere le ultime rilevazioni da visualizzare nella planimetria (pagina "home.js")
    * richiedere la planimetria (pagina "home.js")
    * mandare a PHP i timestamp delle rilevazioni da visualizzare nei grafici (pagina "options.js")
        > Sia quando si vogliono visualizzare tutti i dati, sia quando si vuole visualizzare una parte dei dati
    * richiedere gli RSSI delle ultime rilevazioni da visualizzare nelle impostazioni (pagina "options.js")
    * richiedere le informazioni relative allo spazio libero e occupato da visualizzare nelle impostazioni (pagina "options.js")
    * richiedere i colori selezionabili da visualizzare nelle impostazioni (pagina "options.js")
    * mandare a PHP il colore selezionato dall'utente (pagina "options.js")
    * richiedere le planimetrie selezionabili da visualizzare nelle impostazioni (pagina "options.js")
    * mandare a PHP la planimetria selezionata dall'utente (pagina "options.js")

    [Torna su](#sezioni-documentazione)

    ##### Hammer.JS

        /static/js/touch/hammer.min.js

    [hammer.js](https://hammerjs.github.io/) e' una libreria che permette di gestire
    vari tipi di gesture, come gli swipe, i pinch, tap, doppio tap ecc...

    Nel progetto viene usato esclusivamente per lo swipe per poter tornare alla pagina precedente.
    Questa funzione viene definita in ogni pagina:

    ```js
    goBack: function () {
            /* Imposta touch per tornare indietro */
            if (boold) {
                console.log("aggiungo il touch");
            }

            /* Pulsante per tornare indietro */
            var backbutton = document.getElementById("backbutton");
            backbutton.addEventListener("click", function () {
                window.location.href = "/#/";
            })

            var hammertime = new Hammer(document.getElementById('app'));
            hammertime.on('swipe', function (ev) {
                if (boold) {
                    console.log("delta X: ", ev.deltaX);
                }

                if (ev.deltaX > 100) {
                    // se lo swipe verso sinistra di 100px
                    window.location.href = "/#/"; // torna pagina precedente/principale
                }
            });
        }
    ```

    In particolare:
    ```js
    var backbutton = document.getElementById("backbutton");
        backbutton.addEventListener("click", function () {
            window.location.href = "/#/";
        })
    ```
    la variabile backbutton contiene l'elemento con id "backbutton",
    cioe' il pulsante che serve per tornare indietro,
    al quale viene aggiunto un nuovo evento da ascoltare ("addEventListener"): <br>
    quell'evento da ascoltare e' il click.
    Quando viene premuto il pulsante viene eseguita la funzione
    che imposta window.location.href (URL attuale) a "/#/" .
    Quindi, se la pagina viene richiesta dal raspberry stesso, rimanda a http://localhost/#/, cioe' la home.

    Ma il vero codice che utilizza hammer.js e':
    ```js
    var hammertime = new Hammer(document.getElementById('app'));
            hammertime.on('swipe', function (ev) {
                if (boold) {
                    console.log("delta X: ", ev.deltaX);
                }

                if (ev.deltaX > 100) {
                    // se lo swipe verso sinistra di 100px
                    window.location.href = "/#/"; // torna pagina precedente/principale
                }
            });
    ```
    La prima istruzione definisce un'istanza di hammer.js a
    cui si passa l'elemento da ascoltare (l'elemento con id="app", quindi il container vue, tutta la pagina)

    mentre l'istruzione successiva dice che quando ("on") avviene uno swipe ("swipe")
    esegui la funzione che prende come parametro ev, l'evento stesso con le sue proprieta'.

    La proprieta' da osservare e' deltaX, cioe' la quantita' di pixel
    con cui il dito si e' mosso da sinistra a destra ("X" = asse x) o viceversa.

    Quando la quantita' di pixel e' maggiore di 100 imposta window.location.href (URL attuale) a "/#/".

    [Torna su](#sezioni-documentazione)

    ##### t2ts.JS

        /static/js/timestamp/t2ts.js
    
    Questo script e' stato scritto da me (a differenza delle altre utility)
    e definisce solo ed esclusivamente una funzione:

        timeToTimestamp(t_time)
    Converte tempo (formato "hh:mm tt") in timestamp
   
    @since      1.0.0
    
    @param {string} t_time, tempo, formato "hh:mm tt" .
    
    @return {int} timestamp, timestamp .

    Viene usata nella pagina delle impostazioni ("options.js")
    per convertire il tempo inserito dall'utente
    nel timepicker ("orologio") in formato "hh:mm tt" (ore:minuti\<spazio>AM/PM)
    in timestamp (quindi secondi)

    [Torna su](#sezioni-documentazione)

#### Vue e Vue router
4. Vengono importati Vue e Vue router

    ![](/images/vue-vuejs.org.png)
    > Credits: https://vuejs.org/

    Vue e' un framework Javascript per creare interfacce utente.
    > Alternative altrettanto valide sarebbero [Angular](https://angular.io/) e [React](https://it.reactjs.org/)

    Si potrebbe dire che permette di avere istruzioni di linguaggi di programmazione all'interno del semplice HTML,
    quindi e' possibile usare variabili, cicli for, condizioni if-elif-else...

    In questo modo e' possibile rendere la pagina piu' dinamica e grazie al suo DOM virtuale la pagina e' "reattiva",
    gli eventi hanno effetto in tempo reale

    Vue e' stato usato nel sistema piu' facile possibile: e' stato "allegato" all'html come tutti gli altri script javascript.

    Per progetti complessi sarebbe opportuno utilizzare componenti Vue (file .vue per componente con i propri CSS, javascript e html),
    renderebbero l'applicazione "scalable" e i componenti sarebbero facilmente riutilizzabili in altri progetti
    ma aumenterebbero la complessita' di passare dalla fase di sviluppo alla produzione: sarebbe necessaria una fase di build
    per convertire i file vue (file non riconosciuti dai browser) in javascript successivamente allegabile all'HTML.
    Per fare le build occorrerebbe utilizzare un "module bundler" come [Webpack](https://webpack.js.org/) e configurarlo a dovere.

    Oltre a Vue questo progetto utilizza [Vue Router](https://router.vuejs.org/) per gestire la navigazione tra le pagine,
    rendendo l'applicazione una [SPA (Single Page Application)](https://www.devapp.it/wordpress/single-page-application-cosa-sono-come-funzionano-e-quali-framework-utilizzare/). 
    La navigazione nell'applicazione appare fluida lato utente perche' tutte le pagine vengono caricate contemporaneamente una volta sola.

    I componenti Vue hanno un ciclo di vita di questo tipo:

    ![](https://vuejs.org/images/lifecycle.png)

    > Credits: vuejs.org

    Capire completamente questo diagramma e' molto difficile.
    Per fortuna non e' necessario sapere l'intero funzionamento per comprendere del codice...

    Nel progetto 100+100 ogni componente/pagina ha come proprieta':
    * "name": nome del componente
    * "template": stringa che contiene l'html del componente (contenente variabili, condizioni ecc...)
        > Tutto l'html deve essere contenuto in un unico elemento. Problema facilmente
        > risolvibile mettendo tutto 'html in un div.
    * "props": array con le proprieta'/parametri passate dal URL 
        > l'oggetto route deve avere "props: true"
    * "methods": oggetto contenente funzioni 
        > Viene definito in questo modo ```methods: {nome_funzione1: function(){}, nome_funzione2: function(){}}```
    * "mounted": funzione eseguita quando il componente viene caricato
    * "data": funzione che restituisce un oggetto con dati accessibili all'interno del componente

    [Torna su](#sezioni-documentazione)

#### Descrizione pagine Frontend

5. Vengono importati gli script con gli oggetti/pagine per Vue

    ##### Home

    ![](https://i.imgur.com/xPlIjIH.png)

    La pagina principale, contenuta nel componente "Home", e'
    gestita dal file ```/static/js/main/home.js```.

    Quando viene visitata la pagina l'html contenuto nella proprieta' "template"
    viene iniettata al posto di ```<router-view></router-view>``` all'interno del container vue.

    Stato "originale" del container:
    ```html
    <!-- Contenitore vue -->
    <div id="app">
        <transition name="slide-fade">
            <!-- Animazione cambio pagine -->
            <router-view></router-view> <!-- Pagina visualizzata -->
        </transition>
    </div>
    ```
    
    Con html iniettato:
    ```html
    <div id="app">
        <div class="page">
            <div class="container">
                <h1 class="text-container title">Progetto 100 + 100</h1>

                <div id="floorplan" ref="floorplan" class="floorplan"> </div>

                <div class="btn-group fixed-bottom" role="group">
                    <button v-on:click="gotoinfos" type="button" class="btn bg-color halfpage"> {{ infoprogetto }} </button>
                    <button v-on:click="gotooptions" type="button" class="btn bg-color halfpage"> {{ impostazioni }} </button>
                </div>
            </div>
        </div>
    </div>
    ```
    
    In realta' questo non e' l'html visualizzabile dalla frontend perche' la direttiva v-on
    e le variabili {{ infoprogetto }} e {{ impostazioni }} vengono interpretate da vue:

    Le direttive "v-on" permettono di gestire degli eventi, come il click dell'elemento:
    v-on:click fa esattamente questo, quando viene cliccato esegue del javascript:
    * ```v-on:click="gotoinfos"``` indica che cliccando l'elemento viene eseguito
      il metodo gotoinfos() contenuto in "methods"

            gotoinfos()
        Reindirizza alla pagina delle informazioni impostando ```window.location.href = "/#/infos";```
    
    * ```v-on:click="gotooptions"``` indica che cliccando l'elemento viene eseguito
      il metodo gotooptions() contenuto in "methods"

            gotooptions()
        Reindirizza alla pagina delle impostazioni impostando ```window.location.href = "/#/options";```

    Le variabili in Vue sono contenute tra parentesi graffe "{{ }}":
    *  ```{{ infoprogetto }}``` indica di visualizzare il contenuto della variabile "infoprogetto"
    restituita dalla funzione data() del componente vue
    *  ```{{ impostazioni }}``` indica di visualizzare il contenuto della variabile "impostazioni"
    restituita dalla funzione data() del componente vue

    Quando la pagina viene caricata viene eseguita la funzione contenuta nella proprieta' "mounted"
    del componente vue:

    ```js
    var checksize = window.matchMedia("(max-width: 450px)"); // controllo se lo schermo < 450px di larghezza
    if (checksize.matches) {
        // se e' minore di 450px
        this.infoprogetto = "Info progetto"; // cambia il nome del pulsante che va nelle info
    }
    ```
    > "this" permette di controllare/richiamare direttamente la variabile (o funzione)
    > nell'oggetto/componente

    Prima viene verificato se lo schermo ha una grandezza di massimo 450px:
    se la condizione e' vera viene modificata la variabile "infoprogetto" contenuta in "data"
    da "Informazioni progetto" a "Info progetto" permettendo all'intero testo di rimanere nel pulsante

    ```js
    var draw = SVG(document.getElementById("floorplan")); // seleziona elemento dove inserire la mappa
    axios.get("/static/img/planselector.php").then((resp) => {
        // richiede la mappa

        if (boold) {
            console.log(resp);
        }

        draw.svg(resp.data); // disegna/inserisce la mappa

        if (boold) {
            console.log("ora aggiungo i link");
        }

        this.setLinks(); // imposta i link sulla mappa

        if (boold) {
            console.log("Aggiungo letture");
        }

        this.updMap(); // inserisci temperature e umidita' nella mappa

        setInterval(this.updMap, 10000); // aggiorna dopo ogni 10 secondi le rilevazioni sulla mappa

    });
    ```

    Poi vengono effettuate tutte le operazioni relative alla planimetria:

    ```js
    var draw = SVG(document.getElementById("floorplan")); // seleziona elemento dove inserire la mappa
    ```
    Viene definita una variabile che usa svg.js per controllare il contenuto dell'elemento con id "floorplan"

    ```js
    axios.get("/static/img/planselector.php").then((resp) => {})
    ```
    > la variabile "resp" contiene informazioni relative alla risposta della richiesta

    Viene eseguita una GET request con axios.js alla pagina PHP "/static/img/planselector.php"
    e quando riceviamo una risposta (".then()") deve eseguire la funzione contenuta nelle parentesi.

    > Questa funzione contenuta in .then() e' chiamata "arrow function" perche', a differenza delle classiche
    > funzioni javascript definite con la keyword ```function``` (```function nomefunzione(param){}```),
    > usano appunto la freccia ```=>``` ( ```(param1, param2) => {}``` ).

    [Torna su](#sezioni-documentazione)

    ---

    ###### planselector.php

    Lo script PHP prima include ```/static/php/db_connection.php``` per potersi connettere al database.

    Lo script ```db_connection.php```:
    * disabilita la visualizzazione dei warning (verranno gestiti visualizzandoli per poi terminare lo script)
    * viene definita la funzione ```dbconn($dbname)```:

            dbconn($dbname)
            
        Questa funzione si occupa di connettersi al DB, e operare sulla tabella passati come parametri.
        La funzione recupera dal file 'credentials.ini' username e password per accedere al DB in locale.
         
        il parametro verra' usato per accedere al DB.
            
        La funzione restituira' l'oggetto connessione con la connessione avvenuta correttamente

        @since 1.0.0
        @param string $dbname  nome del database
        @return object $conn oggetto connessione (connessione avvenuta con successo)

        
    * viene definita la funzione ```queryToJson($t_mysqli, $t_query)```:

            queryToJson($t_mysqli, $t_query)

        Questa funzione si occupa di eseguire la query e di resituire i dati in formato json.
         
        Esegue la query, ottiene i dati e li inserisce in un array,
        svuota la memoria occupata dal risultato della query e restituisce l'array in formato json

        @since 1.0.0
    
        @param object $t_mysqli oggetto connessione
        @param string $t_query query da eseguire nel database connesso in $t_mysqli
         
        @return string json_encode($data) json del risultato della query

    planselector.php si connette al database, richiama la sua funzione get_map():

        get_map($t_mysqli, $t_dbtable)

    Questa funzione esegue la query per selezionare la mappa selezionata dall'utente.
    
    La funzione esegue con la funzione queryToJson() la query
    per selezionare la mappa e ottiene il JSON,
    converte il JSON ottenuto in array che verra' restituito
    
    @since 1.0.0
    
    @param object $t_mysqli oggetto connessione gia' connesso al DB
    @param string $t_dbtable tabella impostazioni
    
    @return array $array_opts array con la mappa

    Dal return ```Array ( [0] => Array ( [map] => <nome planimetria> ) )``` viene recuperato il nome della planimetria e viene usato dalla funzione join_paths() per creare il percorso teorico del
    file SVG con la planimetria:

        join_paths()
    
    Questa funzione concatena i parametri in un percorso.
    
    La funzione scorre i parametri passati alla funzione,
    se non sono stringhe nulle le aggiunge in un array,
    gli elementi dell'array verranno uniti con il separatore di sistema,
    infine verranno rimossi tutti i separatori di sistema doppi
    
    @since 1.1.0
    
    @param string sono accettati piu' parametri stringhe
    
    @return string percorso ottenuto concatenando i parametri

    Con la funzione file_exists() di PHP si assicura che
    la planimetria sia esistente nella cartella "/static/img/maps",
    se esiste viene verificato il suo mime type per assicurarsi che il file
    sia un file svg, infine viene letto e visualizzato.

    Se il file non esiste o il mime type non corrisponde a "svg"
    viene visualizzato un elemento svg con un testo di errore

    [Torna su](#sezioni-documentazione)

    ---

    Quando la funzione in .then() viene eseguita...

    ```js
    draw.svg(resp.data); // disegna/inserisce la mappa
    ```
    viene usata la variabile legata all'elemento controllato da svg.js per inserire il contenuto
    della GET request (resp.data) nell'elemento stesso.

    ```js
    this.setLinks(); // imposta i link sulla mappa
    ```
    Viene richiamata la funzione setLinks() del componente per 
    rendere la mappa interattiva:

        setLinks()
    Ottiene le stanze con la funzione getLocations() e imposta gli eventi click per andare nei grafici.
    Gli elementi cliccabili avranno una di queste proprieta':
    * id corrispondente alla stanza (area stanza)
    * id corrispondente a "t" + nome della stanza (testo che visualizza temperatura)
    * id corrispondente a "h" + nome della stanza (testo che visualizza umidita')
    * classe corrispondente a "x" + nome della stanza (elementi extra che appartengono alla stanza)

        getLocations()
    Questa funzione estrae tutte le stanze dalla mappa e li restituisce in un array.
    Recupera tutti gli id dei rettangoli nella planimetria.
    I rettangoli devono essere elementi \<rect> con la stringa "rect" contenuta nell'id
    
    ```js
    this.updMap()
    setInterval(this.updMap, 10000)
    ```
    Viene richiamata la funzione updMap() per aggiungere le ultime rilevazioni delle stanze,
    poi viene impostato di richiamare la funzione ogni 10 secondi per mantenere aggiornati i dati
    > updMap() viene richiamato prima di impostare l'intervallo per il funzionamento di setInterval stesso:
    prima vengono attesi i 10 secondi, poi viene richiamata la funzione. Questo significa che i primi
    10 secondi la planimetria rimarrebbe senza rilevazioni

    > ```setInterval(funzione, millisecondi)``` e' il modo corretto di usare setInterval:
    > potrebbe venire naturale pensare di scrivere ```setInterval(funzione(), millisecondi)```. <br>
    > Questo NON porta al risultato desiderato: la funzione verrebbe chiamata direttamente
    > una volta e basta.

        updMap()
    La funzione aggiorna le informazioni sulla planimetria:
    recupera dalla pagina PHP ```/static/php/getlatestdata.php``` le ultime rilevazioni,
    e scorre l'array delle stanze ottenute da getLocations() per visualizzare
    gli ultimi valori di umidita' e temperatura di ogni stanza

    [Torna su](#sezioni-documentazione)

    ---

    ###### getlatestdata.php

    Lo script PHP prima include ```/static/php/db_connection.php``` per potersi connettere al database.

    Lo script ```db_connection.php```:
    * disabilita la visualizzazione dei warning (verranno gestiti visualizzandoli per poi terminare lo script)
    * viene definita la funzione ```dbconn($dbname)```:

            dbconn($dbname)
            
        Questa funzione si occupa di connettersi al DB, e operare sulla tabella passati come parametri.
        La funzione recupera dal file 'credentials.ini' username e password per accedere al DB in locale.
         
        il parametro verra' usato per accedere al DB.
            
        La funzione restituira' l'oggetto connessione con la connessione avvenuta correttamente

        @since 1.0.0
        @param string $dbname  nome del database
        @return object $conn oggetto connessione (connessione avvenuta con successo)

        
    * viene definita la funzione ```queryToJson($t_mysqli, $t_query)```:

            queryToJson($t_mysqli, $t_query)

        Questa funzione si occupa di eseguire la query e di resituire i dati in formato json.
         
        Esegue la query, ottiene i dati e li inserisce in un array,
        svuota la memoria occupata dal risultato della query e restituisce l'array in formato json

        @since 1.0.0
    
        @param object $t_mysqli oggetto connessione
        @param string $t_query query da eseguire nel database connesso in $t_mysqli
         
        @return string json_encode($data) json del risultato della query

    getlatestdata.php imposta il contenuto della pagina a "json",
    si connette al database e richiama la funzione getLatestData()

        getLatestData()
    Questa funzione esegue la query per selezionare le ultime rilevazioni dei singoli nodi.

    La funzione esegue con la funzione queryToJson() la query
    per selezionare le ultime rilevazioni dei singoli nodi (JSON),

    @since 1.0.0
         
    @param object $t_mysqli oggetto connessione gia' connesso al DB
    @param string $t_dbtable tabella da dove prendere rilevazioni
         
    @return string $json ultime rilevazioni

    Query SQL:
    ```sql
    SELECT id, id_node, humidity, celsius_temp -- seleziona questi campi
    FROM `$t_dbtable`                        -- dalla tabella rilevazioni
    WHERE id IN (                            -- dove l'id e' nel record set
        SELECT MAX(id)                       -- degli id massimi
        FROM `$t_dbtable`                    -- dalla tabella rilevazioni
        GROUP BY id_node                     -- per ogni nodo/stanza
    )
    ORDER BY id_node
    ```

    Il json con le ultime rilevazioni viene visualizzato
    
    [Torna su](#sezioni-documentazione)

    ##### Graph

    ![](https://i.imgur.com/WLxOBgX.png)

    graph.js e' la pagina/componente che si occupa di visualizzare i grafici.

    Quando viene visitata la pagina l'html contenuto nella proprieta' "template"
    viene iniettata al posto di ```<router-view></router-view>``` all'interno del container vue.

    Stato "originale" del container:
    ```html
    <!-- Contenitore vue -->
    <div id="app">
        <transition name="slide-fade">
            <!-- Animazione cambio pagine -->
            <router-view></router-view> <!-- Pagina visualizzata -->
        </transition>
    </div>
    ```
    
    Con html iniettato:
    ```html
    <div id="app">
        <div>
            <div class="row mb-0">
                <div class="col-sm-12 col-sm-offset-2 ">
                    <div class="panel panel-primary ">
                        <div class="panel-heading">
                            <div class="center-text-vert">
                                <button type="button" id="backbutton" class="btn btn-sm align-left mb-0 bg-color"> < </button>
                                <h2 class="text-container title center"> Temperatura {{stanza}}</h2>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  
            <div class="graph-container">
                <canvas id="tempgraph"></canvas>
            </div>
                        
            <h2 class="text-container title"> Umidita' {{stanza}}</h2>
            
            <div class="graph-container">
                <canvas id="humgraph"></canvas>
            </div>

            <span class="bg-color" style="display:none"> </span> 
        </div>
    </div>
    ```
    > {{ stanza }} viene riempito dinamicamente dalla proprieta' "stanza" passata del URL <br>
    > ( /graph/:stanza ). Il componente accetta il parametro grazie alla definizione della proprieta' ```props : ["stanza"]```

    In particolare:
    
    ![](/images/graph-temptitle.png)

    ```html
    <div class="row mb-0">
        <div class="col-sm-12 col-sm-offset-2 ">
            <div class="panel panel-primary ">
                <div class="panel-heading">
                    <div class="center-text-vert">
                        <button type="button" id="backbutton" class="btn btn-sm align-left mb-0 bg-color"> < </button>
                        <h2 class="text-container title center"> Temperatura {{stanza}}</h2>   
                    </div>
                </div>
            </div>
        </div>
    </div>
    ```
    Tutto e' contenuto in unico div con classi:
    * ".row" : indica che e' una riga
    * "mb-0" : toglie il margine inferiore

    Dentro al div e' contenuto un altro div che con la classe .col-sm-12 occupa tutta la lunghezza

    Il pulsante ha le classi:
    * "btn" : stile del pulsate
    * "btn" : dimensione del pulsante piu' piccola
    * "align-left" : allinea a sinistra il pulsante
    * "mb-0" : toglie i margini inferiori
    * "bg-color" : colore custom

    Il titolo ha le classi:
    * "text-container": centra verticalmente e orizzontalmente il testo nell'elemento
    * "title" : imposta l'altezza dell'elemento
    * "center" : centra orizzontalmente l'elemento con il titolo 
    (aggiunge margine a destra grande quanto il pulsante)

    ```html
    <div class="graph-container">
        <canvas id="tempgraph"></canvas>
    </div>
    ```
    Viene creato il div contenente il canvas con il grafico della temperatura

    La classe "graph-container" del div imposta la sua altezza

    L'id "tempgraph" viene usato per selezionare il canvas per poterci inserire il grafico

    ```html
    <h2 class="text-container title"> Umidita' {{stanza}}</h2>
    ```
    E' il titolo del grafico delle umidita'
    Le sue classi sono:
    * "text-container": centra verticalmente e orizzontalmente il testo nell'elemento
    * "title" : imposta l'altezza dell'elemento

    ```html
    <div class="graph-container">
        <canvas id="humgraph"></canvas>
    </div>
    ```
    Viene creato il div contenente il canvas con il grafico dell'umidita'

    La classe "graph-container" del div imposta la sua altezza

    L'id "humgraph" viene usato per selezionare il canvas per poterci inserire il grafico

    ```html
    <span class="bg-color" style="display:none"> </span>
    ```
    Questo elemento non e' posizionato nel dom ("display:none")
    ma possiede la classe "bg-color" che definisce i colori custom derivati
    dalla selezione dell'utente

    > Questo elemento viene usato da javascript per recuperare i colori
    > da usare per il grafico. L'elemento era stato creato quando non esisteva il pulsante
    > per tornare indietro: visto che i colori vengono recuperati dal primo elemento
    > che ha la classe "bg-color" (quindi il pulsante) si potrebbe rimuovere lo span.

    ---

    Quando la pagina viene caricata viene eseguita la funzione nella proprieta' "mounted" che
    richiama dall'oggetto "methods" la funzione makeGraphs()
    > Prima viene salvata nella variabile "graphfunc" per poterla usare con setInterval()

        makeGraphs()
    La funzione si occupa di recuperare dalla funzione getGraphColor() 
    il vettore con i valori red, green e blue del colore da usare per i grafici...

        getGraphColor()
    Recupera dall'elemento con classe .bg-color il suo colore di sfondo
    e lo restituisce in un array che contiene i valori red, green e blue.

    ...poi verifica se la funzione e' eseguita quando l'utente e' nella pagina dei grafici
    verificando che l'url contenga "graph"
    > Questo serve per bloccare il setInterval che continua ad aggiornare i grafici anche dopo
    > essere usciti dalla pagina: provocava l'esecuzione multipla della funzione
    > che terminavano solo quando veniva ricaricata la pagina.
    > Ora quando la condizione e' falsa viene richiamato clearInterval()

    recupera dall'URL la stanza attuale e usa axios.js per ottenere le rilevazioni
    dalla pagina php ```/static/php/getdata.php```

    [Torna su](#sezioni-documentazione)

    ---

    ###### getdata.php

    Lo script importa lo script ```db_connection.php``` che:

    * disabilita la visualizzazione dei warning (verranno gestiti visualizzandoli per poi terminare lo script)
    * viene definita la funzione ```dbconn($dbname)```:

            dbconn($dbname)
            
        Questa funzione si occupa di connettersi al DB, e operare sulla tabella passati come parametri.
        La funzione recupera dal file 'credentials.ini' username e password per accedere al DB in locale.
         
        il parametro verra' usato per accedere al DB.
            
        La funzione restituira' l'oggetto connessione con la connessione avvenuta correttamente

        @since 1.0.0                                                                 <br>
        @param string $dbname  nome del database                                     <br>
        @return object $conn oggetto connessione (connessione avvenuta con successo) <br>

        
    * viene definita la funzione ```queryToJson($t_mysqli, $t_query)```:

            queryToJson($t_mysqli, $t_query)

        Questa funzione si occupa di eseguire la query e di resituire i dati in formato json.
         
        Esegue la query, ottiene i dati e li inserisce in un array,
        svuota la memoria occupata dal risultato della query e restituisce l'array in formato json

        @since 1.0.0
    
        @param object $t_mysqli oggetto connessione
        @param string $t_query query da eseguire nel database connesso in $t_mysqli
         
        @return string json_encode($data) json del risultato della query
    
    Imposta il content type a "application/json", poi si connette al database
    usando la funzione dbconn() e richiama la funzione getOptions()

        getOptions()
    Questa funzione si occupa di OTTENERE le OPZIONI dell'utente dalla tabella t_options.

    Esegue l'istruzione SQL per ottenere il json
    delle impostazioni scelte dall'utente:
    * color_scheme: nome del colore selezionato dall'utente
    * min_timestamp: timestamp impostato come data di partenza per la visualizzazione dati
    * max_timestamp: timestamp impostato come data massima per la visualizzazione dati
       
    Infine viene restituito il json.
         
    @since 1.0.0
         
    @return json Opzioni utente da DB

    Il JSON ottenuto viene convertito in array con json_decode()
    da cui vengono recuperati i timestamp minimo e massimo dei dati 
    da visualizzare nel grafico.

    Infine viene richiamata la funzione getData()

        getData($t_mysqli, $t_dbtable, $min_timestamp, $max_timestamp)
    Ottiene tutti o parte dei dati dal DB
         
    Controlla i parametri per eseguire la query attraverso l'oggetto connessione $t_mysqli:
    - se $min_timestamp == 0 e $max_timestamp == 0: prende tutti i dati
    - altrimenti seleziona i dati che hanno timestamp compreso fra i due parametri
    
    Dopo aver ottenuto un array con i dati utili, li "restituisce" sotto forma di json
    
    @since 1.0.0
    
    @see queryToJson($t_mysqli, $query) in 'db_connection.php'
    
    @param object $t_mysqli oggetto connessione
    @param string $t_dbtable nome tabella nel database connesso in $t_mysqli
    
    @param int $min_timestamp timestamp di partenza per selezione dati
    @param int $max_timestamp timestamp massimo per selezione dati

    Il JSON ottenuto viene visualizzato al client che ha eseguito la richiesta
    
    [Torna su](#sezioni-documentazione)

    ----
    
    makeGraphs, appena axios.js riceve la risposta da getdata.php,
    legge il contenuto della risposta (resp.data) una rilevazione alla volta

    Prima viene verificato che l'id del nodo corrisponde al parametro
    nell'URL indicante la stanza di cui visualizzare i grafici,
    se la stanza e l'id node corrispondono viene recuperato
    il timestamp della rilevazione che poi viene passato alla funzione TimestampToDate()

        TimestampToDate(timestamp)
    Questa funzione converte il timestamp passato come parametro in data "umana".
    Per farlo crea una istanza di "Date()" passandogli timestamp * 1000
    > Date si aspetta il timestamp in millisecondi

    e dalla istanza di Date vengono recuperate tutte le informazioni
    per formare una stringa con la data con il formato "americano": "mm/gg/yyyy hh:mm".
    Questa stringa viene infine restituita

    makeGraphs poi inserisce dei a 3 vettori separati la stringa con la data,
    l'umidita' e la temperatura.

    Vengono creati 2 oggetti per creare i grafici:
    ```js
    var charttemps = {
        labels: v_timestamps, // timestamp asse x
        datasets: [{
            backgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)', // colore sfondo grafico
            borderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)', // colore bordo del grafico
            hoverBackgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',    // colore sfondo on hover ("passandoci sopra")
            hoverBorderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',    // colore bordo on hover  ("passandoci sopra")
            data: v_temps // temperature asse y
        }],
    };
    ```
    Dove la proprieta':
    * "labels" e' il vettore con i dati da visualizzare sull'asse x, il vettore con i timestamp convertiti in data
    * "datasets" e' un vettore di oggetti da visualizzare sul grafico sull'asse y
        * Il grafico visualizza i dati nel vettore "data": le temperature in questo caso 
        (il funzionamento e' analogo per le umidita')
        * "backgroundColor" e' il colore dello sfondo: e' il colore selezionato dall'utente con opacita' 0.75 (75% visibile)
        * "borderColor" e' il colore del bordo del grafico: e' il colore selezionato dall'utente con opacita' 0.75 (75% visibile)
        * "hoverBackgroundColor" e' il colore dello sfondo al passaggio del mouse: e' il colore selezionato dall'utente con opacita' 1 (100% visibile)
        * "hoverBorderColor" e' il colore del bordo al passaggio del mouse: e' il colore selezionato dall'utente con opacita' 1 (100% visibile)
    
    ```js
    var ctxtemps = document.getElementById("tempgraph"); // canvas grafico temperature
    ```
    > la stessa cosa viene fatta anche per il grafico dell'umidita'

    Poi vengono recuperati i canvas in cui visualizzare i grafici

    ```js
    // creo oggetto grafico delle temperature
    var tempGraph = new Chart(ctxtemps, { // nel canvas temperature creo grafico
        type: 'line',     // tipo "linea"
        data: charttemps, // dati temperature
        options: {
            responsive: true,           // si adatta allo schermo
            maintainAspectRatio: false, // rispetta altezza del div contenente il canvas
            legend: {
                display: false // Toglie la legenda ( non visualizza informazioni utili... )
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel; // toglie legenda
                    }
                }
            },
            animation: {
                duration: 0 // "disabilita" le animazioni (brutto effetto "jump" del grafico a causa update del grafico frequente)
            }
        }
    });
    ```
    e infine vengono creati i grafici:
    viene creata un'istanza per grafico che richiede come 
    primo parametro l'elemento in cui inserire il grafico
    e come secondo parametro le proprieta'

    Lista delle proprieta':
    * "type": tipo di grafico
    * "data": oggetto creato in precedenza con i dati da visualizzare
    * "options" oggetto con le opzioni:
        * "responsive" rende responsivo il grafico
        * "maintainAspectRatio" mantiene le proporzioni tra altezza e lunghezza
        * "legend" oggetto con le proprieta' della legenda:
            * "display" bool che permette di nascondere/visualizzare la legenda
        * "tooltips" oggetto con proprieta' dei tooltip (messaggi che appaiono "on hover"):
            ```js
            callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel; // toglie legenda
                    }
                }
            ```
            permette di togliere la legenda
        * "animation" oggetto che permette di configurare le animazioni:
            * "duration" indica la durata dell'animazione
        > Le animazioni sono state rimosse perche' vengono eseguite
        > ad ogni aggiornamento del grafico e rendono frustrante la lettura dei dati:
        > l'animazione "solleva" i punti con i dati a partire dall'asse x
        > e la loro posizione si resetta ad ogni inizio animazione
    
    ```js
    tempGraph.update(); // Per aggiornare i dati del grafico ad ogni richiesta
    ```
    Indica al grafico che verra' aggiornato da nuovi dati

    ---

    Quando la funzione che popola i grafici e' terminata
    per la prima volta viene richiamata la funzione
    goBack() per permettere
    all'utente di tornare alla pagina principale

        goBack()
    Questa e' tutto il codice della funzione:
    ```js
    goBack: function () {
            /* Imposta touch per tornare indietro */
            if (boold) {
                console.log("aggiungo il touch");
            }

            /* Pulsante per tornare indietro */
            var backbutton = document.getElementById("backbutton");
            backbutton.addEventListener("click", function () {
                window.location.href = "/#/";
            })

            var hammertime = new Hammer(document.getElementById('app'));
            hammertime.on('swipe', function (ev) {
                if (boold) {
                    console.log("delta X: ", ev.deltaX);
                }

                if (ev.deltaX > 100) {
                    // se lo swipe verso sinistra di 100px
                    window.location.href = "/#/"; // torna pagina precedente/principale
                }
            });
        }
    ```

    In particolare:
    ```js
    var backbutton = document.getElementById("backbutton");
        backbutton.addEventListener("click", function () {
            window.location.href = "/#/";
        })
    ```
    la variabile backbutton contiene l'elemento con id "backbutton",
    cioe' il pulsante che serve per tornare indietro,
    al quale viene aggiunto un nuovo evento da ascoltare ("addEventListener"): <br>
    quell'evento da ascoltare e' il click.
    Quando viene premuto il pulsante viene eseguita la funzione
    che imposta window.location.href (URL attuale) a "/#/" .
    Quindi, se la pagina viene richiesta dal raspberry stesso, rimanda a http://localhost/#/, cioe' la home.

    Poi viene usato hammer.js per rilevare lo swipe:
    ```js
    var hammertime = new Hammer(document.getElementById('app'));
            hammertime.on('swipe', function (ev) {
                if (boold) {
                    console.log("delta X: ", ev.deltaX);
                }

                if (ev.deltaX > 100) {
                    // se lo swipe verso sinistra di 100px
                    window.location.href = "/#/"; // torna pagina precedente/principale
                }
            });
    ```
    La prima istruzione definisce un'istanza di hammer.js a
    cui si passa l'elemento da ascoltare (l'elemento con id="app", quindi il container vue, tutta la pagina)

    mentre l'istruzione successiva dice che quando ("on") avviene uno swipe ("swipe")
    esegui la funzione che prende come parametro ev, l'evento stesso con le sue proprieta'.

    La proprieta' da osservare e' deltaX, cioe' la quantita' di pixel
    con cui il dito si e' mosso da sinistra a destra ("X" = asse x) o viceversa.

    Quando la quantita' di pixel e' maggiore di 100 imposta window.location.href (URL attuale) a "/#/".

    ---

    Per ultimo viene eseguito setInterval per aggiornare
    i grafici ogni 10 secondi.

    setInterval restituisce un id che puo' essere usato
    da clearInterval per fermare il "loop",
    questo valore viene salvato in "intervalId" 

    [Torna su](#sezioni-documentazione)

    ##### Options

    ![](https://i.imgur.com/YYGBdPq.png)
    ![](https://i.imgur.com/UwtuSxs.png)

    options.js e' la pagina/componente che contiene le impostazioni, permette di:
    * selezionare il range timestamp delle rilevazioni da visualizzare nei grafici
    * selezionare il colore dell'interfaccia
    * selezionare la planimetria
    * vedere lo spazio libero e occupato
    * vedere l' RSSI dei nodemcu

    TODO: documentare pagina options
    
    [Torna su](#sezioni-documentazione)

    ##### Infos

    ![](https://i.imgur.com/HCK1New.png)

    infos.js e' la pagina/componente che contiene le informazioni relative al progetto.

    Quando viene visitata la pagina l'html contenuto nella proprieta' "template"
    viene iniettata al posto di ```<router-view></router-view>``` all'interno del container vue.

    La maggior parte del componente e' composta da html nella proprieta' "template".

    Quando viene caricata la pagina viene eseguita la funzione in "mounted":

    ```js
    this.goBack(); // imposta touch
    ```

    La prima riga richiama la funzione goBack() in "methods" per permettere
    all'utente di tornare alla pagina principale

        goBack()
    Questa e' tutto il codice della funzione:
    ```js
    goBack: function () {
            /* Imposta touch per tornare indietro */
            if (boold) {
                console.log("aggiungo il touch");
            }

            /* Pulsante per tornare indietro */
            var backbutton = document.getElementById("backbutton");
            backbutton.addEventListener("click", function () {
                window.location.href = "/#/";
            })

            var hammertime = new Hammer(document.getElementById('app'));
            hammertime.on('swipe', function (ev) {
                if (boold) {
                    console.log("delta X: ", ev.deltaX);
                }

                if (ev.deltaX > 100) {
                    // se lo swipe verso sinistra di 100px
                    window.location.href = "/#/"; // torna pagina precedente/principale
                }
            });
        }
    ```

    In particolare:
    ```js
    var backbutton = document.getElementById("backbutton");
        backbutton.addEventListener("click", function () {
            window.location.href = "/#/";
        })
    ```
    la variabile backbutton contiene l'elemento con id "backbutton",
    cioe' il pulsante che serve per tornare indietro,
    al quale viene aggiunto un nuovo evento da ascoltare ("addEventListener"): <br>
    quell'evento da ascoltare e' il click.
    Quando viene premuto il pulsante viene eseguita la funzione
    che imposta window.location.href (URL attuale) a "/#/" .
    Quindi, se la pagina viene richiesta dal raspberry stesso, rimanda a http://localhost/#/, cioe' la home.

    Poi viene usato hammer.js per rilevare lo swipe:
    ```js
    var hammertime = new Hammer(document.getElementById('app'));
            hammertime.on('swipe', function (ev) {
                if (boold) {
                    console.log("delta X: ", ev.deltaX);
                }

                if (ev.deltaX > 100) {
                    // se lo swipe verso sinistra di 100px
                    window.location.href = "/#/"; // torna pagina precedente/principale
                }
            });
    ```
    La prima istruzione definisce un'istanza di hammer.js a
    cui si passa l'elemento da ascoltare (l'elemento con id="app", quindi il container vue, tutta la pagina)

    mentre l'istruzione successiva dice che quando ("on") avviene uno swipe ("swipe")
    esegui la funzione che prende come parametro ev, l'evento stesso con le sue proprieta'.

    La proprieta' da osservare e' deltaX, cioe' la quantita' di pixel
    con cui il dito si e' mosso da sinistra a destra ("X" = asse x) o viceversa.

    Quando la quantita' di pixel e' maggiore di 100 imposta window.location.href (URL attuale) a "/#/".

    ---

    ```js
    var checksize = window.matchMedia("(max-width: 400px)"); // controllo se larghezza schermo < 400px 
    if (checksize.matches) {
        // se e' minore di 400px
        this.title = "Progetto";   // cambio titolo
        this.slogan = "100 + 100"; // e slogan (andrebbero fuori pagina)
    }
    ```
    > "this" permette di controllare/richiamare direttamente la variabile (o funzione)
    > nell'oggetto/componente

    Prima viene verificato se lo schermo ha una grandezza di massimo 400px:
    se la condizione e' vera viene modificata la variabile "title" contenuta in "data"
    da "Progetto 100+100" a "Progetto" e 
    la variabile "slogan" da "Temperatura e umidita' al 100% sotto controllo" a "100+100" 
    permettendo all'intero testo di rimanere all'interno della pagina

    La variabile "persone" contenente "Classe 4AT, anno scolastico 2018/2019" viene usata in fondo alla pagina.

    [Torna su](#sezioni-documentazione)

#### Inizializzazione Vue Router e Vue
6. Gli oggetti/pagine vengono importati da Vue Router

    ```js
    const routes = [
        // lista di routes/pagine
        { path: '/', component: Home, data:true },                 // pagina principale   -> Home
        { path: '/graph/:stanza', component: Graph, props: true }, // pagina grafici      -> Graph, accetta proprieta'/parametri
        { path: '/options', component: Options },                  // pagina impotazioni  -> Options
        { path: '/infos', component: Infos }                       // pagina informazioni -> Infos
    ]
    
    const router = new VueRouter({
        routes // routes configurate per router
    })
    ```

    Viene definita come costante la variabile routes, un vettore
    che contiene un oggetto per ogni pagina.

    Ogni oggetto ha la proprieta':
    * "path" : route della pagina ( "http://www." + dominio + path)
    * "component" : componente, oggetto della pagina
    
    La pagina dei grafici e' predisposta per accettare proprieta':
    * "props" : booleano, se vero e' possibile passare al componente
    un valore attraverso parametri URL (:variabile, in questo caso :stanza)
    > Non viene usata, veniva usata in precedenza ma e' stata sostituita
    > con una lettura diretta del URL perche' sembrava la causa di un bug visivo dei grafici.
    > Successivamente il problema si era ripresentato, la causa erano i setInterval
    > che facevano get request continui per aggiornare i grafici delle varie stanze,
    > cambiare stanza non fermava il vecchio setInterval: apparentemente i dati
    > venivano visualizzati nel grafico anche se veniva fatto un controllo dell'id_node.
    > Essendo una SPA la pagina potrebbe essere rimasta attiva, rendendo vera la condizione,
    > mescolando i dati. Il problema dovrebbe essere risolto

    Il vettore routes viene passato ad un'istanza dell'oggetto VueRouter.
    Questo oggetto e' definito nella variabile router

[Torna su](#sezioni-documentazione)

7. Vue Router viene passato a Vue e viene creata l'istanza Vue
    
    ```js
    const app = new Vue({
        router            // uso router "router" in vue
    }).$mount('#app')     // oggetto vue -> <div id="app"> </div>
    ```

    Viene definita la costante app come istanza di Vue a cui viene passato il vue router
    e con ```$mount('#app')``` gli si specifica di usare come container vue l'elemento che ha come id ("#") "app"

[Torna su](#sezioni-documentazione)

### Descrizione per componente

TODO: documentazione per componente

## Requisiti
* apache e PHP
* MySQL con file SQL (```/raspberry/db100_100.sql```) importato