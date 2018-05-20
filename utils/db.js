var mongoose = require('mongoose');

const mlabURI = 'mongodb://huynhduckhoan:huynhduckhoan@ds129560.mlab.com:29560/user-api'
const dbName = 'user-api';

const con = mongoose.connect(mlabURI, (error) => {
    if (error) {
        console.log("Error " + error);
    } else {
        console.log("Connected successfully to server")
    }
});

module.exports = con;