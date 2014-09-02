Template.admin_remove_comments.helpers({
	comments: function () {
		return Comments.find();
	}
});

Template.admin_remove_comments.events({
	'click button': function () {
		Comments.remove({_id: this._id});
	}
});