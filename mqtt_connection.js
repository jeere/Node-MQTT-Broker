var dotenv = require('dotenv').config()
var mqtt = require('mqtt');
// var client = mqtt.connect('mqtt://test.mosquitto.org'); //free online mqtt-broker
//Create.env file with line: MQTT_IP_ADDRESS=mqtt://your.ip.address.here
var client = mqtt.connect(process.env.MQTT_IP_ADDRESS); 

const topic = "test";
const message = JSON.stringify({"first":"item1", "second":"item2"});

client.on('connect', function () {
    client.subscribe(topic, function (err) {
        if (!err) {
            client.publish(topic, message);
        }
    })
});

client.on('message', function (topic, message) {
    console.log('Received data to topic: ' + topic);
    let json_data = JSON.parse(message)
    Object.keys(json_data).forEach(function(item) {
        console.log(item + " : " + json_data[item]);
    });
});

function handleAppExit(options, err) {
    if (err) console.log(err.stack);
    if (options.cleanup) client.publish('todo-clean-up-code', 'false');
    if (options.exit) process.exit();
}

module.exports = handleAppExit;