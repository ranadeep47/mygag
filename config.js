module.exports = {

	host : 'localhost',
	port : 8080,
	uri  : 'http://localhost:8080',

	mongodb : {
		host : 'localhost',
		port : 27017,
		uri  : 'mongodb://localhost:27017/mygag',
		dbName : 'mygag'
	},

	environment : ( process.env.NODE_ENV !== 'production' ) ? 'development' : 'production',

	imgur : {
		clientID : '7c0855a7ef27b34'
	}

}

if(module.exports.environment === 'production') {

	module.exports.host = process.env.OPENSHIFT_NODEJS_IP,
	module.exports.port = process.env.OPENSHIFT_NODEJS_PORT,
	module.exports.uri 	= ''

	module.exports.mongodb = {
		uri 	: 'mongodb://user:pass@host:port/dbame',
		dbName  : 'dbname'
	}

}