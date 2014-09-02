Template.admin_remove_topics.helpers({
	topics: function () {
		return Topics.find();
	}
});

Template.admin_remove_topics.events({
	'click button': function () {
		Topics.remove({_id: this._id});
	}
});