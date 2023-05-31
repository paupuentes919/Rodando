const express = require('express');

const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'/public')));

app.use('/nmb',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/views/home.html'))
});

app.listen(3010,function(req,res){
    console.log("Servidor en puerto 3010 corriendo")
});