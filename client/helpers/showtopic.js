var initialEnterText = "Add an observation...";
Session.set("sortedBy", "Most Recent");
Template.showtopic.helpers({
	formatDate: function (timestamp) {
		return moment().format('LL', timestamp);
	},
  	episodeNumberFormat: function(epNumber){
    	return epNumber < 10 ? "0" + epNumber.toString() : epNumber;
  	},
	initialText: function(){
		return initialEnterText;
	},
	timeAgo: function( passedTime ){
         return moment( passedTime ).fromNow();
     },
     reverseMe: function( arr ){
     	return arr.reverse();
     },
     alreadyRecommended: function(arr){
     	return arr.indexOf(Meteor.userId()) ==-1 ? false : true;
     },
     nestedComment: function(idstr){
     	return Comments.find({parentId: idstr}, {sort: {timestamp: 1}});
     },
     getProfileImage: function(){
     	return Meteor.users.findOne({_id:this.userId}).profile.image;
     },
     getUserName: function (){
     	return Meteor.users.findOne({_id:this.userId}).username;
     },
     followed: function(){
     	return Meteor.user().profile.follows.indexOf(Router.current().params['topicid'])==-1 ? false : true; 
     },
     threadContext: function(){
     	return {
     		series: Router.current().params['series'],
     		season: Router.current().params['season'],
     		episode: Router.current().params['episode'],
     		topicid: Router.current().params['topicid'],
     		commentid: this._id
     	}
     },
     currentFilter: function(){
     	return Session.equals("sortByTag", false) ? false : Session.get("sortByTag"); 
     },
     totalWithFilter: function(){
     	return Session.get("sortedIds").length;
     },
     placmentInArrayFilter: function(){
     	return Session.get("sortedIds").indexOf(Router.current().params['topicid']) + 1;	
     },
     notFirstinArray: function(){
     	return Session.get("sortedIds").indexOf(Router.current().params['topicid']);
     },
     notLastinArray: function(){
     	return Session.get("sortedIds").reverse().indexOf(Router.current().params['topicid']);
     },
     sortedBy: function(){
     	return Session.get("sortedBy");
     },
     isOriginalThought: function(str){
    	return str =="Original Thought" ? true: false;
     },
     isAudio: function(str){
    	return str =="Audio/Podcast" ? true: false;
     },
     isArticle: function(str){
    	return str =="Article/Analysis" ? true: false;
     },
     numCommentors: function(){
     	return Meteor.users.find({'profile.commentedOn': Router.current().params['topicid']}).count(); 
     }          
});

Template.showtopic.events({
	'click #newObservation': function () {
		if( $('#newObservation').text() === initialEnterText){
			$('#newObservation').text("").css("color", "#000000");
		}		
	},
	'keydown #newObservation': function(e){
		//console.log( $('#newObservation').text() );
		if(e.keyCode==13 && !e.shiftKey){
			insertComment( Router.current().params['topicid'], Meteor.userId(), $('#newObservation').text(), 0 );

			$('#newObservation').text("");
		}
		if( $('#newObservation').text() === initialEnterText){
			$('#newObservation').text("").css("color", "#000000");
		}		
	},
	'click .recommended-link': function(){
		commentRecommended(this._id, Meteor.userId());
	},
	'keydown .interiorReply': function(e){

		if(e.keyCode==13 && !e.shiftKey){
			insertComment( Router.current().params['topicid'], Meteor.userId(), e.currentTarget.innerText, this._id );
			$(e.currentTarget).html('');
		}
	},
	'click #linkToTopics': function(){
		Router.go(
			"topics",
			{
				episode: Router.current().params['episode'],
				season: Router.current().params['season'],
				series: Router.current().params['series']
			}
		);
	},
	'click #followDiscussion': function(){
		Meteor.users.update(
			{_id: Meteor.userId() },
			{$push: { "profile.follows": Router.current().params['topicid'] }}
		);
	},
	'click #unfollowDiscussion': function(){
		Meteor.users.update(
			{_id: Meteor.userId() },
			{$pull: { "profile.follows": Router.current().params['topicid'] }}
		);
	},
	'click #goToNext': function(){
     	Router.go("showtopic", 
     		{
	     		series: Router.current().params['series'],
	     		season: Router.current().params['season'],
	     		episode: Router.current().params['episode'],
	     		topicid: Session.get("sortedIds")[Session.get("sortedIds").indexOf(Router.current().params['topicid']) + 1]

     		}
     	);
     },
     'click #goToPrev': function(){
     	Router.go("showtopic", 
     		{
	     		series: Router.current().params['series'],
	     		season: Router.current().params['season'],
	     		episode: Router.current().params['episode'],
	     		topicid: Session.get("sortedIds")[Session.get("sortedIds").indexOf(Router.current().params['topicid']) - 1]

     		}
     	);
     },	
     'click .btn-social': function(){
     	alert("Social features are not yet active but will be soon.")
     },
     'click .dropdown-menu li': function(e){
     	Session.set("sortedBy", e.target.innerText);
     },
     'click .tag': function(){
     	Session.set("sortByTag", [this.valueOf()]);
     	Router.go("topics", {
	     	series: Router.current().params['series'],
	     	season: Router.current().params['season'],
	     	episode: Router.current().params['episode'],
     	});
     }
});

//combine into a callback function on inssert. this isn't going to work like this. 
function insertComment(topicId, userId, commentText, parent){
	var updateModifer = {};
	if( Comments.find({userId: Meteor.userId() }).count()== 0){
		updateModifer =  {$inc: {numberCommentors: 1, numberComments: 1}, $set: {lastCommentTimestamp: Date()} };
	} else {
		updateModifer = {$inc: {numberComments: 1}, $set: {lastCommentTimestamp: Date() }};
	}
	if( Meteor.user().profile.commentedOn === undefined || Meteor.user().profile.commentedOn.indexOf(topicId) === -1){
		Meteor.users.update(

			{_id: Meteor.userId() },
			{$push: { "profile.commentedOn": topicId }}
		);
	}
	Topics.update({_id: topicId}, updateModifer, function(error, numberModified){
		if(numberModified){
			insertNew( topicId, Meteor.userId(), commentText, parent );
		}
	});
	Comments.update({_id: parent}, {$inc: {numberReplies: 1}});
}


function insertNew ( topicId, userId, commentText, parent) {
	Comments.insert(
	{ 
		topicId: topicId,
		userId: userId,
		commentText:commentText,
		parentId: parent,
		timestamp: Date(),
		recommendedBy: []
	});
}

function commentRecommended(commentId, userId){
	Comments.update({_id: commentId}, {$inc: {numberRecommendations: 1}, $push: {recommendedBy: userId}})

}