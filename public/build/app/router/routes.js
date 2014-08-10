var $ = require('jquery'),
	_ = require('underscore');

/* Models */

var Meme = require('../models/Meme');

/* Collections */

/* Views  */
var MemeLargeItemView = require('../views/MemeLargeItemView');


module.exports.map = {

	'' 				: 'home',

	'memes/:cat' 	: 'category',

	'memes/:cat/:id' 		: 'meme'
}

module.exports.callbacks = {

	home : function(){
		if(this.meme_large) this.close_meme_large();	//Change to routers events
		this.meme_home = new MemeHomeLayoutView;
		$('.app').append(this.meme_home.$el);
	},

	category : function(cat){
		this.meme_home.changeCategory(cat);
		scrollTo(0,0);
	},

	meme : function(cat,id){
		var ctx = this;
		if(this.meme_home) this.close_meme_home();		//Change to routers events

		var meme = new Meme;
			meme.fetch({url : '/api/memes/'+cat+'/'+id}).done(function(){
				ctx.meme_large = new MemeLargeItemView({model : meme});
				$('.app').append(ctx.meme_large.$el);
			})
	}
}