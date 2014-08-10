var Backbone = require('backbone'),
	_ 		 = require('underscore'),
	$	 	 = require('jquery');
Backbone.$ = $;

var Router   = require('./router/router.js')

var MyGAG = window.MyGAG = {appname : 'mygag', version : '0.0.1'};

_.extend(MyGAG, Backbone.Events) // A global event bus 

$(document).ready(function(){

	Backbone.history.start();
	
	MyGAG.router = new Router;
})