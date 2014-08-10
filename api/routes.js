var mongo 	= require('../db/connection');
var unirest = require('unirest');
var config  = require('../config');
var async 	= require('async');

var objID = require('mongodb').ObjectID;

function toObjectId(str){
	return new objID(str);
}

var routes;
module.exports = routes = {
	meme : {},
	memes : {}
}

mongo(function(err,db){
	if(err) console.log(err);
	else {



routes.meme.get = function(req,res){
	var cat = req.params.cat,
		id  = toObjectId(req.params.id);

	db.collection(cat).findOne({_id : id},function(err,doc){
		if(err || !doc) doc = {error : 'Database error', message : 'cannot find a model with that id'}
		res.json(doc);
	})
}

routes.meme.post = function(req,res){
	var cat = req.params.cat,
		id 	= toObjectId(req.params.id);


	db.collection(cat).insert(req.body,function(err){
		if(err) res.send(500);
		else res.send(201);
	})
	// What are data parameters and how is the model sent ? 
}

routes.meme.put = function(req,res){
	var cat = req.params.cat,
		id 	= toObjectId(req.params.id);


	db.collection(cat).upsert({_id : id},req.body,function(err,doc){
		if(err){
			console.log(err);
			res.send(500);
		}
		else res.json(doc);
	})
	// How are properties sent and what are the data parameters
}

routes.meme.del = function(req,res){
	var cat = req.params.cat,
		id 	= toObjectId(req.params.id);

	db.collection(cat).remove({_id : id},function(err){
		if(err) {
			console.log(err);
			res.send(500)
		}
		else res.send(200);
	})
}	

/*------------------------------------*/

routes.memes.get = function(req,res){
	var cat = req.params.cat;
	//What about datetime query params
	var more = (req.query.more ? req.query.more : 0)

	db.collection(cat).find().sort({datetime : -1}).skip(more * 10).limit(10).toArray(function(err,docs){
		if(err || !docs) docs = {error : 'Database error', message : 'Cannot retrieve models'}
		res.json(docs) 
	})

}

/*----------Setting up imgur api requests  -------*/

var IMGUR_API_URL = "https://api.imgur.com/3";

var subreddits 			= ["cats","pics","aww","earthporn","funny","gifs","earthporn","WTF","fffffffuuuuuuuuuuuu","woahdude","adviceanimals","india"],
	sub_url_endpoint    = IMGUR_API_URL + "/gallery/r/";



var requests = 	subreddits.map(function(sub){
					return function(cb){
						req(sub_url_endpoint + sub)
						.end(function(response){
							if(response.status === 200) {
								cb(null,{json : response.body.data, cat : sub})
							}
							else {
								console.log(response.error);
								cb(response.error,null);
							}
						})	
					}
				})


/*----------Update database by requesting imgur every hour -------*/

//updateDB();
setInterval(updateDB, 60*60*1000);

var fs = require('fs');

function updateDB(cb){

	async.parallel(requests,function(err,results){
		results.forEach(function(res){
			res.json.forEach(function(meme){
				db.collection(res.cat).findOne({id : meme.id},function(err,doc){
					if(!doc && !meme.is_album){					//Update only the nonexisting docs
						db.collection(res.cat).insert(meme,{w : 1},noop);
					}
				})
			})
		})
	})
}

function req(url){

	return (unirest
		.get(url)
		.headers({'Accept' : 'application/json', 'Authorization' : "Client-ID " + config.imgur.clientID}))
}

//End of mongodb connection callback
	}
})

function noop(){}