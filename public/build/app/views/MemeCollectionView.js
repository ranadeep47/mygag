var Backbone = require('backbone'),
	_ 		 = require('underscore'),
	$ 		 = require('jquery');

var MemeItemView = require('./MemeItemView');


module.exports = MemeCollectionView = Backbone.View.extend({

	initialize : function(){
		this.render();

		//Collection Events
		this.listenTo(this.collection,'add',this.onAdd);
		this.listenTo(this.collection,'reset',this.render);
		//Application wide events
		this.listenTo(MyGAG,'meme-home-layout:changeCategory',this.changeCategory);
		this.listenTo(MyGAG,'meme-home-layout:close',this.close);
	},

	className : 'memes-container-wrapper col-xs-8',

	events : {
		'click .more-fun-button' : 'morefun'
	},

	template : require('../templates/MemeCollectionTemplate.jst'),

	paging : 0,

	onAdd  	: function(model,collection,opt){
		this.$('.memes-container').append((new MemeItemView({model : model})).$el)
	},

	changeCategory : function(category){
		this.collection.changeCategory(category);	//resets the collection with new category meme models
	},

	morefun : function(e){
		var ctx = this;
		var opts = {
			url : _.result(this.collection,'url'),
			data : {more : ++this.paging},
			dataType : 'json',
			contentType : 'application/json'
		}
		$.ajax(opts).done(function(data){
			ctx.collection.add(data);
		});
	},

	render : function(){
		var ctx = this;
		this.$el.empty();	//When collection resets , make sure the old children are removed when re rendering
		this.$el.append(this.template({category : this.collection.category}));
		this.collection.forEach(function(model){
			ctx.$('.memes-container').append((new MemeItemView({model : model})).$el)
		});
		return this;
	},

	close : function(){
		MyGAG.trigger('meme-collection:close');	//Sigal to children to close themselves
		this.remove();	//Remove itself from dom and stopListening on all kinds of events bound
	}
})