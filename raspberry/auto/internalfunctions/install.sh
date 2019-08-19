#!/bin/bash

DEBUG=false

GREEN='\033[0;32m' # Green
RED='\033[0;31m'   # Red
NC='\033[0m'       # No Color

# script path and its directory
scriptpath=$(realpath $0)
dirpath=$(dirname "${scriptpath}")

# set working directory = script path
cd $dirpath


logger(){
    software=$1
    message=$2
    success=$3
    output=$4
    error=$5

    if $success ; then

        printf "${GREEN}"
    else
        printf "${RED}"
    fi

    printf "[${software}]${NC} ${message}\n"
    
    currenttime=$(date +%s)
    printf "${currenttime} [${software}] ${message}" >> ${output}

    if ! $success ; then
        printf " - error ${error}"
    fi

    printf " \n" >> ${output}
}


########################################################################
#                                                                      #
#                          INTERNAL FUNCTIONS                          #
#                                                                      #
########################################################################


download_repository(){
    # downloads https://github.com/mario33881/progetto_100/archive/master.zip repository if needed
    if $DEBUG ; then
        echo "INTERNALFUNCTIONS > download_repository()"
    fi

    logger "INTERNAL FUNCTIONS" "Checking if repository as been downloaded..." true internalfunctions.log

    if [ -d "../../../../progetto_100-master" ] ; then
        logger "INTERNAL FUNCTIONS" "This script has been downloaded by the repository" true internalfunctions.log
        return 2

    elif [ -d "progetto_100-master" ] ; then
        logger "INTERNAL FUNCTIONS" "This script has already downloaded the repository" true internalfunctions.log
        return 1
    else
        logger "INTERNAL FUNCTIONS" "Repository not found, downloading it now..." true internalfunctions.log
        
        curl -LO https://github.com/mario33881/progetto_100/archive/master.zip
        
        if [ $? -eq 0 ] ; then 
            logger "INTERNAL FUNCTIONS" "Download successfull, Unzipping file..." true internalfunctions.log

            { # prova a estrarre zip, se unzip da errore non e' installato
                unzip -o master.zip
            } || { # se non e' installato installalo e estrai il zip
                sudo apt-get install unzip && unzip -o master.zip
            }

        else
            logger "INTERNAL FUNCTIONS" "Download Failed quitting" false internalfunctions.log "$?"
            exit 1
        fi

        return 0
    fi
}


unclutter(){
    # installs unclutter and calls bootunclutter
    if $DEBUG ; then
        echo "INTERNALFUNCTIONS > unclutter()"
    fi

    logger "INTERNAL FUNCTIONS" "Installing unclutter..." true internalfunctions.log

    if ! $DEBUG ; then
        sudo apt-get install unclutter
    else
        echo "Should have installed unclutter"
    fi

    if [ $? -eq 0 ] ; then 
        logger "INTERNAL FUNCTIONS" "Done installing unclutter" true internalfunctions.log
        bootunclutter
    else
        logger "INTERNAL FUNCTIONS" "Failed installing unclutter" false internalfunctions.log "$?"
        exit 1
    fi
}


bootunclutter(){
    # sets unclutter to run on boot
    if $DEBUG ; then
        echo "INTERNALFUNCTIONS > bootunclutter()"
    fi

    logger "INTERNAL FUNCTIONS" "Setting start on boot unclutter..." true internalfunctions.log

    unclutter_line='@unclutter -idle 0'

    if ! $DEBUG ; then
        sudo bash -c "echo ${unclutter_line}" | sudo cat - /etc/xdg/lxsession/LXDE-pi/autostart > temp && sudo mv temp /etc/xdg/lxsession/LXDE-pi/autostart
    else
        echo "Should have set start on boot unclutter"
    fi

    if [ $? -eq 0 ] ; then 
        logger "INTERNAL FUNCTIONS" "Done Setting start on boot unclutter" true internalfunctions.log
    else
        logger "INTERNAL FUNCTIONS" "Failed Setting start on boot unclutter" false internalfunctions.log "$?"
        exit 1
    fi
}


bootchromium(){
    # creates sh file that starts chromium with flags and sets it to run on boot
    if $DEBUG ; then
        echo "autobootnnomouse.sh > autoboot()"
    fi

    touchdevice="$1"

    bash_line='#!/bin/bash'
    touchdevice_line="touchdevice=\"${touchdevice}\""
    deviceid_line='deviceid=$(xinput list --id-only "${touchdevice}")'
    chromium_line='chromium-browser --simulate-touch-screen-with-mouse --touch-devices=${deviceid} --incognito  --emulate-touch-events --enable-touch-events --disable-features=TranslateUI --touch-events=enabled --enable-pinch --noerrdialogs --start-fullscreen --disable --disable-translate --disable-infobars --disable-suggestions-service --disable-save-password-bubble --kiosk "http://localhost/"'
    
    if ! $DEBUG ; then
	    sudo bash -c "echo -e '${bash_line}\n${touchdevice_line}\n${deviceid_line}\n${chromium_line}' > /home/pi/autostart_chromium.sh"
    else
        echo "Should have create sh file for autoboot"
    fi


    if ! $DEBUG ; then
	    sudo bash -c "echo @bash /home/pi/autostart_chromium.sh" | sudo cat - /etc/xdg/lxsession/LXDE-pi/autostart > temp && sudo mv temp /etc/xdg/lxsession/LXDE-pi/autostart
    else
        "Should have set autoboot of chromium"
    fi
}


setwallpaper(){
    # sets custom wallpaper by first downloading the repository (if needed)
    if $DEBUG ; then
        echo "INTERNALFUNCTIONS > setwallpaper()"
    fi

    logger "INTERNAL FUNCTIONS" "Checking repository before setting wallpaper" true internalfunctions.log
    
    download_repository

    if [ $? -eq 2 ] ; then
        IMGPATH="../../../../progetto_100-master"
    else
        IMGPATH="progetto_100-master"
    fi

    logger "INTERNAL FUNCTIONS" "Setting wallpaper..." true internalfunctions.log
    fullpath=$(/usr/bin/realpath "${IMGPATH}/images/wallpaper.png")
    if ! $DEBUG ; then
        pcmanfm --set-wallpaper ${fullpath}
    else
        echo "Should have changed wallpaper..."
    fi

    if [ $? -eq 0 ] ; then 
        logger "INTERNAL FUNCTIONS" "Done Setting wallpaper" true internalfunctions.log
    else
        logger "INTERNAL FUNCTIONS" "Failed Setting wallpaper" false internalfunctions.log "$?"
        exit 1
    fi
}


importdatabase(){
    # imports database with tables using sql file,
    # it downloads the repository if needed

    if $DEBUG ; then
        echo "INTERNALFUNCTIONS > importdatabase()"
    fi

    logger "INTERNAL FUNCTIONS" "Checking repository before importing database" true internalfunctions.log
    
    download_repository

    if [ $? -eq 2 ] ; then
        IMGPATH="../../../../progetto_100-master"
    else
        IMGPATH="progetto_100-master"
    fi

    logger "INTERNAL FUNCTIONS" "Importing database..." true internalfunctions.log
    fullpath=$(/usr/bin/realpath "${IMGPATH}/raspberry/db100_100.sql")

    if ! $DEBUG ; then
        sudo mysql < ${fullpath}
    else
        echo "Should have imported database..."
    fi

    if [ $? -eq 0 ] ; then 
        logger "INTERNAL FUNCTIONS" "Done Importing database" true internalfunctions.log
    else
        logger "INTERNAL FUNCTIONS" "Failed Importing database" false internalfunctions.log "$?"
        exit 1
    fi
}


changecredentials(){
    # changes credentials file (used by php to connect to the database)
    if $DEBUG ; then
        echo "INTERNALFUNCTIONS > changecredentials()"
    fi

    mysql_pass=$1
    logger "INTERNAL FUNCTIONS" "Modifing credentials..." true internalfunctions.log
    
    # sets credentials for php to connect to the database
    if ! $DEBUG ; then
        sudo sh -c 'echo "DB_USER100=root\nDB_PASS100=${0}" > /var/www/credentials/credentials.ini' ${mysql_pass}
    else
        echo "Should have modified credentials"
    fi

    if [ $? -eq 0 ] ; then 
        logger "INTERNAL FUNCTIONS" "Done Modifing credentials" true internalfunctions.log
    else
        logger "INTERNAL FUNCTIONS" "Failed Modifing credentials" false internalfunctions.log "$?"
        exit 1
    fi
}


installmonsys(){
    # installs the monitoring system app
    # the repository will be downloaded (if needed)
    # and the "progetto_100-master/raspberry/var/www" content will be copied 
    # to the "/var/www/" directory

    if $DEBUG ; then
        echo "INTERNALFUNCTIONS > installmonsys()"
    fi

    logger "INTERNAL FUNCTIONS" "Checking if repository has been downloaded before installing monitoring system..." true internalfunctions.log

    download_repository

    if [ $? -eq 2 ] ; then
        RPATH="../../../../progetto_100-master"
    else
        RPATH="progetto_100-master"
    fi

    logger "INTERNAL FUNCTIONS" "Installing monitoring system..." true internalfunctions.log
    fullpath=$(/usr/bin/realpath "${RPATH}/raspberry/var/www")

    if ! $DEBUG ; then
        sudo cp -r ${fullpath}/. /var/www/
    else
        echo "Should have installed monitoring system..."
    fi

    if [ $? -eq 0 ] ; then 
        logger "INTERNAL FUNCTIONS" "Done Installing monitoring system" true internalfunctions.log
    else
        logger "INTERNAL FUNCTIONS" "Failed Installing monitoring system" false internalfunctions.log "$?"
        exit 1
    fi
}


if [ $# -gt 0 ] ; then
    num=-1
    for ARGUMENT in "$@"
    do

        if [ $((num - 1)) = 0 ] ; then
            changecredentials $ARGUMENT
            num=-1
        
        elif [ $((num - 2)) = 0 ] ; then
            bootchromium "$ARGUMENT"
            num=-1
        else
            if [ "$ARGUMENT" = "-unclutter" ] ; then
                unclutter
            
            elif [ "$ARGUMENT" = "-wallpaper" ] ; then
                setwallpaper
            
            elif [ "$ARGUMENT" = "-database" ] ; then
                importdatabase

            elif [ "$ARGUMENT" = "-monsys" ] ; then
                installmonsys
            fi
        fi

        if [ "$ARGUMENT" = "-credentials" ] ; then
            # need to read next argument, make num - 1 true
            num=1
        fi

        if [ "$ARGUMENT" = "-chromium" ] ; then
            # need to read next argument, make num - 2 true
            num=2
        fi

    done

    exit 0

else
    echo "At least one param expected:"
    echo "-unclutter : installs unclutters, starts on boot"
    echo "-wallpaper : sets custom wallpaper"
    echo "-database : imports database using sql file"
    echo "-credentials <pass> : sets credentials of monitoring system (root and <pass>)"
    echo "-monsys"
    echo "-chromium <device> : sets autoboot of chromium with touch using <device>"
    echo ""
    echo "> Order is important!"
fi
exit 1
