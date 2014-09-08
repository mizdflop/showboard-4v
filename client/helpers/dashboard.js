Template.dashboard.helpers({
	profileImage: function(){
		return Meteor.user().profile.image;
	},
	imageUploading: function(){
		return Session.get("profileImgUploading");
	}	
})

Template.dashboard.events({
	'dragover .testDrop': function (e) {
		e.preventDefault();
	}
	//'drop .testDrop': function (e) {
	//	e.preventDefault();
		//console.log(e.originalEvent.dataTransfer.files[0]);
	//	Meteor.call('cloudinary_upload', 1, function (error, result) {});

});