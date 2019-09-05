/** 
 * Script che definisce componente Vue con la pagina delle impostazioni
 * 
 * @since 01_01
 * @author Stefano Zenaro (https://github.com/mario33881)
 * @license MIT
 * @todo Usare direttive vue per i timestamp delle rilevazioni
*/

const Options = {
    name: "options", // nome componente
    template: `
    <div class="container">
        
        <!-- Container con titolo e pulsante per tornare indietro -->
        <div class="row mb-0">
            <div class="col-sm-12 col-sm-offset-2 ">
                <div class="panel panel-primary ">
                    <div class="panel-heading">
                        <div class="center-text-vert">
                            <button type="button" id="backbutton" class="btn btn-sm align-left mb-0 bg-color"> < </button>
                            <h1 class="text-container title center"> Opzioni </h1>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <hr>
        
        <!-- Sezione con opzioni timestamp grafici -->
        <h4 class="text-container"> Visualizzazione grafici</h4>
        
        <!-- container che spiega cosa si puo' fare in questa sezione -->
        <div class="container text-center">
            <!-- Qui vengono visualizzati tutti i messaggi errori/successo, ecco cosa viene creato con JS: -->
            <!-- <div id="alerts-container" class="fade show text-center" role="alert"></div> -->

            <span id="title"></span>
                                        
            <!-- testo -->
            <p>Da qui puoi selezionare quale parte di dati visualizzare nei grafici:</p>
            <ul>
                <li>Scegli se voler visualizzare tutti i dati o solo una parte</li>
                <li>se si vuole visualizzare una parte, selezionare date e tempi di limitazione</li>
            </ul>
        </div>

        <!-- container switch -->
        <div class="container text-center">
            <!-- Switch -->
            <div class="switch">
                <label>
                    Tutto
                        <input v-on:click="isswitched = !isswitched" id="mySwitch" type="checkbox">
                        <span class="lever"></span>
                    Parziale
                </label>
            </div>
        </div>

        <!-- Container con i datepicker e timepicker -->
        <div v-show="isswitched" class="container">
            <!-- Data iniziale -->
            <h3>Da:</h3>
                    
            <!-- Selezione giorno-->
            <div class="md-form">
                <input type="text" id="fromdate" class="form-control datepicker">
                <label for="fromdate">Seleziona giorno</label>
            </div>

            <!-- Selezione ore minuti -->
            <div class="md-form" style="touch-action: none;">
                <input type="text" id="fromtime" class="form-control timepicker">
                <label for="fromtime">Seleziona ore/minuti</label>
            </div>

            <!-- Data finale -->
            <h3>A:</h3>
                                        
            <!-- Selezione giorno-->
            <div class="md-form">
                <input type="text" id="todate" class="form-control datepicker">
                <label for="todate">Seleziona giorno</label>
            </div>

            <!-- Selezione ore minuti -->
            <div class="md-form" style="touch-action: none;">
                <input type="text" id="totime" class="form-control timepicker">
                <label for="totime">Seleziona ore/minuti</label>
            </div>

        </div>

        <!-- container con pulsante submit timestamp -->
        <div class="container text-center">
            <button id="submit" type="button" class="btn bg-color">Conferma modifiche</button>
        </div>

        <!-- Fine sezione timestamp -->

        <hr>

        <!-- Sezione colore UI -->

        <h4 class="text-container">Colore interfaccia</h4>
        <span id="colortitle"></span>

        <p class="text-center"> Premi sul quadrato per selezionare il colore da usare per l'interfaccia</p>
        
        <!-- Container quadrati con i colori selezionabili -->
        <div class="container">
            <div class="row">
                <div v-for="color in colors" style="" class="col-2">
                    <div v-on:click="sendColor(color.color_name)" class="square" v-bind:style="{ 'background-color': color.color_hex }">
                        <div class="content">{{ checkScreen(color.color_name) }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- container pulsante che mostra altri colori -->
        <div class="container text-center">
            <button id="submit" type="button" v-on:click="moreColors" class="btn bg-color">Mostra altri colori</button>
        </div>
        
        <!-- Fine sezione colore UI -->

        <hr>

        <!-- Sezione selezione planimetria -->

        <h4 class="text-container">Tipo planimetria</h4>
        <p class="text-center"> Premi sulla planimetria che vorresti nella pagina principale</p>
        <div class="row">
            <div v-for="(map, index) in maps" v-bind:class="mapclass(map)">
                <div v-on:click="sendmap(map)" v-html="mapcontent(map)"></div>
            </div>
        </div>
        
        <!-- Fine sezione selezione planimetria -->
        
        <hr>
        
        <!-- Sezione grafico con spazio disco sistema -->
        <h4 class="text-container">Spazio disco</h4>
        
        <!-- container grafico -->
        <div class="container">
            <canvas id="diskgraph"></canvas>
        </div>
                
        <!-- Fine sezione grafico spazio disco -->

        <hr>
        
        <!-- Sezione visualizzazione RSSI -->
        <h4 class="text-container">Potenza ricevuta dai nodi</h4>
        
        <!-- tabella con RSSI-->
        <table class="table table-borderless">
            <!-- Tracciato record -->
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Nodo</th>
                    <th scope="col">RSSI [dBm]</th>                
                </tr>
            </thead>

            <!-- Record -->
            <tbody id="rssitable">
                <tr v-for="data in nodes_data">
                    <td><span v-html="rssiimg(data.rssi)"></span></td><td>{{data.id_node}}</td><td>{{data.rssi}}</td>
                </tr>
            </tbody>
        </table>

        <!-- Fine sezione visualizzazione RSSI -->
    </div>`,
    methods: {
        // ------------- TODO: SOSTITUISCI CON v-on:change ------------------------
        changeFromdate: function () {
            /** 
             * Imposta evento "change" sull'elemento #fromdate per salvare la data "da" in input
             * 
             * @todo Usare direttiva vue e eliminare la funzione:
             *       > v-on:change="fromdate=$event.target.value" sull'elemento dovrebbe bastare
             * @since 01_01
            */

            var data = this; // salvo oggetto componente per modificare dati in data
            var fromdate_el = document.getElementById("fromdate"); // seleziona elemento #fromdate

            fromdate_el.addEventListener("change", function () {
                // quando cambia l'input
                if (boold) {
                    console.log("fromdate: " + fromdate_el.value);
                }

                data.fromdate = fromdate_el.value; // imposta in data del componente il nuovo valore nel <input>
            })
        },
        changeFromtime: function () {
            /** 
             * Imposta evento "change" sull'elemento #fromtime per salvare ora/minuti "da" in input
             * 
             * @todo Usare direttiva vue e eliminare la funzione:
             *       > v-on:change="fromtime=$event.target.value" sull'elemento dovrebbe bastare
             * @since 01_01
            */

            var data = this; // salvo oggetto componente per modificare dati in data
            var fromtime_el = document.getElementById("fromtime"); // seleziona elemento #fromtime

            fromtime_el.addEventListener("change", function () {
                // quando cambia l'input
                if (boold) {
                    console.log("fromtime: " + fromtime_el.value);
                }

                data.fromtime = fromtime_el.value; // imposta in data del componente il nuovo valore nel <input>
            })
        },
        changeTodate: function () {
            /** 
             * Imposta evento "change" sull'elemento #todate per salvare la data "a" in input
             * 
             * @todo Usare direttiva vue e eliminare la funzione:
             *       > v-on:change="todate=$event.target.value" sull'elemento dovrebbe bastare
             * @since 01_01
            */

            var data = this; // salvo oggetto componente per modificare dati in data
            var todate_el = document.getElementById("todate"); // seleziona elemento #todate

            todate_el.addEventListener("change", function () {
                // quando cambia l'input
                if (boold) {
                    console.log("todate: " + todate_el.value);
                }

                data.todate = todate_el.value; // imposta in data del componente il nuovo valore nel <input>
            })
        },
        changeTotime: function () {
            /**
             * Imposta evento "change" sull'elemento todate per salvare ora/minuti "a" in input 
             * 
             * @todo Usare direttiva vue e eliminare la funzione:
             *       > v-on:change="totime=$event.target.value" sull'elemento dovrebbe bastare
             * @since 01_01
            */

            var data = this; // salvo oggetto componente per modificare dati in data
            var totime_el = document.getElementById("totime"); // seleziona elemento #totime

            totime_el.addEventListener("change", function () {
                // quando cambia l'input
                if (boold) {
                    console.log("totime: " + totime_el.value);
                }

                data.totime = totime_el.value; // imposta in data del componente il nuovo valore nel <input>
            })
        },
        // ------------- /TODO: SOSTITUISCI CON v-on:change ------------------------
        showAlert: function (t_text, t_status) {
            /** 
             * Questa funzione visualizza l'alert/messaggio con la struttura :
             * <div id="alerts-container" class="fade show text-center alert alert-<$ t_status $>" role="alert"> <$ t_text $> </div>
             * 
             * Viene creato un div con id "alerts-container", attributo "role" = "alert", 
             * classi "fade show text-center fixed-top alert" 
             * e infine una classe "alert-" + t_status che dipende dal parametro passato alla funzione
             * 
             * @param {string} t_text Testo da visualizzare nell'alert
             * @param {string} t_status Status di un'operazione, modifica colore alert
             * @example 
             * // crea elemento <div id="alerts-container" 
             * // class="fade show text-center alert alert-success" role="alert"> 
             * // questo e' un testo di prova 
             * // </div> 
             * // prima dell'elemento #title
             * showAlert("questo e' un testo di prova", "success")
             * @since 01_01 
            */

            alert_div = document.createElement("div"); // creo un div contenente l'alert
            alert_div.id = 'alerts-container';         // id = "alerts-container"
            alert_div.setAttribute('role', 'alert');   // role = "alert"
            alert_div.className = "fade show text-center fixed-top alert alert-" + t_status // "success" / "warning"

            alert_div.innerText = t_text; // imposta testo alert passato come parametro

            $("#title").before(alert_div); // inserisce alert prima dell'elemento "#title"

            if (t_status != "danger"){
                // non chiudere il messaggio in caso di errore (ex. se errore di connessione al DB)
                setTimeout(() => {
                    $(".alert").alert('close'); // chiudi/rimuovi alert
                }, 3000);                       // dopo 3000 millisecondi -> 3 secondi
            }
        },
        sendTimestamp: function () {
            /**
             * Manda il timestamp nelle impostazioni sul DB
             * 
             * Se isswitched e' falso significa che
             * lo switch non e' attivo, quindi l'utente vuole
             * vedere tutti i dati delle rilevazioni
             * quindi viene fatta una GET request
             * alla pagina /static/php/sendopt.php
             * con mintime = 0 e maxtime = 0.
             * 
             * Se lo switch e' attivo
             * l'utente vuole mandare un range preciso di timestamp:
             * viene ottenuto il timestamp dai datepicker
             * > Date.parse() restituisce il timestamp in millisecondi, 
             * > il risultato viene diviso per 1000
             * 
             * e i timestamp dei timepicker vengono ottenuti usando
             * la funzione timeToTimestamp() definita nello script "/static/js/timestamp/t2ts.js"
             * 
             * Il timestamp iniziale e finale vengono calcolati sommando
             * i timestamp dei datepicker e dei timepicker.
             * 
             * Viene verificato che entrambe i valori non siano nulli:
             * se sono nulli viene creato un alert con showAlert() indicando l'errore all'utente
             * 
             * Poi viene verificato che il timestamp iniziale sia minore di quello finale:
             * se non e' così vuol dire che l'utente ha invertito le date
             * e viene creato un alert di errore con showAlert()
             * 
             * Se le due condizioni sopra non sono vere viene inviata una GET request
             * a "/static/php/sendopt.php" che ha come mintime il timestamp iniziale
             * e maxtime il timestamp finale
             * 
             * @todo Usare POST request al posto della GET request
             * @todo Gestire errori durante request
             * @since 01_01
            */

            var data = this; // salvo this dentro a data
            if (data.isswitched) {
                // switch attivo -> dati parziali
                var fromdateVal = Date.parse(data.fromdate) / 1000; // vue data "fromdate" -> timestamp [ms] -> timestamp [s]
                var fromtimeVal = timeToTimestamp(data.fromtime); // usa funzione in "/static/js/timestamp/t2ts.js" per convertire vue data "fromtime" "hh:mm tt" -> secondi

                var todateVal = Date.parse(data.todate) / 1000; // vue data "todate" -> timestamp [ms] -> timestamp [s]
                var totimeVal = timeToTimestamp(data.totime); // usa funzione in "/static/js/timestamp/t2ts.js" per convertire vue data "totime" "hh:mm tt" -> secondi

                var fromtimestamp = fromdateVal + fromtimeVal; // timestamp iniziale
                var totimestamp = todateVal + totimeVal;       // timestamp finale

                if (isNaN(fromtimestamp) || isNaN(totimestamp)) {
                    // se sono nulli -> campi non compilati
                    if (boold) {
                        console.log("Non hai inserito tutti i dati");
                    }

                    this.showAlert("Non sono stati compilati tutti i campi", "warning");
                }
                else if (fromtimestamp >= totimestamp) {
                    // data "da" dopo data "a" (ex. dal 2 febbraio 2019 al 1 gennaio 2019)
                    if (boold) {
                        console.log("fromtimestamp > totimestamp");
                    }

                    this.showAlert("Hai inserito data iniziale maggiore data finale", "warning");
                }
                else {
                    // tutto corretto, mando la richiesta
                    axios.get("/static/php/sendopt.php?mintime=" + fromtimestamp + "&maxtime=" + totimestamp).then((resp) => {
                        if (boold) {
                            console.log("Verranno visualizzati dati parziali");
                        }

                        this.showAlert("Verranno visualizzati i dati parziali", "success");
                    })
                }

            }
            else {
                // switch non attivo -> dati completi
                axios.get("/static/php/sendopt.php?mintime=0&maxtime=0").then((resp) => {
                    if (boold) {
                        console.log("Verranno visualizzati tutti i dati");
                    }

                    this.showAlert("Verranno visualizzati tutti i dati", "success");
                })
            }
        },
        goBack: function () {
            /**
             * Questa funzione aggiunge gli eventi per tornare alla pagina principale: 
             * - clic del pulsante #backbutton 
             * - touch alla pagina (swipe verso sinistra)
             * 
             * Viene richiamata da mounted()
             * @since 01_01
            */

            if (boold) {
                console.log("aggiungo il touch");
            }

            // Evento pulsante per tornare indietro
            var backbutton = document.getElementById("backbutton");  // seleziona pulsante

            backbutton.addEventListener("click", function () {       // aggiungi evento "click"
            /* Torna alla pagina principale */
                window.location.href = "/#/";                        // che torna alla home
            })

            // evento swipe per tornare indietro
            var hammertime = new Hammer(document.getElementById('app'));  // oggetto Hammer su elemento #app -> tutta la pagina

            hammertime.on('swipe', function (ev) {
                /**
                 * Viene aggiunto l'evento "swipe"
                 * all'elemento legato all'oggetto Hammer (#app)
                 * 
                 * @param {object} ev oggetto con proprieta' relative all'evento
                 * @since 01_01
                */

                if (boold) {
                    console.log("delta X: ", ev.deltaX);
                }

                if (ev.deltaX > 100) {
                    // se lo swipe verso sinistra di 100px
                    window.location.href = "/#/"; // torna pagina precedente/principale
                }
            });
        },
        makeRssiTable: function () {
            /**
             * Ottiene json RSSI e lo memorizza nella variabile nodes_data in "data" del componente 
             * (se non ci sono errori di connessione al DB) 
             * 
             * La funzione esegue una GET request alla pagina
             * "/static/php/getrssi.php" per ottenere in JSON
             * i valori RSSI per ogni nodo
             * 
             * @todo Dividere il return dalla visualizzazione:
             *       attualmente PHP restituisce un elemento SVG
             *       con il testo relativo all'errore. (se presente)
             *       PHP dovrebbe preoccuparsi solamente
             *       di restituire l'errore al client,
             *       il client pensera' alla visualizzazione 
             * @since 01_01
            */

            axios.get("/static/php/getrssi.php").then((resp) => {
                if (boold) {
                    console.log("Ho ricevuto:");
                    console.log(resp.data);
                }
                
                if (JSON.stringify(resp.data).search("<svg") != -1){
                    this.nodes_data = [];
                }
                else{
                    this.nodes_data = resp.data; // salva RSSI in "data"                
                }
            })
        },
        rssiimg: function (rssi) {
            /**
             * Funzione richiamata nel v-for nella sezione
             * della visualizzazione dei RSSI 
             * per cambiare immagine in base al livello di potenza del segnale
             * 
             * La funzione restituisce una stringa contenente
             * l'elemento <img> che punta al corretto documento SVG
             * e la direttiva v-html si occupa di usarlo nell'interfaccia
             * 
             * @param {integer} rssi Valore del livello di potenza del segnale ricevuto
             * @return {string} imgtag Elemento <img> con src che varia in base a rssi
             * @since 01_01
            */

            imgtag = "<img class='img-fluid' ";
            if (rssi > -60) {
                imgtag += "src='/static/img/rssi/green.svg'>";
            }
            else if (rssi > -70) {
                imgtag += "src='/static/img/rssi/light-green.svg'>";
            }
            else if (rssi > -80) {
                imgtag += "src='/static/img/rssi/yellow.svg'>";
            }
            else if (rssi > -90) {
                imgtag += "src='/static/img/rssi/red.svg'>";
            }
            else {
                imgtag += "src='/static/img/rssi/off.svg'>";
            }
            return imgtag;
        },
        spaceOnDisk: function () {
            /** 
             * Visualizza grafico dello spazio su disco
             * 
             * La funzione esegue una GET request alla pagina
             * "/static/php/diskinfo.php" per ottenere il JSON con
             * le informazioni relative allo spazio libero/occupato,
             * seleziona l'elemento che conterra' il grafico,
             * divide le unita' di misura dai valori
             * e infine viene creato con chart.js il grafico
             * a ciambella 
             * (colore rosso/rosa per spazio libero,
             *  azzurro spazio occupato,
             *  legenda che visualizza l'unita' di misura di entrambe i valori
             *  )
             * 
             * @since 01_01
             * @todo Gestire errori durante GET request
            */

            axios.get("/static/php/diskinfo.php").then((resp) => {
                if (boold) {
                    console.log("Ho ricevuto queste informazioni disco:");
                    console.log(resp.data);
                }

                // elemento con il grafico
                var ctx = document.getElementById("diskgraph");

                // valori recuperati dalla risposta
                var freespace = resp.data.freespace;         // spazio libero
                var occupiedspace = resp.data.occupiedspace; // spazio occupato

                // unita' misura
                var freespace_meas = freespace.split(" ")[1];
                var occupiedspace_meas = occupiedspace.split(" ")[1];

                // valori misurati
                var freespace_val = freespace.split(" ")[0];
                var occupiedspace_val = occupiedspace.split(" ")[0];

                var myDoughnutChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ["Spazio libero [" + freespace_meas + "]", "Spazio occupato [" + occupiedspace_meas + "]"],
                        datasets: [{

                            data: [
                                parseFloat(freespace_val),      // converti in float lo spazio libero
                                parseFloat(occupiedspace_val)], // converti in float spazio occupato
                            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"] // colori spicchi grafico
                        }]
                    }
                });
            })
        },
        getColors: function (num) {
            /**
             * Ottiene tanti colori quanti sono specificati dal parametro num 
             * (se non ci sono errori di connessione al DB)
             * 
             * La funzione esegue una GET request per ottenere
             * il JSON con un certo numero di colori 
             * (parametro "n" indica il numero di colori desiderato)
             * 
             * Se la risposta contiene un elemento SVG significa 
             * che c'e' stato un errore di connessione al database,
             * altrimenti il JSON viene salvato nella variabile colors.
             *  
             * @param {integer|string} num numero di colori da visualizzare
             * @todo Se c'e' un errore PHP dovrebbe restituire solo quello
             *       e la frontend si occupera' di visualizzarlo.
             *       Attualmente PHP restituisce un SVG con l'errore di connessione al DB
             * @since 01_01
            */

            axios.get("/static/php/getcolors.php?n=" + num).then(resp => {
                if (boold) {
                    console.log("Ho ricevuto questi colori:");
                    console.log(resp.data);
                }

                if (JSON.stringify(resp.data).search("<svg") != -1){
                    this.colors = [];
                    this.showAlert(resp.data.replace(/.*(svg>)/, ""), "danger")
                }
                else{
                    this.colors = resp.data; // salva in "data" i colori
                }
            })
        },
        moreColors: function () {
            /** 
             * Permette di visualizzare altri 12 colori ogni volta che il pulsante viene premuto
             * 
             * La funzione incrementa di 12 la variabile "num" in "data"
             * e poi passa la variabile alla funzione getColors()
             * per ottenere quel numero di colori da visualizzare
             * nell'interfaccia
             *  
             * @see getColors(num) Definisce in "colors" il JSON con i colori selezionabili 
             * @since 01_01
            */

            if (boold) {
                console.log("Pulsante 'altri colori' premuto");
            }

            this.num = this.num + 12; // incrementa di 12 i colori da visualizzare
            this.getColors(this.num); // richiedi i colori nuovi per visualizzarli
        },
        sendColor: function (color) {
            /**
             * Un quadrato con il colore e' stato premuto -> mandalo al DB
             * 
             * La funzione esegue una GET request alla pagina "/static/php/sendcolor.php"
             * per mandare il colore selezionato dall'utente alla backend.
             * > "color" e' il nome del parametro dello script PHP
             * 
             * @since 01_01
             * @todo Usare showAlert() per creare l'alert 
             *       (non era stata usata per visualizzare l'alert e poi aggiornare la pagina, 
             *        ma e' comunque possibile fare entrambe le cose richiamando la funzione)
             * @todo Usare POST request al posto di GET request
             * @todo Gestire errori durante GET request
            */

            if (boold) {
                console.log("Hai cliccato il colore ", color);
            }

            axios.get("/static/php/sendcolor.php?color=" + color).then(resp => {
                if (boold) {
                    console.log("Colore inviato!");
                }
            })

            alert_div = document.createElement("div"); // creo un div contenente l'alert
            alert_div.id = 'alerts-container';         // gli do id "alerts-container"
            alert_div.setAttribute('role', 'alert');   // role = "alert"
            alert_div.className = "fade show text-center alert alert-success fixed-top" // aggiungo classi per alert

            // imposto testo dentro alert
            alert_div.innerText = "Colore " + color + " impostato con successo, la pagina si ricarichera' automaticamente in pochi secondi";

            $("#colortitle").before(alert_div); // inserisco alert prima dell'elemento "#colortitle"

            setTimeout(() => {
                $(".alert").alert('close'); // chiudi alert 
            }, 3000);                       // dopo 3 secondi

            setTimeout(
                function () {
                    location.reload(true); // ricarica pagina cancellando cache -> elimina vecchi colori
                }, 3000                    // dopo 3 secondi
            )
        },
        checkScreen: function (color) {
            /** 
             * Controlla se lo schermo e' troppo piccolo per 
             * aggiungere il testo dentro ai riquadri 
             * 
             * @param {string} color Nome del colore
             * @return {string} color Nome del colore o ""
             * @since 01_01
            */

            var checksize = window.matchMedia("(max-width: 800px)"); // controllo se larghezza schermo < 800px 
            if (checksize.matches) {
                // se e' minore di 800px
                color = "";
            }
            return color;
        },
        getmaps: function () {
            /** 
             * Ottiene le mappe dal file e aggiunge "" per i separatori (div col-2) 
             * 
             * Per poter aggiungere nella frontend uno spazio tra una planimetria
             * e l'altra vengono aggiunte delle stringhe vuote all'interno del JSON restituito
             * 
             * @todo Gestire errori durante la GET request
             * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
            */
            axios.get("/static/php/showmaps.php").then(resp => {
                if (boold){
                    console.log("Ho ricevuto queste mappe:");
                    console.log(resp.data);
                }

                maps = resp.data;
                i = 0;
                col = 1;
                while (i < maps.length){
                    if (col == 2){
                        maps.splice(i, 0, "");
                    }

                    col++
                    
                    if (col > 3){
                        col = 1;
                    }
                    i++
                }
                if (boold){
                    console.log("Mappe con separatori:");
                    console.log(maps);
                }
                
                this.maps = maps;
            })
        },
        mapclass : function (map){
            /**  
             * Gestisce la classe della mappa, se map == "" (separatore),
             * la classe e' 'col-2', altrimenti 'col-5' e 'text-center'
             * 
             * La funzione getmaps() si e' occupata di aggiungere
             * stringhe vuote al JSON per creare una colonna che separa
             * due planimetrie.
             * 
             * @param {object|string} map Stringa vuota o oggetto contenente informazioni planimetria
             * @return {string} mapclass Classe del div che conterra' la planimetria e il suo nome
             * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
            */
            
            mapclass = 'col-2';  // se map e' "", serve colonna di 2/12 che separa le planimetrie
            
            if (map != ""){
                mapclass = 'col-5 text-center';  // altrimenti serve una colonna di 5/12 per contenere la planimetria
            }
            return mapclass;

        },
        mapcontent: function (map){
            /** 
             * Gestisce il contenuto del div delle mappe
             * Se map != "" il contenuto e' un div che ha un paragrafo con il nome del file
             * e img con la mappa,
             * 
             * altrimenti il div viene lasciato vuoto
             * 
             * @param {object|string} map Stringa vuota o oggetto contenente informazioni planimetria
             * @return {string} div Stringa vuota o contenente il div con il nome della planimetria e un <img> con src corretto
             * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
            */

            div = ""
            if (map != ""){
                div = '<div> <p>' + map.name + '</p> <img id="' + map.name + 'plan" class="img-fluid" src="' + map.path + '"></div>';
            }
            
            return div
        },
        sendmap: function (map){
            /**
             * Gestisce click/touch delle mappe
             * quando una mappa viene premuta viene effettuata una get request
             * per salvare nel database la scelta dell'utente
             * 
             * @param {string} map Nome planimetria
             * @todo Gestire eventuali errori da PHP
             * @since 01_04 (https://github.com/mario33881/progetto_100/commit/a473a44d6d67dc67d161879192d19a8703861b3c)
            */

            axios.get("/static/php/sendmap.php?map=" + map.name);
            this.showAlert("Hai selezionato la mappa '" + map.name + "'", "success");
        }
    },
    mounted: function () {
        /**
         * Quando viene caricato il componente
         * viene richiamata la funzione getColors passandogli il parametro num (6 in origine):
         * la variabile colors contiene il JSON che verra' usato per visualizzare i colori
         * selezionabili dall'utente.
         * 
         * Poi viene richiamata la funzione goBack() per permettere all'utente
         * di tornare alla pagina principale premendo il pulsante 
         * o facendo uno swipe.
         * 
         * Vengono inizializzati i datepicker e i timepicker,
         * e gli viene aggiunto l'evento "change" per riconoscere
         * quando l'utente seleziona/modifica un input.
         * 
         * Viene aggiunto l'evento click sul pulsante per confermare
         * le modifiche del timestamp per poter richiamare sendTimestamp()
         * 
         * Viene richiamata la funzione makeRssiTable()
         * per ottenere (e mantenere aggiornato con setInterval)
         * il JSON con le informazioni dei RSSI dei nodi,
         * verra' memorizzato nella variabile nodes_data.
         * 
         * Viene richiamata la funzione spaceOnDisk() che crea
         * il grafico con lo spazio libero/occupato sul disco di sistema
         * 
         * e infine viene richiamata la funzione getmaps()
         * per ottenere il JSON relativo alle planimetrie selezionabili
         * dall'utente: verranno memorizzate nella variabile maps
         * e usate nella frontend  
         * 
        */

        this.getColors(this.num); // ottieni i 6 colori iniziali
        this.goBack(); // imposto il touch

        // inizializzo i calendari
        var datepickerelems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(datepickerelems);

        // inizializzo gli "orologi"
        var timepickerelems = document.querySelectorAll('.timepicker');
        var instances = M.Timepicker.init(timepickerelems);

        // aggiungo eventi sugli input -> modifico "automaticamente" variabili in data
        this.changeFromdate();
        this.changeFromtime();
        this.changeTodate();
        this.changeTotime();

        // salva la funzione sendTimestamp
        var sender = this.sendTimestamp;

        var sendbtn = document.getElementById("submit"); // seleziona tasto submit
        sendbtn.addEventListener("click", sender);       // esegui funzione sendTimestamp quando avviene click su tasto submit

        var rssiupd = this.makeRssiTable; // salvo la funzione per ottenere RSSI
        rssiupd();                        // imposto RSSI 
        setInterval(rssiupd, 10000);      // richiama la funzione per aggiornare RSSI ogni 10 secondi (aspetta 10 secondi -> richiama)

        this.spaceOnDisk(); // aggiunge grafico con spazio rimanente su disco

        this.getmaps(); // ottiene il json con le mappe

    },
    data: function () {
        /**
         * Restituisce oggetto con le variabili del componente
         * @return {object} Oggetto contenente le variabili del componente
         */
        return {
            isswitched: false, // switch attivo o no?
            fromdate: "",      // calendario da
            fromtime: "",      // orologio da
            todate: "",        // calendario a
            totime: "",        // orologio a
            nodes_data: null,  // json con RSSI
            colors: null,      // json con colori
            maps: null,        // json con mappe
            num: 6             // numero colori da visualizzare
        }
    }
}