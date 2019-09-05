# Progetto 100+100
Humidity and Temperature monitoring system using an IoT network (school project).

Node MCUs reading humidity and temperature using DHT22 are connected to a Raspberry Pi Wirelessly to which they send the data to

<p align="center">
    <img src="https://github.com/mario33881/progetto_100/raw/master/images/wallpaper.png?raw=true">
    <img src="https://i.imgur.com/xPlIjIH.png">
</p>

You can read more about this project [from the wiki here](https://github.com/mario33881/progetto_100/wiki) <br />
Puoi leggere piu' informazioni riguardo il progetto [nella wiki qui](https://github.com/mario33881/progetto_100/wiki)
---

## Sections
* [Getting started](getting-started-brief-instructions)
    * [Node MCU](#node-mcu)
    * [Raspberry pi](#raspberry-pi)
* [Software map](#software-map)
* [Changelog](#changelog)
* [To do / ideas](#to-do--ideas)

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
> The software map idea was abandoned because its hard to maintain it updated

### Backend
Work in progress
### Frontend
![](https://github.com/mario33881/progetto_100/raw/master/images/frontend.png?raw=true)

## Changelog

**2019-04-25 01_06:** <br/>
Features:
* Now you can add "x + room" classes to elements in the plan to make them clickable

**2019-04-25 01_05:** <br/>
Fixes:
* database connection errors are now shown instead of the map, they are also shown in an alert of the settings page
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

## To do / ideas
* OTA(over the air) updates
    > Should it be used in production? It leeds to security issues
* SPIFFS + web server remote configuration
    > Should it be used in production? It leeds to security issues
* WIKI with more infos/instructions
* Add support for other languages
* Unit Testing scripts (+CI automation with something like [Travis-ci](https://travis-ci.org/))
* [Dockerize](https://www.docker.com/) web server
* Use Vue components instead of JS files 
    > this implies adding a build stage using something like webpack
* Don't have imports from imports 
(like db_connection.php imported by get_colorslist.php 
imported by sendcolor.php )
    > To do this an implementation of a "main" function/condition check is needed.
    > ```if (!debug_backtrace()) {}``` should do the job. 
    
    > Also: PHP throws a "Fatal error" if a function has already been declared.
    To fix this [function_exists()](https://www.php.net/manual/en/function.function-exists.php) is needed
    
* Use POST requests instead of GET requests where the frontend sends data to the backend
* Add a parameter to getdata.php (the php file that shows the sensors readings)
  that specifies of which sensor to get the data  
* Add a login page and enable connections from outside LAN
    > Figure out a way to register the user without enabling everyone to do it from the internet: 
    > during the installation there might be a promt that asks for the password
    > that gets encrypted and stored inside a new database table.
    > A default password (that MUST BE CHANGED on the first login) could be used but its not ideal for security reasons
    
    > A nice feature would be to add the ability to later change the password 
    > and create new accounts for trusted people (like family members)
    
    > Obviously the rest API (all the PHP scripts that expose data) needs to be protected from un-authorized users as well as the UI
* Put all the database settings (database name and its table's names) inside a config file
or in a script that gets included
    > Better maintainability: changing one name doesn't require changing every variable inside the PHP scripts
* Better naming "standardization" for PHP scripts: "get_xxxx.php" or "getxxxx.php" could be used for GET request responders,
"sendxxxx.php"/"send_xxxx.php"/"postxxxx.php"/"post_xxxx.php" could be used for POST request responders,
the utilities (like "db_connection.php" ) could be put inside an "utils" folder
* Changing the UI color doesn't effect the UI on other devices, while this could be a cool feature
the user expects that changing the UI color affects all the devices without having to reload their page
    > websocket could be used to listen for the color change and reload the page

## Author
Zenaro Stefano [(Github)](https://github.com/mario33881)
