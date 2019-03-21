// prima aver disposto un Raspberry Pi 3 acceso e generante una rete WiFi

// ********************* INCLUDE *********************

#include <ESP8266WiFi.h>       // libreria wifi
#include <ESP8266HTTPClient.h> // libreria client http
#include "DHT.h"               // libreria DHT

// ********************* DEFINIZIONI/VARIABILI *********************

#define dhtConnected true // true = DHT22 utilizzabile/connesso
#define serialDebug false   // true = visualizza messaggi di debug attraverso comunicazione seriale 

#define node 7           // numero node (serve per definire la parte host dell'IP, node+10)
#define group 6          // numero gruppo e terzo ottetto degli indirizzi IP

#define DHTPIN 4         // pin dato del DHT22
#define DHTTYPE DHT22    // tipo di sensore DHT (DHT22)

String s_node = "soggiorno"; // id (identificativo) del node
String php_file = "static/php/sensors.php"; // pagina a cui eseguire GET request

 // Se il sensore non e' connesso (dhtConnected=false), uso dati finti per testare
float humidity = 44.70;         // finta % umidita'
float celsiusTemp = 26.10;      // finta temperatura Celsius
float heatIndexCelsius = 25.93; // finta temperatura apparente Celsius

int timeSinceLastRead = 0; // variabile tempo dall'ultima lettura DHT
int timeToWait = 2000;     // variabile tempo da aspettare per interrogare DHT (minimo 2000 [ms])

 // Credenziali WiFi
const char* WIFI_SSID = "yourssid"; // SSID allocato in memoria in sola lettura (char*)
const char* WIFI_PASS = "yourpassword";   // Passphrase allocata in memoria in sola lettura  (char*)

// ********************* OGGETTI *********************

DHT dht(DHTPIN, DHTTYPE); // creazione oggetto dht

IPAddress ip(192, 168, group, node); // Indirizzo IP statico node
IPAddress gateway(192, 168, group, 1);  // Indirizzo IP raspberry
IPAddress subnet(255, 255, 255, 0);     // Subnet mask della rete ( CIDR /24)

HTTPClient http; // oggetto client HTTP

// ********************* FUNZIONI *********************


void WLANconnessione() {
  // Funzione che si connette al wifi
  /*
   * Questa funzione si occupa di connettersi al WiFi
   * 
   * Visualizza l'SSID della rete a cui si sta connettendo,
   * disattiva e riattiva il WiFi per evitare un tentativo di connessione mentre e' gia' connesso,
   * utilizza ip, gateway e subnet mask impostate nella sezione oggetti dello sketch e ssid e password per tentare
   * una connessione alla rete. Se in 15 secondi non ci riesce termina i tentativi di connessione, altrimenti
   * visualizza l'ip con cui si e' connesso alla rete
  */
  
  if(serialDebug){
    Serial.println();
    Serial.println();
    Serial.print("Mi sto connettendo alla rete: ");
    Serial.println(WIFI_SSID);
  }
  
  WiFi.persistent(false); // WiFi fix: https://github.com/esp8266/Arduino/issues/2186
  WiFi.mode(WIFI_OFF); // Disabilito il wifi
  WiFi.mode(WIFI_STA); // Lo riabilito in modalita' "station" (si puo' connettere all'AP)
  WiFi.config(ip, gateway, subnet); // imposta IP statico, IP raspberry e subnet mask
  WiFi.begin(WIFI_SSID, WIFI_PASS); // mi connetto al wifi

  unsigned long wifiConnectStart = millis(); // salvo momento del tentativo di connessione

  while (WiFi.status() != WL_CONNECTED) {
    // finche' non e' connesso al WiFi

    if (WiFi.status() == WL_CONNECT_FAILED and serialDebug) {
      // se la connessione e' fallita 
      Serial.println("Connessione fallita. Per favore controllare le credenziali: ");
      Serial.println();
      Serial.print("SSID: ");
      Serial.println(WIFI_SSID);
      Serial.print("Password: ");
      Serial.println(WIFI_PASS);
      Serial.println();
    }

    if (serialDebug){
      Serial.println("...");
    }
    
    delay(500);
    
    if(millis() - wifiConnectStart > 15000) {
      // se la connessione impiega piu' di 15 secondi
      if (serialDebug){
        Serial.println("Connessione fallita");
        Serial.println("Per favore modificare i parametri di connessione");
      }
      
      return;
    }
  } 
    
  // Connessione al WIFI riuscita
  if (serialDebug){
    Serial.println();
    Serial.println("Connessione riuscita");
    Serial.println("Indirizzo IP: ");
    Serial.println(WiFi.localIP()); // visualizza indirizzo IP del node
    Serial.println();
  }
}


void reportData(float humidity, float celsiusTemp, float heatIndexCelsius, int t_rssi){
  /*
   * Questa funzione si occupa di prendere i parametri:
   * - humidity = umidita' in percentuale
   * - celsiusTemp = temperatura in Celsius
   * - heatIndexCelsius = temperatura apparente in Celsius
   * - t_rssi = RSSI (potenza del segnale) della rete
   * 
   * e di convertirli in stringhe per poterle concatenare in un url
   * che verra' utilizzato per eseguire una GET request al raspberry pi
   * contenente tutti i dati
  */
  
  char s_buffer[6];    // array di 6 caratteri (5 + '\x0', fine stringa)
  char c_buffer[2];    // array di 2 caratteri (1 + '\x0', fine stringa)
  char rssi_buffer[4]; // array di 4 caratteri (3 + '\x0', fine stringa)
  
  String s_group = itoa(group, c_buffer, 10);                            // stringa gruppo (intero, Buffer, base numerica)
  String s_rssi = itoa(t_rssi, rssi_buffer, 10);                         // stringa RSSI (intero, Buffer, base numerica)
  String s_humidity = dtostrf(humidity, 5, 2, s_buffer);                 // stringa umidita'                            (float, numerocaratteri, precisione/parte decimale, buffer) 
  String s_celsiusTemp = dtostrf(celsiusTemp, 5, 2, s_buffer);           // stringa temperatura Celsius                 (float, numerocaratteri, precisione/parte decimale, buffer)
  String s_heatIndexCelsius = dtostrf(heatIndexCelsius, 5, 2, s_buffer); // stringa temperatura apparente in Celsius    (float, numerocaratteri, precisione/parte decimale, buffer)

  String request = "http://192.168." + s_group + ".1/" + php_file + "?node=" + s_node + "&humidity=" + s_humidity + "&celsiusTemp=" + s_celsiusTemp + "&heatIndexCelsius=" + s_heatIndexCelsius + "&rssi=" + s_rssi; 
  
  if (serialDebug){
    Serial.print("Url richiesta GET: ");
    Serial.println(request);
  }
  
  http.begin(request);       // Specifica dove inviare la richiesta
  int httpCode = http.GET(); // manda GET request e ottiene HTTP status
  
  if (serialDebug){
    Serial.print("Status code: ");
    Serial.print(httpCode);
    if(httpCode != 200){
      Serial.print(" | Qualcosa e' andato storto");
    }
    Serial.println();
    Serial.println();
  }
  
  http.end(); // termina connessione
}


void setup() {
  /*
   * La funzione (eseguita una volta sola) si occupa di richiamare la funzione WLANconnessione() 
   * per connettere il node MCU alla rete del raspberry pi e 
   * si assicura che il tempo da aspettare tra ogni rilevazione sia almeno 2 secondi (2000 ms)
   * 
   * Se serialDebug == true, viene inizializzata la comunicazione seriale e
   * viene impostato un tempo massimo [ms] da aspettare per i dati seriali,
   * attende che la comunicazione seriale sia stabilita
  */

  if(timeToWait < 2000){
    // < 2 secondi sono pochi tra le rilevazioni... 
    timeToWait = 2000; // impongo 2 secondi minimi
  }
  
  if (serialDebug){
    Serial.begin(9600);      // inizializza comunicazione seriale
    Serial.setTimeout(2000); // imposta tempo massimo [ms] da aspettare per dati seriali
  
    while(!Serial) { } // Attente che la comunicazione seriale sia stabilita
  
    Serial.println("Il dispositivo e' pronto");
    Serial.println("-------------------------------------");
    Serial.println("Inizio connessione al WIFI");
    Serial.println("-------------------------------------");
  }
  
  WLANconnessione (); // connetto al WiFi del raspberry
}


void loop() {
  /*
   * La funzione controlla che il node MCU sesti collegato alla rete del Raspberry pi,
   * se dhtConnected e' true:
   *  
   *  - ogni minimo due secondi ( <timeToWait> ) legge i dati provenienti dal sensore, 
   *    controlla che temperatura e umidita' siano state lette correttamente 
   *    e calcola l'heat index, la temperatura "apparente" che tiene conto dell'umidita'
   * 
   * altrimenti usa i dati "finti" (da test) contenuti nella sezione variabili.
   * 
   * Richiama la funzione reportData() con i dati di temperatura e umidita'(finti o letti) e l'RSSI come parametri
  */
  
  if (WiFi.status() != WL_CONNECTED) {
    // se non e' connesso al wifi, richiama WLANconnessione()
    if (serialDebug){
      Serial.println("Il node non e' piu' connesso al WiFi");
    }
    WLANconnessione();
  }
  
  // Ogni circa <timeToWait> millisecondi leggi DHT
  if(timeSinceLastRead > timeToWait) {
    // Leggere la temperatura o l'umidita' dal sensore puo' impiegare 250 millisecondi!
    // I dati dei sensori potrebbero essere "vecchi" di 2 secondi (tempo tra rilevazioni <= 2 s )
    int rssi = WiFi.RSSI();
    
    if(dhtConnected){
      // se DHT connesso
      humidity = dht.readHumidity();       // leggi umidita' dal sensore
      celsiusTemp = dht.readTemperature(); // leggi temperatura Celsius 
  
      if (isnan(humidity) || isnan(celsiusTemp)) {
        // se una delle letture dal sensore fallisce
        if (serialDebug){
          Serial.println("Lettura dati dal sensore DHT fallita!");
        }
        timeSinceLastRead = 0; // tempo dall'ultima lettura si resetta
        return; // ripeto loop()
      }
      heatIndexCelsius = dht.computeHeatIndex(celsiusTemp, humidity, false); // temperatura apparente in Celsius(isFahrenheit = false) 
    }
    if (serialDebug){
      Serial.print("Umidita': ");
      Serial.print(humidity);
      Serial.print(" %\t");
      Serial.print("Temperatura: ");
      Serial.print(celsiusTemp);
      Serial.print(" *C\t");
      Serial.print("Temperatura apparente: ");
      Serial.print(heatIndexCelsius);
      Serial.print(" *C\t");
      Serial.print("RSSI: ");
      Serial.print(rssi);
      Serial.println(" dBm");
    }
    reportData(humidity, celsiusTemp, heatIndexCelsius, rssi); // richiama funzione che invia i dati attraverso GET request
    timeSinceLastRead = 0; // tempo dall'ultima lettura si resetta
  }
  delay(100);               // aspetta 100 ms 
  timeSinceLastRead += 100; // incrementa di 100 il numero di ms aspettati dall'ultima lettura
}
