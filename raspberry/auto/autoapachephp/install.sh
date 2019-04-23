#!/bin/bash

DEBUG=false

GREEN='\033[0;32m' # Green
RED='\033[0;31m'   # Red
NC='\033[0m'       # No Color


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
#                          APACHE FUNCTIONS                            #
#                                                                      #
########################################################################


apacheinstall(){
    # installs apache, loggs it and, if everything works, calls apacherewrite()
    if $DEBUG ; then
        echo "APACHE > apacheinstall()"
    fi

    logger "APACHE" "Installing Apache..." true autoapachephp.log
    
    if ! $DEBUG ; then
        sudo apt-get install apache2 -y
    else
        echo "Should installing apache..."
    fi

    if [ $? -eq 0 ] ; then 
        logger "APACHE" "Done installing Apache" true autoapachephp.log
        apacherewrite

    else
        logger "APACHE" "Failed installing Apache" false autoapachephp.log "$?"
        exit 1
    fi
}


apacherewrite(){
    # enables rewrite, if everything works 
    # restarts apache using apacherestart() 
    # and allows htaccess using apacheallowhtaccess()

    if $DEBUG ; then
        echo "APACHE > apacherewrite()"
    fi

    logger "APACHE" "Enabling Rewrite..." true autoapachephp.log
    
    if ! $DEBUG ; then
        sudo a2enmod rewrite
    else
        echo "Should have enabled rewrite..."
    fi

    if [ $? -eq 0 ] ; then 
        logger "APACHE" "Done enabling Rewrite" true autoapachephp.log
        apacherestart
        apacheallowhtaccess

    else
        logger "APACHE" "Failed enabling Rewrite" false autoapachephp.log "$?"
        exit 1
    fi
}


apacherestart(){
    # restarts apache
    if $DEBUG ; then
        echo "APACHE > apacherestart()"
    fi

    logger "APACHE" "Restarting Apache..." true autoapachephp.log
    
    if ! $DEBUG ; then
        sudo service apache2 restart
    else
        echo "Should have restarted apache..."
    fi

    if [ $? -eq 0 ] ; then 
        logger "APACHE" "Done restarting Apache" true autoapachephp.log

    else
        logger "APACHE" "Failed restarting Apache" false autoapachephp.log "$?"
        exit 1
    fi
}


apacheallowhtaccess(){
    # allows htaccess, if it works, restarts apache using apacherestart()
    if $DEBUG ; then
        echo "APACHE > apacheallowhtaccess()"
    fi

    logger "APACHE" "Allowing Htaccess..." true autoapachephp.log
    
    if ! $DEBUG ; then
        sudo sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
    else
        echo "Should have allowed htaccess..."
    fi

    if [ $? -eq 0 ] ; then 
        logger "APACHE" "Done Allowing Htaccess" true autoapachephp.log
        apacherestart

    else
        logger "APACHE" "Failed Allowing Htaccess" false autoapachephp.log "$?"
        exit 1
    fi
}


########################################################################
#                                                                      #
#                            PHP FUNCTIONS                             #
#                                                                      #
########################################################################


phpinstall(){
    # installs php

    if $DEBUG ; then
        echo "PHP > phpinstall()"
    fi

    logger "PHP" "Installing PHP..." true autoapachephp.log
    
    if ! $DEBUG ; then
        sudo apt-get install php  -y
    else
        echo "Should have installed PHP..."
    fi

    if [ $? -eq 0 ] ; then 
        logger "PHP" "Done Installing PHP" true autoapachephp.log

    else
        logger "PHP" "Failed Installing PHP" false autoapachephp.log "$?"
        exit 1
    fi
}


phpforapacheinstall(){
    # installs php library for apache

    if $DEBUG ; then
        echo "PHP FOR APACHE > phpinstall()"
    fi

    logger "PHP FOR APACHE" "Installing PHP library for Apache..." true autoapachephp.log
    
    if ! $DEBUG ; then
        sudo apt-get install libapache2-mod-php  -y
    else
        echo "Should have installed PHP library for Apache..."
    fi

    if [ $? -eq 0 ] ; then 
        logger "PHP FOR APACHE" "Done Installing PHP library for Apache" true autoapachephp.log

    else
        logger "PHP FOR APACHE" "Failed Installing PHP library for Apache" false autoapachephp.log "$?"
        exit 1
    fi
}


if [ $# = 1 ] ; then
    if [ "$1" = "-apachephp" ] || [ "$1" = "-phpapache" ] ; then
        apacheinstall
        phpinstall
        phpforapacheinstall

    elif [ "$1" = "-apache" ]; then
        apacheinstall

    elif [ "$1" = "-php" ] ; then
        phpinstall

    elif [ "$1" = "-phpforapache" ] ; then
        phpforapacheinstall

    else
        echo "Param is not correct [-apachephp or -phpapache, -php, -apache, -phpforapache]"
        exit 1
    fi
else
    echo "Param is needed [-apachephp or -phpapache, -php, -apache, -phpforapache]"
    exit 1
fi

exit 0
