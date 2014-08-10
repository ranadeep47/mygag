var config = require('../config'),
	mongo  = require('mongodb');

module.exports = function(cb){
	mongo.MongoClient.connect(config.mongodb.uri,{uri_decode_auth : true},cb);
}




