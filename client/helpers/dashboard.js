Template.dashboard.helpers({
	profileImage: function(){
		return Meteor.user().profile.image;
	}	
})