LOCAL_HOME=/home/tshepang
SERVER_HOME=/home/mapstack
WEBAPPS_DIR=/var/lib/tomcat9/webapps
SERVER_SETUPS_DIR=$SERVER_HOME/geo-int/setups
LOCAL_SETUP_DIR=$LOCAL_HOME/geo-int/setups
WURTH_DEV_DIR=$LOCAL_HOME/geo-int/map-v1



# Copy the wurth war file to server
scp $WURTH_DEV_DIR/web/target/map-v1.war root@104.248.255.27:$SERVER_SETUPS_DIR

ssh root@104.248.255.27 < $LOCAL_SETUP_DIR/server-wurth.sh