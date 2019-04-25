# progetto_100
Humidity and Temperature monitoring system using an IoT network (school project).

Node MCUs reading humidity and temperature using DHT22 are connected to a Raspberry Pi Wirelessly to which they send the data to

![](https://github.com/mario33881/progetto_100/raw/master/images/wallpaper.png?raw=true)
![](https://i.imgur.com/xPlIjIH.png)

You can read more about this project [from the wiki here](https://github.com/mario33881/progetto_100/wiki) <br />
Puoi leggere piu' informazioni riguardo il progetto [nella wiki qui](https://github.com/mario33881/progetto_100/wiki)
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
11. Change the variables values to your liking and upload the ```nodemcu_sketch/nodemcu_sketch.ino``` sketch to the board

### Raspberry pi

1. Install Raspbian
2. Download this repository
3. Go to the ```raspberry/auto``` folder and open the terminal
4. Set the sh files as executable with this command:
```
find . -type f -iname "*.sh" -exec chmod +x {} \;
```
5. Change these variables to your liking in the ```autoinstall.sh``` file
```
mysqlpass : password for mysql (user is root)
touchdevice : device with touch input
hostapd_ip : static ip of raspberry pi
hostapd_ssid : name of the Access Point
hostapd_password : password to connect to the AP
```
6. Execute the file by entering this command:
```
./autoinstall.sh
```

## Software map

### Backend
Work in progress
### Frontend
![](https://github.com/mario33881/progetto_100/blob/master/images/frontend.png)

## Changelog

**2019-04-25 01_05:** <br/>
Fixes:
* Now you can add "x + room" classes to elements in the plan to make then clickable

**2019-04-25 01_04:** <br/>
Fixes:
* database connection errors are now shown instead of the map and in an alert of the settings page
> Before this fix you had to use Dev Tools to know the problem and the settings page had weird blank parts

**2019-04-24 01_04:** <br/>
Features:
* Now you can add as many maps as you want in the /static/img/maps folder

**2019-04-23 01_03:** <br/>
Features:
* Added automatic installation script

**2019-04-17 01_02:** <br/>
Changes:
* Set limit of 1200 records

**2019-03-21 01_01:** <br/>
First commit

## To do
* OTA(over the air) updates
* SPIFFS + web server remote configuration
* WIKI with more infos/instructions
* Add support for other languages

## Author
Zenaro Stefano [(Github)](https://github.com/mario33881)
