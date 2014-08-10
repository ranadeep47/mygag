var Backbone = require('backbone'),
	$ 		 = require('jquery');


module.exports = MemeItemView = Backbone.View.extend({

	initialize : function(){
		this.render();
	//	this.listenTo(this.model,'change',function(){});
		this.listenTo(MyGAG,'meme-collecton:close',this.close);
		this.listenTo(MyGAG,'meme-home-layout:changeCategory',this.close);
	},

	className : 'meme row',

	events : {

	},

	template : require('../templates/MemeItemTemplate.jst'),

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	close : function(){
		this.remove();
		// /this.$el = this.el = null;
		//Other events you bound to
	}
})