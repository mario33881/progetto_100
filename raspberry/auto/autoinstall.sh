#!/bin/bash

mysqlpass="mysqlpassword"

touchdevice="Virtual core XTEST pointer"

hostapd_ip="192.168.4.1/24"
hostapd_ssid="nameofnetwork"
hostapd_password="longerthan8charspassword"

# install apache and php
./autoapachephp/install.sh -apachephp

# install mysql and mysql for php
./automysql/install.sh -mysql -mysqlforphp

# hide mouse with unclutter, set wallpaper, import database, install monitoring system, change credentials of monsys, set autostart of chromium with touch device input
./internalfunctions/install.sh -unclutter -wallpaper -database -monsys -credentials ${mysqlpass} -chromium ${touchdevice}

# change mysql password (for php)
./automysql/install.sh -mysqlpass ${mysqlpass}

# creates settings.ini file for autohostapd
echo -e "[HOSTAPD SETTINGS]\nip = ${hostapd_ip}\nssid = ${hostapd_ssid}\npassword = ${hostapd_password}" > autohostapd/settings.ini

# uses settings.ini to create network using hostapd (the system will be rebooted 2 times)
./autohostapd/install.sh