const express = require('express'); //Import the express dependency
const https = require('https');
const path = require('path');
const fs = require('fs');
const { clear } = require('console');

const app = express();              //Instantiate an express app, the main work horse of this server
const port = 8000;                  //Save the port number where your server will be listening

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('resource.html', {root: __dirname});      //server responds by sending the resource.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

//Configure the https server to get Carto to work properly. Carto will not load on HTTP, it must load on HTTPS.
const sslserver = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslserver.listen(port, () => console.log ('Secure server listening on port 8000'))