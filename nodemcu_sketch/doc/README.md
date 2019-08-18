# NODEMCU_SKETCH

## Introduzione

Questo sketch si connette all'Access Point del Raspberry Pi,
rileva umidita' e temperatura con il sensore DHT 22
e esegue GET request per mandare i dati rilevati

## Utilizzo

Preparare l'ambiente arduino per fare l'upload dello sketch:
1. Scaricare l'Arduino IDE (> 1.8.7 ) [qui](https://www.arduino.cc/en/Main/Software)
2. Installare i driver USB, scaricabili [qui](https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx)
3. Aggiungere questo URL in ```File -> Impostazioni -> URL aggiuntive per il Gestore schede``` dall'Arduino IDE
```
http://arduino.esp8266.com/stable/package_esp8266com_index.json
```
4. Chiudere e riaprire l'Arduino IDE
5. Andare in ```Strumenti -> Scheda -> Gestore schede``` e installare il pacchetto ```esp8266``` by ESP8266 Community
6. Chiudere e riaprire l'Arduino IDE
7. Cambiare la scheda corrente in ```Generic ESP8266 Module``` sotto il menu strumenti
8. In strumenti, assicurarsi che queste impostazioni siano impostate correttamente:
* Flash Mode = QIO
* Flash Frequency = 40MHz
* CPU Frequency = 80MHz
* Flash Size = 4M 1M SPIFFS
* Reset Method = nodemcu
* Upload Speed = 115200
9. Scaricare queste liberie da ```Sketch -> #Include libreria -> gestione librerie```
* Adafruit Unified Sensor by Adafruit
* DHT Sensor Library by Adafruit
10. Selezionare la porta corretta sotto il menu strumenti

Cambiare i valori delle variabili: 

In produzione:
* dhtConnected deve essere impostato a True per usare il sensore DHT
* serialDebug dovrebbe essere impostato a False, cosi' il serial monitor non visualizzera' nulla

Variabili personalizzabili:
ogni variabile puo' essere personalizzata tranne timeSinceLastRead
> Cambiare certe variabili porta a dover cambiare altre configurazioni in modo analogo.
> Ad esempio WIFI_SSID deve essere uguale al SSID dell'AP del raspberry pi

Caricare lo sketch:
caricare lo sketch sulla scheda usando il pulsante carica

## Descrizione ![](https://i.imgur.com/wMdaLI0.png)

1. Lo script include le librerie necessarie per connettersi al WiFi,
fare le GET request e rilevare i dati dal sensore DHT

2. Definisce variabili globali e oggetti:
	
	Variabili Debug / Sviluppo:
	* dhtConnected : se True vengono rilevati i dati dal sensore, altrimenti vengono usati dati statici 
	(valori di default delle variabili humidity, celsiusTemp e heatIndexCelsius)
	* serialDebug : se True il serial monitor e' usato per visualizzare informazioni utili al debug
	
	Variabili di rete:
	* node : numero host (ultimo ottetto) nell'indirizzo IP del nodemcu 
	* group : ultimo numero (terzo ottetto) dell'indirizzo IP della rete
	* s_node : stringa che identifica il nodemcu e la sua locazione
	* php_file : stringa con l'URL della pagina php che gestisce la GET request
	* WIFI_SSID : SSID dell'access point del raspberry pi
	* WIFI_PASS : password dell'access point del raspberry pi
	* ip : oggetto con l'IP del nodemcu ( 192.168.\<group>.\<node> )
	* gateway : oggetto con l'ip del raspberry pi ( 192.168.\<group>.1 )
	* subnet : oggetto con la subnet mask della rete ( 255.255.255.0 )
	* http : oggetto, client http usato per fare la GET request
	
	Variabili del sensore DHT:
	* DHTPIN : pin dati del DHT
	* DHTTYPE : tipo di DHT (DHT22)
	* timeSinceLastRead : intero che contiene quanto tempo e' passato dall'ultima rilevazione 
	(dovrebbe essere inizialmente definita a zero)
	* timeToWait : intero, tempo da aspettare tra ogni lettura 
	(il suo valore minimo deve essere 2000 [ms], la funzione setup() imporra questo valore se verranno impostati valori minori)
	* dht : oggetto usato per rilevare l'umidita' e la temperatura, usa DHTPIN e DHTTYPE

3. Viene richiamata la funzione setup():

		setup()
	La funzione richiama la funzione WLANconnessione() 
    per connettere il nodemcu all'access point del raspberry pi
	e poi si assicura che il tempo da aspettare ogni rilevazione sia di almeno 2 secondi
	(timeToWait deve essere minimo 2000 [ms])
	
	Se serialDebug e' True, la comunicazione seriale viene inizializzata,
	il suo timeout viene impostato e viene atteso il completamento della inizializzazione

4. La funzione WLANconnessione() viene richiamata:

		WLANconnessione()
	Questa funzione connette il nodemcu all'AP WiFi
   
    Disabilita' e poi riabilita' la modalita' WiFi Station Mode per essere sicuri che 
	il nodemcu non provi a connettersi al AP mentre e' gia' connesso ad una rete,
	
	Imposta ip, gateway e subnet mask e usa ssid e password 
	per cercare di connettersi all'AP. 
	Se passano 15 secondi senza che la connessione abbia successo la funzione termina

5. Viene continuamente richiamata la funzione loop() finche il dispositivo e' acceso

		loop()
	
	La funzione controlla che il nodeMCU sia connesso, in caso contrario richiama la funzione WLANconnessione().
	
	Poi ottiene l'RSSI della rete
	
	se dhtConnected e' true:
     
    * ogni almeno due secondi ( \<timeToWait> ) vengono effettuate le rilevazioni dal sensore, 
    controlla che le rilevazioni abbiamo prodotto risultati e calcola l'heat index, 
    la temperatura apparente che tiene in considerazione l'umidita'
    
    altrimenti vengono usati i dati falsi come test.
    
    Questi dati (falsi o rilevati dal sensore) e l'RSSI sono usati dalla funzione reportData() 
	
	> timeSinceLastRead tiene traccia del tempo passato dall'ultima rilevazione

6. Viene richiama la funzione reportData():

		reportData(float humidity, float celsiusTemp, float heatIndexCelsius, int t_rssi)
	
	Questa funzione prende questi parametri:
    * humidity = float, percentuale umidita'
    * celsiusTemp = float, temperatura ( in Celsius )
    * heatIndexCelsius = float, heat index ( in Celsius )
    * t_rssi = RSSI (Received Signal Strenght Indicator) della rete
   
    e li converte in stringhe per concatenarli nell'URL per effettuare la GET request.
	Infine viene eseguita la GET request con il client http

## Requisiti ![](https://i.imgur.com/H3oBumq.png)
* Arduino IDE configurato per caricare sketch per l'ESP8266