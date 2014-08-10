var Backbone = require('backbone'),
	$ 		 = require('jquery');

module.exports = MemeLargeItemView = Backbone.View.extend({

	initialize : function(){
		this.render();
	},

	className : 'meme-large-container container',

	template : require('../templates/MemeLargeItemTemplate.jst'),

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	close : function(){
		this.remove();
		//More..
	}
})