Router.configure({
  layoutTemplate: 'layout' 
});

Router.map(function () {
	this.route('topics', {
		path: '/topics/:series/:season/:episode',
		template: 'topics',
	    onBeforeAction: function () {
    	  AccountsEntry.signInRequired(this);
    	},
		waitOn: function(){
			return [
				Meteor.subscribe("episodes", this.params.season, this.params.episode),
				Meteor.subscribe("tvseries", this.params.series),
				Meteor.subscribe("topicsForEpisode", this.params.season, this.params.episode)
			];
		},
		action: function () {
      		if (this.ready()){
         		this.render();
         	}
         },
         data: {
         	topicsList: function () {
         		if(Session.get("sortByTag")){
         			var sorted = Topics.find({tags: {$in: Session.get("sortByTag") }}, {sort: {timestamp: -1}}).fetch();
         		} else {
         			var sorted = Topics.find({}, {sort: {timestamp: -1}}).fetch(); 
         		}
         		Session.set("sortedIds", _.pluck(sorted, "_id"));
	         	return sorted;
	        }
         }
	});
});


Router.map(function () {
	this.route('showtopic', {
		path: '/topics/:series/:season/:episode/:topicid',
		template: 'showtopic',
	    onBeforeAction: function () {
    	  AccountsEntry.signInRequired(this);
    	},
		waitOn: function(){
			return [
				Meteor.subscribe("episodes", this.params.season, this.params.episode),
				Meteor.subscribe("tvseries", this.params.series),
				Meteor.subscribe("topics", this.params.topicid),
				Meteor.subscribe("comments", this.params.topicid)
			];
		},
		data: {
			topic: function () { return Topics.findOne( {} ) ; },
			episode: function () { return Episodes.findOne(); },
			series: function () { return Tvseries.findOne(); },
			comments: function () { return Comments.find({parentId: "0"}, {sort: {timestamp: -1}});} ,

		},		
		action: function () {
			
      		if (this.ready()){
      			orderNumber=1;
         		this.render();
         	}
         }
	});
});

Router.map(function () {
	this.route('showtopicone', {
		path: '/topics/:series/:season/:episode/:topicid/:commentid',
		template: 'showtopic',
	    onBeforeAction: function () {
    	  AccountsEntry.signInRequired(this);
    	},
		waitOn: function(){
			return [
				Meteor.subscribe("episodes", this.params.season, this.params.episode),
				Meteor.subscribe("tvseries", this.params.series),
				Meteor.subscribe("topics", this.params.topicid),
				Meteor.subscribe("comments", this.params.topicid, this.params.commentid)
			];
		},
		data: {

			topic: function () { return Topics.findOne( {} ) ; },
			episode: function () { return Episodes.findOne(); },
			series: function () { return Tvseries.findOne(); },
			comments: function () { return Comments.find({parentId: "0"}, {sort: {timestamp: -1}});} ,
		},		
		action: function () {
			
      		if (this.ready()){
      			orderNumber=1;
         		this.render();
         	}
         }
	});
});



Router.map(function () {
	this.route('dashboard', {
		path: '/dashboard',
		template: 'dashboard',
	    onBeforeAction: function () {
    	  AccountsEntry.signInRequired(this);
    	},
		waitOn: function(){
			//return [
			//	Meteor.subscribe("tvseries")
			//];
		},
		action: function () {
      		if (this.ready()){
         		this.render();
         	}
         }
	});

});


Router.map(function () {
	this.route('admin_index', {
		path: '/admin',
	});
});

Router.map(function () {
	this.route('add_series', {
		path: '/admin/add_series',
		template: 'add_series',
	    onBeforeAction: function () {
    	  AccountsEntry.signInRequired(this);
    	},
		waitOn: function(){
			return [
				Meteor.subscribe("tvseries")
			];
		},
		action: function () {
      		if (this.ready()){
         		this.render();
         	}
         }
	});

});

Router.map(function () {
	this.route('add_episode', {
		path: '/admin/add_episode',
		template: 'add_episode',
	    onBeforeAction: function () {
    	  AccountsEntry.signInRequired(this);
    	},
		waitOn: function(){
			return [
				Meteor.subscribe("episodes"),
				Meteor.subscribe("tvseries")
			];
		},
		action: function () {
      		if (this.ready()){
         		this.render();
         	}
         }
	});
});
	