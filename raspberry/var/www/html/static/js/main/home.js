const Home = {
    name: "home",
    template: `<div class="page">
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
            /* Questa funzione estrae tutte le stanze dalla mappa e li restituisce in un array */
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
            /* Ottiene le stanze con la funzione getLocations() e imposta gli eventi click per andare nei grafici */
            idstanze = this.getLocations(); // array con id elementi che indicano stanze

            var scritta; // id della scritta stanza
            var touchsvg; // immagine touch per stanza

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


                // parte statica TODO: dinamicizzare anche questa parte
                if (stanza == "disimpegno") {
                    scritta = "text849";
                    touchsvg = "path882-1";

                }
                else if (stanza == "esterno") {
                    scritta = "text841-2";
                    touchsvg = "path882-2";

                }
                else if (stanza == "bagno") {
                    scritta = "text845";
                    touchsvg = "path882-7";
                }
                else if (stanza == "soggiorno") {
                    scritta = "text841";
                    touchsvg = "path882";

                }

                // aggiunge click alla scritta
                $("#" + scritta).on("click", (event) => {
                    if (boold) {
                        console.log("Hai cliccato ", stanza);
                    }
                    window.location.href = "/#/graph/" + stanza;
                    return false;
                });

                // aggiunge click all'immagine touch
                $("#" + touchsvg).on("click", (event) => {
                    if (boold) {
                        console.log("Hai cliccato ", stanza);
                    }
                    window.location.href = "/#/graph/" + stanza;
                    return false;
                });

            }


        },
        gotoinfos: function () {
            /* Questa funzione reinderizza alle informazioni */
            if (boold) {
                console.log("Vado sulle info");
            }
            window.location.href = "/#/infos";
            return false;
        },
        gotooptions: function () {
            /* Questa funzione reinderizza alle impostazioni */
            if (boold) {
                console.log("Vado sulle impostazioni");
            }
            window.location.href = "/#/options";
            return false;
        },
        updMap: function () {
            /* Questa funzione aggiorna le informazioni sulla mappa */
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
        /* Quando il componente e' caricato nel DOM */

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
        return {
            infoprogetto: "Informazioni progetto", // nome pulsante per info
            impostazioni: "Impostazioni"          // nome pulsante per impostazioni
        }
    }
}