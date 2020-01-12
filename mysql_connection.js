var mysql = require('mysql');
var config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
};

var connection;
function handleDisconnect() {
    connection = mysql.createConnection(config);
    connection.connect( function onConnect(err) {
        if (err) {
            console.log('error when connecting to mysql: ', err);
            setTimeout(handleDisconnect, 10000);
        }
        console.log('mysql status: ' + connection.state);
    });
    connection.on('error', function onError(err) {
        console.log('mysql error', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();

module.exports = connection;