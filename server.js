const express = require('express');

const server = express();

const PORT = process.env.PORT || 3000



server.all('/', (req, res)=>{

   res.setHeader('Content-Type', 'text/html');

   res.write('<link href="https://fonts.googleapis.com/css?family=Roboto Condensed" rel="stylesheet"> <style> body {font-family: "Roboto Condensed";font-size: 22px;} <p>Hosting Active</p>');

   res.end();

})



function keepAlive(){

   server.listen(PORT, ()=>{console.log("Server is online!")});

}



module.exports = keepAlive;