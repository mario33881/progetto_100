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
#                           MYSQL FUNCTIONS                            #
#                                                                      #
########################################################################

mysqlinstall(){
    # installs mysql

    if $DEBUG ; then
        echo "MYSQL > mysqlinstall()"
    fi

    logger "MYSQL" "Installing Mysql..." true automysql.log
    
    if ! $DEBUG ; then
        { 
            sudo apt-get install mysql-server -y
        } || {
            # Latest versions of raspbian throws "mysql-server has no installation candidate" error
            # https://mariadb.com/newsroom/press-releases/mariadb-replaces-mysql-as-the-default-in-debian-9/
            sudo apt-get install default-mysql-server -y
        }
    else
        echo "Should installing mysql..."
    fi

    if [ $? -eq 0 ] ; then
        logger "MYSQL" "Done installing Mysql" true automysql.log
    else
        logger "APACHE" "Failed installing Mysql" false automysql.log "$?"
        exit 1
    fi
}


apacherestart(){
    # restarts apache
    if $DEBUG ; then
        echo "APACHE > apacherestart()"
    fi

    logger "APACHE" "Restarting Apache..." true automysql.log
    
    if ! $DEBUG ; then
        sudo service apache2 restart
    else
        echo "Should have restarted apache..."
    fi

    if [ $? -eq 0 ] ; then 
        logger "APACHE" "Done restarting Apache" true automysql.log
    else
        logger "APACHE" "Failed restarting Apache" false automysql.log "$?"
        exit 1
    fi
}


mysqlforphp(){
    # installs mysql for php and calls apacherestart
    if $DEBUG ; then
        echo "MYSQL > mysqlforphp()"
    fi

    logger "MYSQL" "Installing Mysql for php..." true automysql.log
    
    if ! $DEBUG ; then
        sudo apt-get install php-mysql -y
    else
        echo "Should installing mysql for php..."
    fi

    if [ $? -eq 0 ] ; then
        logger "MYSQL" "Done installing Mysql for PHP" true automysql.log
        apacherestart

    else
        logger "MYSQL" "Failed installing Mysql for PHP" false automysql.log "$?"
        exit 1
    fi
}


mysqlrootchangepass(){
    # changes 'root' password (for php to connect to the database)

    pass=$1

    mysql_grant="GRANT ALL PRIVILEGES on *.* to 'root'@'localhost' IDENTIFIED BY '${pass}'"

    if $DEBUG ; then
        echo "MYSQL > mysqlrootchangepass()"
    fi

    logger "MYSQL" "Changing Mysql root password..." true automysql.log
    
    if ! $DEBUG ; then
        sudo mysql -e "${mysql_grant};FLUSH PRIVILEGES;"
    else
        echo "Should changing mysql root password..."
    fi

    if [ $? -eq 0 ] ; then
        logger "MYSQL" "Done changing mysql root password" true automysql.log

    else
        logger "MYSQL" "Failed changing mysql root password" false automysql.log "$?"
        exit 1
    fi
}


if [ $# -gt 0 ] ; then
    num=-1
    for ARGUMENT in "$@"
    do
        
        if [ $((num - 1)) = 0 ] ; then
            mysqlrootchangepass $ARGUMENT
            num=-1
        else
            if [ "$ARGUMENT" = "-mysql" ] ; then
                mysqlinstall
            fi

            if [ "$ARGUMENT" = "-mysqlforphp" ] ; then
                mysqlforphp
            fi
        fi

        if [ "$ARGUMENT" = "-mysqlpass" ] ; then
            num=1
        fi

    done

    exit 0

else
    echo "At least one param expected:"
    echo "-mysql : installs mysql"
    echo "-mysqlforphp : installs mysql for php"
    echo "-mysqlpass <pass> : changes root password to <pass>"
    echo ""
    echo "> Order is important!"
fi
exit 1
