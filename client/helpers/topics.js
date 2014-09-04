orderNumber = 1;
Session.set("sortByTag", "ALL");
Template.topics.helpers({
  thisSeries: function(){
    return Tvseries.findOne();
  },
  thisEpisode: function(){
    return Episodes.findOne();
  },
  episodeNumberFormat: function(epNumber){
    return epNumber < 10 ? "0" + epNumber.toString() : epNumber;
  },
  scenesArray: function(){
    return Episodes.findOne().scenes;
  },
  charactersArray: function(){
    return Episodes.findOne().characters;
  },
  isActive: function(item) {
    if(Session.equals("visibleTopics", item)){
      return "active";
    }
    return false;
  },
  visibleOnButton: function(){
    return Session.get("filterBy");
  },
  orderNumber: function(){
    return orderNumber++;
  },
  getAuthor: function(){
    if( this.noteType=="Audio/Podcast"){
      return this.linkedAudioInfo.author;
    } else if (this.noteType =="Article/Analysis"){
      return this.linkedArticleInfo.author;
    }
  },
  getSite: function(){
    if( this.noteType=="Audio/Podcast"){
      return this.linkedAudioInfo.site;
    } else if (this.noteType =="Article/Analysis"){
      return this.linkedArticleInfo.site;
    }

  },
  getImage: function(){
    if( this.noteType=="Audio/Podcast"){
      return '/podcasts.png';
    } else if (this.noteType =="Article/Analysis"){
      return this.linkedArticleInfo.image;
    } else if(this.noteType =="Original Thought") {
      return this.originalThoughtImageSource;
    }  
  },
  isOriginalComment: function(){
    return this.noteType =="Original Thought" ? true: false;
  },
  timeAgo: function(){
    return moment(this.lastCommentTimestamp).fromNow();
  },
  topicsArray: function(){
    var allTopics = Topics.find().fetch();
    var allTagsArray = _.map( allTopics, function(ele, key){
      return ele.tags;
    });
    var allCharTags = _.map( Episodes.findOne().characters, function(ele, key){
       return ele.characterName;
    });
    var allSceneTags = _.map( Episodes.findOne().scenes, function(ele, key){
       return ele.sceneDesc;
    });
    allTagsArray = _.unique(_.flatten(allTagsArray));
    return  _.difference(allTagsArray, allCharTags, allSceneTags);
  },
  totalDiscussions: function(){
    return Comments.find().count();
  },
  totalCommentors: function(){
    var count;
    Comments.distinct("userId", function(error, result){
      if(result){
        Session.set("userCount",result.length);
        return count;
      }
    });
    return Session.get("userCount");
  },
  numberFollowers: function(){
   return Meteor.users.find({'profile.follows': this._id}).count()
  },
  numberCommentors: function(){
    return Meteor.users.find({'profile.commentedOn': this._id}).count()
  }

});

Template.topics.events({
  'click .topicTabSorter': function(e, t){
    Session.set("visibleTopics", e.target.text);
  },
  'click #filterButton > ul > li': function(e){
    Session.set("filterBy", e.target.text);
  },
  'click #addTopic': function(){
     $('#addTopicModal').modal('show');
  },
  'click .clickToTopic': function(){
    var linkparams = {
      "series": Router.current().params["series"],
      "season": Router.current().params["season"],
      "episode": Router.current().params["episode"],
      "topicid": this._id
    };
    Router.go("showtopic", linkparams);
  },
  'click .dropdown-menu li': function(e){
      Session.set("sortByTag", [$(e.target).attr("value")]);
  },
  'click .sorter li':function(e){
    if(e.target.innerHTML =="ALL" ||
      e.target.innerHTML =="MY BOOKMARKS" ||
      e.target.innerHTML =="TOP 10"
    ){ 
      Session.set("sortByTag", e.target.innerHTML);
      //console.log(Session.get("sortByTag"));
    }
  },
  'mouseenter .getPopover': function(e){
    console.log(this._id);
    if ( e.currentTarget.className==="getPopover associatedCommentors"){
      var theUsers = Meteor.users.find({'profile.commentedOn': this._id}).fetch();
      var theTitle  = "Members discussing this topic";
    } else {
      var theUsers = Meteor.users.find({'profile.follows': this._id}).fetch();
      var theTitle  = "Members following this topic";
    }
    if(theUsers.length==0){
      return false;
    }
    $(e.target).popover({
      html: true,
      content: function() { 
        var theHTML = 
          _.map(theUsers, function(user){
            return '<div class="userInPopover"><img width="45px" src="' + user.profile.image  + '">' + user.username + '</div>';
          });
        return theHTML;
      },
      title: function(){ return theTitle ; }
    });
    $(e.target).popover('show');
  },
  'mouseleave .getPopover': function(e){
    $(e.target).popover('destroy');
  }

});
Template.topics.rendered = function(){

};