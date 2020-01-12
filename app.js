var mysql_connection = require('./mysql_connection');
var mqtt_connection = require('./mqtt_connection');

process.on('exit', () => {
    mqtt_connection.handleAppExit({cleanup: true});
});

process.on('SIGINT', () => {
    mqtt_connection.handleAppExit({exit: true});
});

process.on('uncaughtException', () => {
    mqtt_connection.handleAppExit({exit: true});
});
