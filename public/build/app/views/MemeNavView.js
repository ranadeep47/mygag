var Backbone = require('backbone'),
	$ 		 = require('jquery');

module.exports = MemeNavView = Backbone.View.extend({

	initialize : function(){
		this.render();
		
		this.listenTo(MyGAG,'meme-home-layout:close',this.close);
	},

	events : {
		'change .meme-category-select' : 'changeCategory'
	},

	changeCategory : function(e){
		var category = e.target.value;
		MyGAG.router.navigate('memes/'+category,{trigger : true});
	},

	className : 'memes-nav-container col-xs-4',

	template : require('../templates/MemeNavTemplate.jst'),

	render : function(){
		this.$el.append(this.template(this.model.toJSON()))
		return this;
	},

	close : function(){
		this.remove();
		//Any other bindings to be removed or events to trigger to child views ?
	}
})