var Backbone = require('backbone'),
	$ 		 = require('jquery'),
	_ 	     = require('underscore');

var routes 	 = require('./routes');

var MemeHomeLayoutView = require('../views/MemeHomeLayoutView');

var Router = Backbone.Router.extend(
	{ 
		initialize : function(){ 
			this.meme_home = new MemeHomeLayoutView;
			$('.app').append(this.meme_home.$el); //TODO
		},

		close_meme_home : function(){
			this.meme_home.close();
			this.meme_home = null;
			delete this.meme_home;
		},

		close_meme_large : function(){
			this.meme_large.close();
			this.meme_large = null;
			delete this.meme_large;
		},

		routes 	    : routes.map
	}
);

_.extend(Router.prototype,routes.callbacks);

module.exports = Router;

