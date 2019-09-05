/** 
 * Script che definisce componente Vue con la pagina principale
 * 
 * @since 01_01
 * @author Stefano Zenaro (https://github.com/mario33881)
 * @license MIT
 * @todo Aggiungere un riscontro anche in caso la GET request per le rilevazioni non abbia successo
*/

const Home = {
    name: "home",
    template: `
    <div class="page">
        <div class="container">
            <h1 class="text-container title">Progetto 100 + 100</h1>
                                        
            <div id="floorplan" ref="floorplan" class="floorplan"> </div>

            <div class="btn-group fixed-bottom" role="group">
                <button v-on:click="gotoinfos" type="button" class="btn bg-color halfpage"> {{ infoprogetto }} </button>
                <button v-on:click="gotooptions" type="button" class="btn bg-color halfpage"> {{ impostazioni }} </button>
            </div>
        </div>
    </div>`,
    methods: {
        getLocations: function () {
            /** 
             * Questa funzione estrae tutte le stanze dalla mappa e li restituisce in un array
             * 
             * Viene usato JQuery per ottenere gli id di tutti gli elementi <rect> dentro all'<svg>
             * che si trova nel div#floorplan, poi vengono letti uno ad uno
             * e se gli id NON includono la stringa "rect" (ex. "rect867-2-7-0-7" non e' accettato)
             * allora viene aggiunto all'array idstanze che viene restituito a fine ciclo
             * > Di default inkscape aggiunge degli id a tutti gli elementi dell'SVG
             * 
             * Viene richiamata da updMap() e setLinks()
             * 
             * @return {Array.<...string>} idstanze Array con gli id delle stanze
             * @see updMap() Aggiorna le ultime rilevazioni all'interno della planimetria
             * @see setLinks() Aggiunge gli eventi click agli elementi per andare nella pagina dei grafici
             * @since 01_01
            */

            let idstanze = [];

            if (boold) {
                console.log("Ottengo tutte le stanze dalla mappa");
            }

            // prendo tutte le stanze nella carta
            var IDs = $("#floorplan>svg rect[id]")            // trova id nei <path> (stanze e altro)
                .map(function () { return this.id; }) // converte in un set il risultato
                .get(); // converte set in array

            for (let id of IDs) {
                // per ogni id nell'array IDs
                if (!id.includes("rect")) {
                    // se l'id non include rect (id di default -> non e' una stanza)
                    idstanze.push(id);
                    if (boold) {
                        console.log(id);
                    }

                }

            }
            return idstanze;
        },
        setLinks: function () {
            /**  
             * Ottiene le stanze con la funzione getLocations() e imposta gli eventi click per andare nei grafici
             * 
             * Scorre tutte le stanze e per ogni stanza cerca gli elementi:
             * - con id "stanza", elemento <rect> che corrisponde alla stanza
             * - con id t + "stanza", elemento <text> che conterra' l'ultima temperatura della stanza
             * - con id h + "stanza", elemento <text> che conterra' l'ultima umidita' della stanza
             * - con classi x + "stanza", tutti gli elementi che non corrispondono ai requisiti precedenti
             *   ma a cui si desidera ugualmente dare la possibilita' di essere cliccati per andare 
             *   alla pagina dei grafici 
             *   
             *  > in colourful.svg e realistic.svg ad esempio le "immagini" che indicano elemento cliccabile
             *  > usano questo tipo di classe, se non l'avessero l'utente non si troverebbe alla pagina dei grafici
             *  > quando le clicca facendo sembrare "inaffidabile" o "non responsiva" l'interfaccia
             * 
             * A tutti gli elementi viene aggiunto l'evento "clic" che fara' andare nella pagina /graph/<stanza>
             * 
             * @see getLocations() funzione che restituisce la lista degli id delle stanze
             * @since 01_01
            */

            idstanze = this.getLocations();  // array con id elementi che indicano stanze

            for (let stanza of idstanze) {
                // per le stanze
                $("#" + stanza).on("click", (event) => {
                    if (boold) {
                        console.log("Hai cliccato ", stanza);
                    }
                    window.location.href = "/#/graph/" + stanza;
                    return false;
                });

                // per scritte temperature
                $("#t" + stanza).on("click", (event) => {
                    if (boold) {
                        console.log("Hai cliccato ", stanza);
                    }
                    window.location.href = "/#/graph/" + stanza;
                    return false;
                });

                // per scritte umidita'
                $("#h" + stanza).on("click", (event) => {
                    if (boold) {
                        console.log("Hai cliccato ", stanza);
                    }
                    window.location.href = "/#/graph/" + stanza;
                    return false;
                });

                // per extra (scritte, immagini, altri elementi cliccabili)
                extras = document.getElementsByClassName("x" + stanza);

                for (let extra of extras){
                    extra.addEventListener("click", () => {
                        if (boold) {
                            console.log("Hai cliccato ", stanza);
                        }
                        window.location.href = "/#/graph/" + stanza;
                        return false;
                    })
                }
            }


        },
        gotoinfos: function () {
            /**
             * Questa funzione reindirizza alla pagina delle informazioni 
             * 
             * @return {bool} false
             * @todo Questa funzione, insieme a gotooptions(), potrebbe
             *       essere rimossa in favore di qualche direttiva vue
             * @since 01_01
            */
            
            if (boold) {
                console.log("Vado sulle info");
            }
            
            window.location.href = "/#/infos";
            return false;
        },
        gotooptions: function () {
            /**
             * Questa funzione reindirizza alla pagina delle impostazioni 
             * 
             * @return {bool} false
             * @todo Questa funzione, insieme a gotoinfos(), potrebbe
             *       essere rimossa in favore di qualche direttiva vue
             * @since 01_01
            */

            if (boold) {
                console.log("Vado sulle impostazioni");
            }
            
            window.location.href = "/#/options";
            return false;
        },
        updMap: function () {
            /**
             * Questa funzione aggiorna le informazioni delle rilevazioni sulla mappa
             * 
             * Viene eseguita una GET request allo script "/static/php/getlatestdata.php"
             * per ottenere le ultime rilevazioni per stanza/nodo,
             * vengono recuperati gli id delle stanze da getLocations().
             * Per ogni stanza vengono selezionati gli elementi 
             * contenenti le temperature e le umidita' e viene resettato il suo valore.
             * Poi per ogni rilevazione viene verificato se il suo id_node
             * corrisponde al nome della stanza:
             * se corrispondono viene sostituito il valore di temperatura e umidita'
             * visualizzati dall'utente con gli effettivi valori
             * 
             * @see /static/php/getlatestdata.php Script PHP che restituisce le ultime rilevazioni per stanza
             * @todo Aggiungere riscontro visivo in caso di GET request non riuscita 
             *       (magari aggiungendo un alert "Rilevazioni non aggiornate da xx minuti" dopo un certo numero di tentativi falliti)
             * @since 01_01
            */
           
            axios.get("/static/php/getlatestdata.php").then((resp) => {

                if (boold) {
                    console.log("letture:");
                    console.log(resp.data);
                }

                idstanze = this.getLocations(); // ottengo array delle stanze

                if (boold) {
                    console.log("metto temperature nella mappa");
                }

                for (let stanza of idstanze) {
                    // per ogni stanza
                    document.getElementById("t" + stanza).textContent = "? \u2103" // metti come stato default "?" delle temperature
                    document.getElementById("h" + stanza).textContent = "? %"      // metti come stato default "?" delle umidita'

                    resp.data.forEach(row => {
                        // per ogni riga/record/stanza nel json 
                        if (boold) {
                            console.log(row);
                        }

                        if (row.id_node == stanza) {
                            // se la stanza nel json corrisponde alla stanza nella mappa
                            if (boold) {
                                console.log(stanza);
                            }

                            document.getElementById("t" + stanza).textContent = row.celsius_temp + " \u2103"; // aggiorna la temperatura
                            document.getElementById("h" + stanza).textContent = row.humidity + " %";          // aggiorna l'umidita'
                        }
                    });
                }
            });
        }
    },
    mounted: function () {
        /** 
         * Quando il componente viene caricato 
         * prima viene verificata la larghezza dello schermo:
         * se e' minore di 450 pixel la variabile del componente infoprogetto viene impostata a "Info progetto"
         * > Di default e' "Informazioni progetto"
         * 
         * Poi viene selezionato l'elemento con id "floorplan" che conterra' la planimetria
         * e viene inizializzato con svg.js,
         * viene eseguita una GET request allo script PHP "/static/img/planselector.php" per ottenere la mappa selezionata dall'utente.
         * 
         * svg.js si occupera' di inserire la planimetria dentro a div#floorplan,
         * poi verra' richiamata la funzione setLinks() per aggiungere
         * gli eventi per andare nella pagina dei grafici per ogni stanza
         * e infine viene richiamata la funzione updMap()
         * che verra' richiamata ogni 10 secondi per mantenere aggiornati
         * i dati delle ultime rilevazioni sulla planimetria
         * 
         * @todo Permettere la gestione di errori riscontrati da PHP
         * 
        */

        var checksize = window.matchMedia("(max-width: 450px)"); // controllo se lo schermo < 450px di larghezza
        if (checksize.matches) {
            // se e' minore di 450px
            this.infoprogetto = "Info progetto"; // cambia il nome del pulsante che va nelle info
        }

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
    },
    data: function () {
        /** 
         * Restituisce le variabili del componente
         * @return {object} oggetto con dati componente
        */
        return {
            infoprogetto: "Informazioni progetto", // testo nel pulsante per info
            impostazioni: "Impostazioni"           // testo nel pulsante per impostazioni
        }
    }
}