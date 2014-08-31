Template.inThisDiscussion.helpers({
	topicCommentor: function () {
		//current user will be included by default.
		//want to make sure current user has made a comment to this thread, 
		//otherwise exclude
		if( Comments.find({userId: Meteor.userId()}).count() ){
			return Meteor.users.find(); 
		} else {
			return Meteor.users.find( {_id: {$ne: Meteor.userId()}} );
		}
	},
});