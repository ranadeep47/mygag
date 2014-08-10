var express = require('express');
//	http 	= require('http');
var app 	= express(),
	config 	= require('./config')
//Middleware
var morgan 		= require('morgan'),
	multer 		= require('multer'),
	bodyParser 	= require('body-parser');

var routes = require('./api/routes');


app.use(morgan(':method :url :status :req["Content-Type"] :response-time',{ skip : function(req,res) { return res.statusCode < 400 || req.url.search('favicon') > -1 }}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(multer({dest : './uploads/'}));

app.use(express.static(__dirname+'/public'))

/*------------------------------------*/

app.listen(config.port,config.host);

console.log('App listening on '+ config.uri);

/*----------ROUTES-----------------*/
app.get('/',function(req,res){
	res.sendfile(__dirname+'/views/index.html')
})

/*---------Modal routes ----------*/
var mongo = require('./db/connection');

mongo(function(err,db){ // Get the database connection before the routes are initialised

app.get('/api/memes/:cat/:id',routes.meme.get);

app.post('/api/memes/:cat', routes.meme.post);

app.put('/api/memes/:cat/:id',routes.meme.put);

app.delete('/api/memes/:cat/:id',routes.meme.del);

/*-----------Collection routes ---------*/

app.get('/api/memes/:cat',routes.memes.get); 


//End of mongodb connection callback
})







