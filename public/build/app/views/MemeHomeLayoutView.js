var Backbone = require('backbone'),
	$ 		 = require('jquery');

var MemeNav = require('../models/MemeNav');
var MemeCollection = require('../collections/MemeCollection');

/* Import child Views*/
var MemeNavView 		= require("./MemeNavView"),
	MemeCollectionView 	= require('./MemeCollectionView');

/* View definiton */
module.exports = MemeHomeLayoutView = Backbone.View.extend({

	className : 'meme-home-layout-wrapper container-fluid',

	initialize : function(category){
		if(!category) category = "funny";
		this.category = category;

		this.render();
	},

	template : require('../templates/MemeHomeLayoutTemplate.jst'),

	render : function(){
		this.$el.append(this.template());

		var parentEl = this.$('.meme-home-layout');

		var navModel = new MemeNav;
		parentEl.append((new MemeNavView({model : navModel})).$el);

		var memes = new MemeCollection;
		parentEl.append((new MemeCollectionView({collection : memes})).$el);

		return this;
	},

	changeCategory : function(category){
		this.category = category;
		MyGAG.trigger('meme-home-layout:changeCategory',category);
	},

	close : function(){
		MyGAG.trigger('meme-home-layout:close');
		this.remove();
	}

})