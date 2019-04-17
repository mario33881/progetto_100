# progetto_100
Humidity and Temperature IoT network (school project)

---

## Getting started (brief instructions)

### Node MCU

1. Download Arduino IDE (> 1.8.7 ) [Here](https://www.arduino.cc/en/Main/Software)
2. Install USB drivers, download [Here](https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx)
3. Add this to the “Additional Boards Manager URLs” in the Arduino IDE
```
http://arduino.esp8266.com/stable/package_esp8266com_index.json
```
4. Restart the Arduino IDE
5. Go to ```Tools -> Board -> Boards Manager``` and install the ```esp8266``` package by ESP8266 Community
6. Restart the Arduino IDE
7. Change the current board to ```Generic ESP8266 Module``` under the tools menu
8. Under tools, make sure this settings are selected:
* Flash Mode = QIO
* Flash Frequency = 40MHz
* CPU Frequency = 80MHz
* Flash Size = 4M 1M SPIFFS
* Reset Method = nodemcu
* Upload Speed = 115200
9. Download these libraries from ```Sketch -> Include Library -> Libraries Manager```
* Adafruit Unified Sensor by Adafruit
* DHT Sensor Library by Adafruit
10. Select the correct port under the Tools menu
11. Change the variables values to your liking and upload the sketch to the board

### Raspberry pi

1. Install Raspbian
2. Install Hostapd, the software that creates the Access Point
3. Install Apache, Mysql (PhpMyAdmin is also recommend)
4. Import the sql file ```/raspberry/db100_100.sql``` using PhpMyAdmin or by entering this command
```
mysql -u username -p < db100_100.sql 
```
> replace username with the username you want to log in with
5. Put the ```/raspberry/var``` content inside the ```/var``` folder on the Raspberry Pi
6. Change SSID and password of the database from the ```/var/credentials/credentials.ini``` file

## Software map

### Backend
Work in progress
### Frontend
![](https://github.com/mario33881/progetto_100/blob/master/images/frontend.png)

## Changelog

**2019-04-17 01_02:** <br/>
Changes:
* Set limit of 1200 records

**2019-03-21 01_01:** <br/>
First commit

## To do
* OTA(over the air) updates
* SPIFFS + web server remote configuration
* WIKI with more infos/instructions

## Author
Zenaro Stefano [(Github)](https://github.com/mario33881)
