Template.inThisDiscussion.helpers({
	commentsExist: function(){
		return Comments.find({topicId: Router.current().params['topicid']}).count();
	},	
	topicCommentor: function () {
		return Meteor.users.find({'profile.commentedOn': Router.current().params['topicid']}); 
	},
});