Template.edit_series.helpers({
	editingDoc: function editingDocHelper() {
		return Tvseries.findOne({_id: Session.get("seriesId")});
	},
	tvseries: function(){
		return Tvseries.find();
	}
});

Template.edit_series.events({
	'click a': function () {
		Session.set("seriesId", this._id);
	}
});