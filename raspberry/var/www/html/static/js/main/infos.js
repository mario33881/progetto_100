const Infos = {
    name: "infos", // nome componente
    template: `<div>
                <div class="text-center">
                    <div style="height: 100vh; margin:0px" class="jumbotron d-flex align-items-center bg-color-infos">
                        <div class="w3-display-topleft" style="background-color:white">
                            <button type="button" id="backbutton" class="btn btn-sm align-left  bg-color"> < </button>
                        </div>

                        <div class="container">
                            <div style="display:inline-block;" class="typewriter">
                                <h1 id="title">{{ title }}</h1>
                            </div>

                            <hr class="w3-border-grey" style="width:40%">

                            <div>
                                <p id="slogan">{{ slogan }}</p>
                            </div>
                        </div>

                    <div class="w3-display-bottomleft bg-color-infos">
                        No copyright &copy 2018-2019
                    </div>

                </div>

                <!-- Sezione "In cosa consiste il progetto?" -->
                <div id="project">
                    <div class="container">
                        <!-- Titolo sezione -->
                        <hr class="w3-border-blue" style="margin:auto;width:100%">
                        <div class="container bg-color-infos text-center">
                            <h1>In cosa consiste il progetto?</h1>
                        </div>
                        <hr class="w3-border-blue" style="margin:auto;width:100%">

                        <!-- Parte scritta/immagini -->
                        <div class="row">
                            <div class="col"></div> <!-- Colonna vuota sinistra" -->

                            <div class="col-6">
                                <!-- Colonna centrale -->
                                <p> Il progetto consiste nel riuscire a rilevare attraverso sensori DHT la temperatura e
                                    l'umidita' di 3 stanze e dell'esterno</p>

                                <div data-aos="fade-up">
                                    <img src="/static/img/infos/pianta.png" class="img-fluid" alt="Responsive image" />
                                </div>

                                <br /> <br />
                                <p>e di inviare i dati rilevati attraverso i Node MCU al Raspberry Pi</p>

                                <div style="align-items: center;" class="d-flex">
                                    <div><img src="/static/img/infos/DHT22.jpg" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" /></div>
                                    <div><img src="/static/img/infos/arrow.png" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" data-aos-delay="100" /></div>
                                    <div><img src="/static/img/infos/node.jpg" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" data-aos-delay="200" /></div>
                                    <div><img src="/static/img/infos/arrow.png" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" data-aos-delay="300" /></div>
                                    <div><img src="/static/img/infos/raspberry.jpg" class="img-fluid fadeInUp" alt="Responsive image"
                                            data-aos="fade-up" data-aos-delay="400" /></div>
                                </div>

                            </div>

                            <div class="col"></div> <!-- Colonna vuota destra" -->

                        </div>
                    </div>
                </div>

                <!-- Sezione "Temperatura e umidita'" -->
                <div id="temp_umidity">
                    <div class="container">
                        <hr class="w3-border-blue" style="margin:auto;width:100%">
                        <div class="container bg-color-infos text-center">
                            <h1>Temperatura e umidita'</h1>
                        </div>
                        <hr class="w3-border-blue" style="margin:auto;width:100%">

                        <div class="row">
                            <div class="col"></div> <!-- Colonna vuota sinistra" -->

                            <div class="col-6 container">
                                <!-- Colonna centrale -->
                                <p>I Node MCU si connetteranno all'access point generato dal Raspberry pi,
                                    poi ogni 10 minuti rileverranno (attraverso i sensori DHT22) la temperatura e l'umidita'
                                    dell'ambiente,
                                    e faranno una richiesta GET a "/static/php/sensors.php"
                                    per inviare i dati al Raspberry che li inserira' in un database
                                </p>

                                <div style="align-items: center;" class="d-flex">
                                    <div><img src="/static/img/infos/node.jpg" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" /></div>
                                    <div><img src="/static/img/infos/arrow.png" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" data-aos-delay="100" /></div>
                                    <div><img src="/static/img/infos/get_req.jpg" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" data-aos-delay="200" /></div>
                                    <div><img src="/static/img/infos/arrow.png" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" data-aos-delay="300" /></div>
                                    <div><img src="/static/img/infos/raspberry.jpg" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" data-aos-delay="400" /></div>
                                    <div><img src="/static/img/infos/arrow.png" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" data-aos-delay="500" /></div>
                                    <div><img src="/static/img/infos/mysql.png" class="img-fluid" alt="Responsive image"
                                            data-aos="fade-up" data-aos-delay="600" /></div>

                                </div>
                                <p>I dati che finiranno sul database saranno:</p>

                                <ul class="list-group">
                                    <li class="list-group-item px-0">
                                        <a data-toggle="tooltip"
                                            title="numero autoincrementale per garantire unicita' del record nel database">id</a>
                                    </li>

                                    <li class="list-group-item px-0">
                                        <a data-toggle="tooltip"
                                            title="Il timestamp di quando il record e' stato inserito nel database">measure_timestamp</a>
                                    </li>

                                    <li class="list-group-item px-0">
                                        <a data-toggle="tooltip"
                                            title="Id del node, dove si trova nell'appartamento">id_node</a>
                                    </li>

                                    <li class="list-group-item px-0">
                                        <a data-toggle="tooltip"
                                            title="Percentuale rilevata di umidita' (es. 23 = 23%)">humidity</a>
                                    </li>

                                    <li class="list-group-item px-0">
                                        <a data-toggle="tooltip"
                                            title="Temperatura in Celsius rilevata (es. 34.23 = 34.23 °C)">celsius_temp</a>
                                    </li>

                                    <li class="list-group-item px-0">
                                        <a data-toggle="tooltip"
                                            title="Indice di calore in Celsius calcolato da umidita' e temperatura (es. 34.23 = 34.23 °C)">heat_index_celsius</a>
                                    </li>

                                    <li class="list-group-item px-0">
                                        <a data-toggle="tooltip"
                                            title="Livello potenza ricevuto dal node">RSSI</a>
                                    </li>
                                </ul>

                                <p> Questi dati verranno successivamente visualizzati in grafici cliccando sulla stanza
                                    desiderata</p>
                            </div>

                            <div class="col w3-container w3-white w3-cell"></div> <!-- Colonna vuota destra" -->

                        </div>

                    </div>
                </div>


            </div>


            <!-- Schermata finale -->
            <div style="height: 100vh; margin:0px;" class="jumbotron d-flex bg-color-infos align-items-center text-center">
                <div class="container">
                    <div>
                        <h1 id="title" class="w3-jumbo w3-animate-top">Gruppi 1 e 2</h1>
                    </div>

                    <hr class="w3-border-grey" style="width:40%">
                    <div>
                        <p id="slogan">{{ persone }}</p>
                    </div>
                </div>
            </div>

        </div>`,
    methods: {
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
                    console.log("Delta X: ", ev.deltaX);
                }

                if (ev.deltaX > 100) {
                    // se lo swipe e' verso sinistra di 100 px
                    window.location.href = "/#/"; // torna pagina principale
                }
            });
        }
    },
    mounted: function () {
        this.goBack(); // imposta touch
        var checksize = window.matchMedia("(max-width: 400px)"); // controllo se larghezza schermo < 400px 
        if (checksize.matches) {
            // se e' minore di 400px
            this.title = "Progetto";   // cambio titolo
            this.slogan = "100 + 100"; // e slogan (andrebbero fuori pagina)
        }
    },
    data: function () {
        return {
            title: "Progetto 100+100",
            slogan: "Temperatura e umidita' al 100% sotto controllo",
            persone: "Cipriani nicolas, Coltri andrea, Lopez sebastian, Perlati Matteo, Zenaro stefano"
        }
    }
}