const express = require('express');
const app = express();
var cors = require('cors'); 


app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });   
  
app.use(cors({credentials: true, origin: true}));

app.listen(3000, function(){
    console.log('server on port 3000');
})