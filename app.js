var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');
var mysql = require('mysql');

var db_connection = mysql.createConnection({
    host: "0.0.0.0",
    username: "admin",
    password: "admin",
    database: "my_db"
});

db_connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db_connection.threadId);
    db_connection.end(function (err) {
        if (err) {
            return console.log(err.message);
        }
    });
});

client.on('connect', function () {
    client.subscribe('Test topic', function (err) {
        if (!err) {
            client.publish('Test topic', 'Hello mqtt message');
        }
    })
})

client.on('message', function (topic, message) {
    console.log('topic: ' + topic + " message: " + message.toString());
})

function handleAppExit(options, err) {
    if (err) console.log(err.stack);
    if (options.cleanup) client.publish('garage/connected', 'false');
    if (options.exit) process.exit();
}

process.on('exit', handleAppExit.bind(null, {
    cleanup: true
}));

process.on('SIGINT', handleAppExit.bind(null, {
    exit: true
}));

process.on('uncaughtException', handleAppExit.bind(null, {
    exit: true
}));