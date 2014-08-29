Meteor.startup(function () {
    AccountsEntry.config({
      wrapLinks: true,                   // wraps accounts-entry links in <li> for bootstrap compatability purposes
	  homeRoute: '/',                  // MUST BE SET - redirect to this path after sign-out
  	  dashboardRoute: '/dashboard' 
    });
    Cloudinary.config({
   	 cloud_name: 'showverse-meteor-com',
    	api_key: '429115372231935',
    	api_secret: '2KqWJMhBvfhmTZXTZquj2pck88E'
});
});