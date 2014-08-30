//needs to be fixed to work with different series
Meteor.publish("episodes", function(seasonNumber, episodeNumber){
	return Episodes.find({seasonNumber: parseInt(seasonNumber), episodeNumber: parseInt(episodeNumber)});
});
//fix this... dealing with a space
Meteor.publish("tvseries", function(seriesTitle){
	return Tvseries.find({seriesTitle: "Breaking Bad"});
});
Meteor.publish("topics", function(topicid){
	return Topics.find({_id: topicid});
});
Meteor.publish("topicsForEpisode", function(seasonNumber, episodeNumber){
	var theId = Episodes.findOne({seasonNumber: parseInt(seasonNumber), episodeNumber: parseInt(episodeNumber)})._id;
	return Topics.find({episodeId: theId});
});
Meteor.publish("numberOfDiscussions", function(seasonNumber, episodeNumber){
	var theId = Episodes.findOne({seasonNumber: parseInt(seasonNumber), episodeNumber: parseInt(episodeNumber)})._id;
	return Comments.find({parentId:"0"});


//	return  Comments.distinct("userId" ).count();
});



Meteor.publishComposite('comments', function(topicId, commentId) {
	return{
		find: function(){
			if(commentId){
				return Comments.find(
					{$or: [
						{_id: commentId},
						{parentId: commentId}
					]}
				);
			} else {
				return Comments.find({topicId: topicId});
			}
		},
		children: [
			{
				find: function(comment){
					return Meteor.users.find(
						{_id: comment.userId},
						{ limit: 1, fields: { profile: 1, username: 1 } }
					);
					console.log('hit me');
				}
			}
		]
	}

});


/*Meteor.publish("comments", function(topicId){
	return Comments.find({topicId: topicId});
});
*/
