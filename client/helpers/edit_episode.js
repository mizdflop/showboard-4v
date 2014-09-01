Template.edit_episode.helpers({
	editingDoc: function editingDocHelper() {
		return Episodes.findOne({_id: Session.get("episodeId")});
	},
	episodes: function(){
		return Episodes.find();
	}
});

Template.edit_episode.events({
	'click a': function () {
		Session.set("episodeId", this._id);
	}
});