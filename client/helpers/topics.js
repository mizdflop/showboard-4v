orderNumber = 1;
Session.set("sortByTag", false);
Template.topics.helpers({
  thisSeries: function(){
    return Tvseries.findOne();
  },
  thisEpisode: function(){
    return Episodes.findOne();
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
      return '/img/pocast_placeholder.gif';
    } else if (this.noteType =="Article/Analysis"){
      return this.linkedArticleInfo.image;
    }    
  },
  timeAgo: function(){
    return moment(this.lastCommentTimestamp).fromNow();
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
  'click .topic-listing': function(){
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
  }

});
Template.topics.rendered = function(){

};