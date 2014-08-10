var Backbone = require('backbone');

module.exports = Meme = Backbone.Model.extend({

	getThumb : function(){
		return this.set(''); 
	},

	idAttribute : '_id',

	close  : function(){
		this.destory();
		this.stopListening();
	}
})

