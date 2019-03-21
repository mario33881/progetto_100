
// componente / "pagina" grafici
const Graph = {
    name: "graph", // nome componente
    template:`<div>
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
                    </div>`,
    props: ["stanza"], // proprieta' che riconosce stanza cliccata ATTUALMENTE NON USATA
    methods: {
        TimestampToDate: function (timestamp) {

            /* Questa funzione converte il timestamp passato come parametro in data "umana" americana */

            Number.prototype.padLeft = function (base, chr) {
                // aggiunge gli zeri a sinistra (es. 6 minuti -> 06)
                var len = (String(base || 10).length - String(this).length) + 1;
                return len > 0 ? new Array(len).join(chr || '0') + this : this;
            }

            var d = new Date(timestamp * 1000),       // conversione timestamp a data ( timestamp [s] -> [ms] )
                dformat = [(d.getMonth() + 1).padLeft(), // getMonth()    ottiene mese   (due digit)
                d.getDate().padLeft(),                    // getDate()     ottiene giorno (due digit)
                d.getFullYear()].join('/') +              // getFullYear() ottiene anno e questi vengono uniti da '/' -> 02/18/2019
                    ' ' +                                     // aggiungi spazio tra data e ore
                    [d.getHours().padLeft(),                 // getHours()    ottiene ore
                    d.getMinutes().padLeft()].join(':');      // getMinutes()  ottiene minuti e questi vengono uniti da ':' -> 17:41 

            return dformat; // risultato finale "02/18/2019 17:41"
        },
        goBack: function () {
            /* Questa funzione aggiunge la funzionalita' touch alla pagina (swipe verso sinistra) */

            if (boold) {
                console.log("aggiungo il touch");
            }

            /* Pulsante per tornare indietro */
            var backbutton = document.getElementById("backbutton");
            backbutton.addEventListener("click", function () {
                window.location.href = "/#/";
            })

            var hammertime = new Hammer(document.getElementById('app')); // elemento touch #app -> tutta la pagina
            hammertime.on('swipe', function (ev) {
                // quando viene fatto uno swipe...
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
            /* Ottiene il colore dell'elemento nascondo per utilizzarlo per i grafici */

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
            /* Questa funzione fa GET request a php per ottenere i dati da visualizzare */

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
                            backgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)', // colore sfondo grafico
                            borderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)', // colore bordo del grafico
                            hoverBackgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',    // colore sfondo on hover ("passandoci sopra")
                            hoverBorderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',    // colore bordo on hover  ("passandoci sopra")
                            data: v_temps // temperature asse y
                        }],
                    };

                    // creo l'oggetto per creare grafico umidita'
                    var charthums = {
                        labels: v_timestamps, // timestamp asse x
                        datasets: [{
                            backgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)', // colore sfondo grafico
                            borderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.75)', // colore bordo del grafico
                            hoverBackgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',    // colore sfondo on hover ("passandoci sopra")
                            hoverBorderColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)',    // colore bordo on hover  ("passandoci sopra")
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
        // a DOM caricato...
        var graphfunc = this.makeGraphs; // salva la funzione per creare / aggiornare i grafici

        graphfunc();                     // richiama la funzione per creare immediatamente i grafici
        this.goBack();                   // aggiunge il touch alla pagina
        this.intervalId = setInterval(graphfunc, 10000);   // richiama la funzione per aggiornare i grafici ogni 10 secondi (aspetta 10 secondi -> richiama)
    },
    data: function () {
        return {
            intervalId: "" // id dell'interval -> per fermarlo
        }
    }
}
