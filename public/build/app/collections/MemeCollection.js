var Backbone = require('backbone');


var Meme = require('../models/Meme');

module.exports = MemeCollection = Backbone.Collection.extend({

	initialize : function(){
		this.changeCategory("funny");
	},

	model : Meme,

	url : function(){
		return 'api/memes/'+this.category;
	},

	changeCategory : function(category){
		this.category = category;
		this.fetch({reset : true});
	}
})