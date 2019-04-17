const Options = {
    name: "options", // nome componente
    template: `<div class="container">
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
                    
                    <h4 class="text-container"> Visualizzazione grafici</h4>
                    <div class="container text-center">
                    <!-- Qui vengono visualizzati tutti i messaggi errori/successo, ecco cosa viene creato con JS: -->
                    <!-- <div id="alerts-container" class="fade show text-center" role="alert"></div> -->
                    
                    <!-- <h1 id="title">Impostazioni</h1> -->
                    <span id="title"></span>
                                        
                    <!-- A cosa serve questa pagina -->
                    <p>Da qui puoi selezionare quale parte di dati visualizzare nei grafici:</p>
                    <ul>
                        <li>Scegli se voler visualizzare tutti i dati o solo una parte</li>
                        <li>se si vuole visualizzare una parte, selezionare date e tempi di limitazione</li>
                    </ul>
                </div>

                <div class="container text-center">
                    <!-- Pulsante -->
                    <div class="switch">
                        <label>
                            Tutto
                            <input v-on:click="isswitched = !isswitched" id="mySwitch" type="checkbox">
                            <span class="lever"></span>
                            Parziale
                        </label>
                    </div>
                </div>

                <!-- Container con data iniziale e data finale -->
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

                <div class="container text-center">
                    <button id="submit" type="button" class="btn bg-color">Conferma modifiche</button>
                </div>

                <hr>

                <h4 class="text-container">Colore interfaccia</h4>
                <span id="colortitle"></span>

                <p class="text-center"> Premi sul quadrato per selezionare il colore da usare per l'interfaccia</p>
                <div class="container">
                    <div class="row">
                        <div v-for="color in colors" style="" class="col-2">
                            <div v-on:click="sendColor(color.color_name)" class="square" v-bind:style="{ 'background-color': color.color_hex }">
                                <div class="content">{{ checkScreen(color.color_name) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container text-center">
                    <button id="submit" type="button" v-on:click="moreColors" class="btn bg-color">Mostra altri colori</button>
                </div>

                <hr>

                <h4 class="text-container">Tipo planimetria</h4>
                <p class="text-center"> Premi sulla planimetria che vorresti nella pagina principale</p>
                <div class="row">
                    <div class="col-5 text-center"><p>Realistic</p><img v-on:click="realisticplanSelected" id="realisticplan" class="img-fluid" src="/static/img/realistic.svg"></div>
                    <div class="col-2"></div>
                    <div class="col-5 text-center"><p>Colorful</p><img v-on:click="colorfulplanSelected" id="colorfulplan" class="img-fluid" src="/static/img/colorful.svg"></div>
                </div>
                
                <hr>
                
                <h4 class="text-container">Spazio disco</h4>
                <div class="container">
                    <canvas id="diskgraph"></canvas>
                </div>
                
                <hr>
                
                <h4 class="text-container">Potenza ricevuta dai nodi</h4>
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Nodo</th>
                            <th scope="col">RSSI [dBm]</th>
                            
                        </tr>
                    </thead>
                    <tbody id="rssitable">
                        <tr v-for="data in nodes_data">
                            <td><span v-html="rssiimg(data.rssi)"></span></td><td>{{data.id_node}}</td><td>{{data.rssi}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>`,
    methods: {
        // ------------- TODO: SOSTITUISCI CON v-model ------------------------
        changeFromdate: function () {
            /* Imposta evento sull'elemento fromdate per salvare la data "da" in input */

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
            /* Imposta evento sull'elemento fromtime per salvare ora/minuti "da" in input */

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
            /* Imposta evento sull'elemento todate per salvare la data "a" in input */

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
            /* Imposta evento sull'elemento todate per salvare ora/minuti "a" in input */

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
        // ------------- /TODO: SOSTITUISCI CON v-model ------------------------
        showAlert: function (t_text, t_status) {
            /* Questa funzione visualizza l'alert/messaggio con la struttura :
            
                <div id="alerts-container" class="fade show text-center alert alert-<$ t_status $>" role="alert"> <$ t_text $> </div>
            */

            alert_div = document.createElement("div"); // creo un div contenente l'alert
            alert_div.id = 'alerts-container';         // id = "alerts-container"
            alert_div.setAttribute('role', 'alert');   // role = "alert"
            alert_div.className = "fade show text-center fixed-top alert alert-" + t_status // "success" / "warning"

            alert_div.innerText = t_text; // imposta testo alert passato come parametro

            $("#title").before(alert_div); // inserisce alert prima dell'elemento "#title"

            setTimeout(() => {
                $(".alert").alert('close'); // chiudi/rimuovi alert
            }, 3000);                       // dopo 3000 millisecondi -> 3 secondi
        },
        sendTimestamp: function () {
            /* Manda il timestamp nelle impostazioni sul DB */

            var data = this; // salvo this dentro a data
            if (data.isswitched) {
                // switch attivo -> dati parziali
                var fromdateVal = Date.parse(data.fromdate) / 1000; // vue data "fromdate" -> timestamp [ms] -> timestamp [s]
                var fromtimeVal = timeToTimestamp(data.fromtime); // usa funzione in "/static/js/touch/t2ts.js" per convertire vue data "fromtime" "hh:mm tt" -> secondi

                var todateVal = Date.parse(data.todate) / 1000; // vue data "todate" -> timestamp [ms] -> timestamp [s]
                var totimeVal = timeToTimestamp(data.totime); // usa funzione in "/static/js/touch/t2ts.js" per convertire vue data "totime" "hh:mm tt" -> secondi

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
        },
        makeRssiTable: function () {
            /* Ottiene RSSI e lo mette dentro a "data" del componente */
            axios.get("/static/php/getrssi.php").then((resp) => {
                if (boold) {
                    console.log("Ho ricevuto:");
                    console.log(resp.data);
                }

                this.nodes_data = resp.data; // salva RSSI in "data"
            })
        },
        rssiimg: function (rssi) {
            /* Funzione richiamata dal v-for per cambiare immagine */
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
            /* Visualizza grafico dello spazio su disco */
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
            /* Ottiene tanti colori quanti sono specificati dal parametro num */
            axios.get("/static/php/getcolors.php?n=" + num).then(resp => {
                if (boold) {
                    console.log("Ho ricevuto questi colori:");
                    console.log(resp.data);
                }

                this.colors = resp.data; // salva in "data" i colori
            })
        },
        moreColors: function () {
            /* Permette di visualizzare altri 12 colori ogni volta che il pulsante viene premuto */
            if (boold) {
                console.log("Pulsante 'altri colori' premuto");
            }

            this.num = this.num + 12; // incrementa di 12 i colori da visualizzare
            this.getColors(this.num); // richiedi i colori nuovi per visualizzarli
        },
        sendColor: function (color) {
            /* Un quadrato con il colore e' stato premuto -> mandalo al DB */

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
            /* Controlla se lo schermo e' troppo piccolo per aggiungere il testo dentro ai riquadri */
            var checksize = window.matchMedia("(max-width: 800px)"); // controllo se larghezza schermo < 800px 
            if (checksize.matches) {
                // se e' minore di 800px
                color = "";
            }
            return color;
        },
        realisticplanSelected: function () {
            axios.get("/static/php/sendmap.php?map=realistic");
            this.showAlert("Hai selezionato la mappa 'realistic'", "success");
        },
        colorfulplanSelected: function () {
            axios.get("/static/php/sendmap.php?map=colorful");
            this.showAlert("Hai selezionato la mappa 'colorful'", "success");
        }
    },
    mounted: function () {
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

    },
    data: function () {
        return {
            isswitched: false, // switch attivo o no?
            fromdate: "",      // calendario da
            fromtime: "",      // orologio da
            todate: "",        // calendario a
            totime: "",        // orologio a
            nodes_data: null,  // json con RSSI
            colors: null,      // json con colori
            num: 6             // numero colori da visualizzare
        }
    }
}