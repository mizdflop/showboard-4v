Template.admin_index.helpers({
  adminRoutes: function() {
    var theRoutes = _.filter(Router.routes, function(item) {  return item.originalPath.substring(0,6)=="/admin" ;});
    return theRoutes;
  }

});

Template.admin_index.events({
/*  'click #oneButton': function(){
    $container.isotope({ filter: '.sortme' });
    console.log('here');
  },
  'click #inspect': function(){
      Meteor.call('remoteGet', $('#urlToInspect').val(),function(error,response){
          Session.set('returnedValues', response); // returns [0] title, [1] description, [2] image
      })
  }
*/
});
Template.admin_index.rendered = function(){
/*
  $container = $('#container');
  // init
  $container.isotope({
    // options
    itemSelector: '.item',
    layoutMode: 'fitRows'
  });
*/
};