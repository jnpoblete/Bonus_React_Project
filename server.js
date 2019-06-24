const express = require('express');
const app = express();
const path = require('path');
var cors = require('cors'); 


app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DETELE");
    next();
  });   

  const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/postpago&:datos',function(req,res){
  res.sendFile(path.join(__dirname+'/public/postpago.html'));
  console.log(req.params.datos);
});

router.get('/close',function(req,res){
  res.sendFile(path.join(__dirname+'/public/close.html'));
});

//add the router
app.use('/', router);

app.use(cors({credentials: false, origin: true}));

port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('server on port', port);
})
