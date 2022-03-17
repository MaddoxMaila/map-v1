HOME=/home/neo
SETUPS_DIR=$HOME/geo-int/setups
WEBAPPS_DIR=$HOME/Downloads/apache-tomcat-8.5.75/webapps
WURTH_DEV_DIR=$HOME/geo-int/map-v1

# Remove the already deployed application

if [ -d "$WEBAPPS_DIR/wurth" ]; then
    sudo rm "$WEBAPPS_DIR/wurth.war"
    sudo rm -rf "$WEBAPPS_DIR/wurth"
fi

# Rename & Move the newly built war application to Tomcat
# I could just move it to the server but i prefer this way

mv $WURTH_DEV_DIR/web/target/map-v1.war $WURTH_DEV_DIR/web/target/wurth.war
cp $WURTH_DEV_DIR/web/target/wurth.war $WEBAPPS_DIR/

echo "delaying... '$WEBAPPS_DIR/wurth' directory creation."
sleep 10

if [ -d "$WEBAPPS_DIR/wurth" ]; then

    # Delete h2 database config file & replace with Postgresql config file
    sudo rm $WEBAPPS_DIR/wurth/WEB-INF/classes/geostore-datasource-ovr.properties
    cp $SETUPS_DIR/geostore-datasource-ovr.properties $WEBAPPS_DIR/wurth/WEB-INF/classes/


    # Delete & Xerces with new one
    sudo rm $WEBAPPS_DIR/wurth/WEB-INF/lib/xercesImpl-2.6.2.jar
    cp $SETUPS_DIR/xercesImpl-2.9.1.jar $WEBAPPS_DIR/wurth/WEB-INF/lib/

    echo "Setups copying successful..."

else
    echo "$WEBAPPS_DIR/wurth Directory does not exist... wait a few seconds since the file is auto-generated & run the script again"
fi

# Revert to the original dev name for ease of script re-run
mv $WURTH_DEV_DIR/web/target/wurth.war $WURTH_DEV_DIR/web/target/map-v1.war

