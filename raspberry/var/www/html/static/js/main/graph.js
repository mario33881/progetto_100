/** 
 * Script che definisce componente Vue con la pagina dei grafici
 * 
 * @since 01_01
 * @author Stefano Zenaro (https://github.com/mario33881)
 * @license MIT
 * @todo Aggiungere un riscontro anche in caso la GET request per le rilevazioni non abbia successo
*/

const Graph = {
    name: "graph", // nome componente
    template:`
    <div>
        <!-- Titolo grafico temperatura + Pulsante per tornare indietro -->
        <div class="row mb-0">
            <div class="col-sm-12 col-sm-offset-2">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <div class="center-text-vert">
                            <button type="button" id="backbutton" class="btn btn-sm align-left mb-0 bg-color"> < </button>
                            <h2 class="text-container title center"> Temperatura {{stanza}}</h2>   
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Container grafico temperature -->
        <div class="graph-container">
            <canvas id="tempgraph"></canvas>
        </div>
        
        <!-- Titolo grafico umidita' -->
        <h2 class="text-container title"> Umidita' {{stanza}}</h2>
        
        <!-- Container grafico umidita' -->
        <div class="graph-container">
            <canvas id="humgraph"></canvas>
        </div>

        <!-- Elemento nascosto per colore grafici -->
        <span class="bg-color" style="display:none"> </span> 
    </div>`,
    props: ["stanza"], // proprieta' che riconosce stanza cliccata ATTUALMENTE NON USATA
    methods: {
        TimestampToDate: function (timestamp) {
            /** 
            * Questa funzione converte il timestamp passato come parametro in data "umana" americana
            *
            * @param {integer} timestamp Timestamp con unita' di misura in secondi
            * @return {string} dformat Data in formato "MM/DD/YYYY hh:mm"
            * @since 01_01
            */
            

            Number.prototype.padLeft = function (base, chr) {
                /** 
                 * aggiunge tanti chr (o "0") a sinistra quanti indica "l'esponente" di base (default "10" -> xx)
                 * (es. 6 minuti -> 06)
                 * 
                 * @param {integer} base numero 10^(x + 1) che indica quanti chr mettere davanti al numero
                 * @param {string} chr carattere da aggiungere a sinistra del numero
                 * @return {string} padded_string Stringa contenente numero avente a sinistra x + 1 "chr" (base = 10^(x+1)) 
                 *   
                 * @example 
                 * // restituisce "01"
                 * (1).padLeft()
                 * @example
                 * //restituisce "002"
                 * (2).padLeft(100)
                 * @example
                 * //restituisce "xx3"
                 * (3).padLeft(100, "x")
                 * @since 01_01
                */
                
                var len = (String(base || 10).length - String(this).length) + 1;
                var padded_string = len > 0 ? new Array(len).join(chr || '0') + this : this;
                return padded_string;
            }


            var d = new Date(timestamp * 1000)  // conversione timestamp a data ( timestamp [s] -> [ms] )
                
            var dformat = [(d.getMonth() + 1).padLeft(),  // getMonth()    ottiene mese   ( .padLeft() due digit, mm)
                d.getDate().padLeft(),                    // getDate()     ottiene giorno ( .padLeft() due digit, dd)
                d.getFullYear()].join('/') +              // getFullYear() ottiene anno e questi vengono uniti da '/' -> mm/dd/yyyy
                    ' ' +                                 // aggiungi spazio tra data e ore
                    [d.getHours().padLeft(),              // getHours()    ottiene ore ( .padLeft() due digit, hh)
                    d.getMinutes().padLeft()].join(':');  // getMinutes()  ottiene minuti e questi vengono uniti da ':' -> hh:mm 

            return dformat; // risultato finale "MM/DD/YYYY hh:mm"
        },
        goBack: function () {
            /**
             * Questa funzione aggiunge gli eventi per tornare alla pagina principale: 
             * - clic del pulsante #backbutton 
             * - touch alla pagina (swipe verso sinistra)
             * 
             * Viene richiamata da mounted()
             * 
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
                    console.log("Delta X: ", ev.deltaX);
                }

                if (ev.deltaX < -100) {
                    // se lo spostamento dal punto iniziale al punto finale e' < -100 (swipe a sinistra)...
                    window.location.href = "/#/"; // torna alla pagina precedente
                }
            });
        },
        getGraphColor: function () {
            /** 
             * Ottiene i 3 componenti (r, g e b) del colore del primo elemento con classe .bg-color per utilizzarlo per i grafici.
             * 
             * Viene richiamata da makeGraphs() che usa i 3 componenti per colorare i grafici
             * 
             * @return {Array.<string, string, string>} rgb Array con i colori di sfondo dell'elemento con classe .bg-color
             * @since 01_01
            */

            const element = document.querySelector('.bg-color');     // seleziona elemento nascosto
            const style = getComputedStyle(element);                 // ottieni stili dell'elemento
            const backgroundColor = style.backgroundColor;           // ottieni il colore di background
            rgb = backgroundColor.replace(/[^\d,]/g, '').split(','); // converti rgb(x, y, z) -> [x, y, z]

            if (boold) {
                console.log("Colori ottenuti dall'elemento");
                console.log(backgroundColor);
                console.log(rgb);
            }

            return rgb;
        },
        makeGraphs: function () {
            /** 
             * Questa funzione fa GET request a php per ottenere i dati da visualizzare nei grafici.
             * 
             * Prima recupera da getGraphColor() i componenti rgb da usare per i grafici,
             * poi si assicura che la funzione stia lavorando quando l'utente e' sulla pagina dei grafici:
             * se non e' così viene terminato il "loop infinito" di setInterval() eseguito da mounted()
             * 
             * se invece l'utente e' nella pagina dei grafici viene recuperato dall'URL il nome della stanza,
             * > Nota: si potrebbe usare la prop "stanza", non e' stata piu' usata perche' sembrava creare problemi.
             * > Il problema dopo essersi ripresentato e' scomparso quando e' 
             * > stato aggiunto il controllo della pagina attuale per fermare il setInterval()
             * 
             * viene usato Axios,js per eseguire una GET request a "/static/php/getdata.php" per ottenere
             * le rilevazioni, poi viene eseguito un loop che cicla le rilevazioni una ad una
             * per assicurarsi che l'id del nodo sia quello della stanza di cui visualizzare i grafici
             * e per dividere timestamp, umidita' e temperatura in 3 array separati
             * > Nota: i timestamp vengono prima convertiti in data da TimestampToDate()
             * 
             * vengono creati 2 oggetti, uno per l'umidita' e uno per la temperatura,
             * che servono per indicare a chart.js (incluso in mdbootstrap)
             * quali dati usare per l'asse delle X (timestamp),
             * quali per l'asse Y (umidita'/temperature)
             * e quali colori usare per il grafico (vengono usati i valori recuperati da getGraphColor())
             * 
             * Infine vengono creati altri 2 oggetti, uno per l'umidita' e uno per la temperatura,
             * per indicare ai grafici che sono di tipo "linea",
             * che devono essere creati nei corretti canvas (le temperature vanno in #tempgraph, le umidita' in #humgraph),
             * che non devono visualizzare la legenda e che non devono fare animazioni durante l'aggiornamento dei dati
             * > L'animazione e' poco gradevole a causa del continuo aggiornamento dei dati
             * e che devono aspettarsi un aggiornamento dei loro dati
             * 
             * @todo Aggiungere un riscontro anche in caso la GET request non abbia successo
             * @since 01_01
            */

            rgb = this.getGraphColor(); // ottengo colore per grafici

            var url = window.location.href.split("/"); // ottengo array dell'url della pagina

            if (url[url.length - 2] == "graph") {
                // se sono nella pagina dei grafici
                if (boold) {
                    console.log("Sono pagina grafici");
                }

                var t_stanza = url[url.length - 1];
                if (boold) {
                    console.log("stanza selezionata:", url[url.length - 1]);
                }

                axios.get("/static/php/getdata.php").then((resp) => {
                    // ottengo la risposta
                    var v_timestamps = []; // array di timestamp   ( asse x grafici )
                    var v_temps = [];      // array di temperature ( asse y grafico temperature)
                    var v_hums = [];       // array di umidita'    ( asse y grafico umidita')

                    resp.data.forEach((row) => {
                        // per ogni elemento / rilevazione ricevuta dalla risposta
                        if (row.id_node == t_stanza) {
                            // se l'id_node corrisponde alla stanza cliccata / richiesta
                            if (boold) {
                                console.log(row);
                            }

                            var measure_timestamp = row.measure_timestamp;           // recupero il timestamp della rilevazione
                            var timestamp = this.TimestampToDate(measure_timestamp); // lo converto in data "umana"

                            var temperature = row.celsius_temp; // recupero la temperatura della rivelazione
                            var humidity = row.humidity;        // recupero l'umidita' della rilevazione

                            v_timestamps.push(timestamp); // mi salvo nell'array la data
                            v_temps.push(temperature);    // mi salvo nell'array la temperatura
                            v_hums.push(humidity);        // mi salvo nell'array l'umidita'
                        }
                    });

                    if (boold) {
                        // visualizzo i vari dati per debug
                        console.log("timestamp");
                        console.log(v_timestamps);

                        console.log("temperature");
                        console.log(v_temps);

                        console.log("umidita'");
                        console.log(v_hums);
                    }

                    // creo l'oggetto per creare grafico temperature
                    var charttemps = {
                        labels: v_timestamps, // timestamp asse x
                        datasets: [{
                            backgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)',    // colore sfondo grafico
                            borderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)',        // colore bordo del grafico
                            hoverBackgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',  // colore sfondo on hover ("passandoci sopra")
                            hoverBorderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',      // colore bordo on hover  ("passandoci sopra")
                            data: v_temps // temperature asse y
                        }],
                    };

                    // creo l'oggetto per creare grafico umidita'
                    var charthums = {
                        labels: v_timestamps, // timestamp asse x
                        datasets: [{
                            backgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)',    // colore sfondo grafico
                            borderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)',        // colore bordo del grafico
                            hoverBackgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',  // colore sfondo on hover ("passandoci sopra")
                            hoverBorderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',      // colore bordo on hover  ("passandoci sopra")
                            data: v_hums // umidita' asse y
                        }],
                    };

                    if (boold) {
                        // visualizzo dati per debug
                        console.log("Ho impostato i dati");
                        console.log(charttemps);
                        console.log(charthums);
                    }

                    // recupero dal DOM i canvas dove inserire i grafici
                    var ctxtemps = document.getElementById("tempgraph"); // canvas grafico temperature
                    var ctxhums = document.getElementById("humgraph");   // canvas grafico umidita'

                    if (boold) {
                        // visualizzo html collection, gli elementi canvas
                        console.log(ctxtemps);
                        console.log(ctxhums);
                    }

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

                    tempGraph.update(); // Per aggiornare i dati del grafico ad ogni richiesta

                    // creo oggetto grafico dell' umidita'
                    var humGraph = new Chart(ctxhums, { // creo grafico nel canvas umidita' 
                        type: 'line',    // tipo "linea"
                        data: charthums, // dati umidita'
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

                    humGraph.update(); // Per aggiornare i dati del grafico ad ogni richiesta
                })

                if (boold) {
                    console.log("Ho creato/aggiornato i grafici");
                }
            }
            else {
                if (boold) {
                    console.log("non sono pagina grafici, fermo Interval infinito...");
                }
                clearInterval(this.intervalId); // fermo il loop di aggiornamento grafici
            }

        }
    },
    mounted: function () {
        /**
         * Quando il componente viene caricato viene richiamata la funzione makeGraphs() per creare i grafici,
         * vengono aggiunti gli eventi per poter tornare alla pagina principale da goBack()
         * e viene impostato il "loop infinito" con setInverval() per mantenere i grafici aggiornati
         * ogni 10 secondi.
         * 
         * > setInterval restituisce un numero che serve a fermare il loop attraverso clearInterval
         * 
         * > makeGraphs() viene richiamato prima di setInterval perche' setInterval prima aspetta
         * > che siano passati i millisecondi, poi richiama la funzione. 
         * > Questo significa che l'utente non vedrebbe i grafici per 10 secondi
        */
        
        var graphfunc = this.makeGraphs; // salva la funzione per creare / aggiornare i grafici
        graphfunc();                     // richiama la funzione per creare immediatamente i grafici

        this.goBack();  // aggiunge gli eventi per tornare alla pagina principale
        
        this.intervalId = setInterval(graphfunc, 10000);   // richiama la funzione per aggiornare i grafici ogni 10 secondi (aspetta 10 secondi -> richiama)
    },
    data: function () {
        /**
         * Restituisce i dati appartenenti al componente
         * @return {object} oggetto con dati componente
        */
        return {
            intervalId: "" // id dell'interval -> per fermarlo
        }
    }
}
