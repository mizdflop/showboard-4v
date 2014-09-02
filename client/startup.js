Meteor.startup(function () {
    AccountsEntry.config({
      //logo: 'logo.png',                  // if set displays logo above sign-in options
      privacyUrl: '/privacy-policy',     // if set adds link to privacy policy and 'you agree to ...' on sign-up page
      termsUrl: '/terms-of-use',         // if set adds link to terms  'you agree to ...' on sign-up page
      homeRoute: '/sign-in',                    // mandatory - path to redirect to after sign-out
      dashboardRoute: '/topics/BreakingBad/5/9',      // mandatory - path to redirect to after successful sign-in
      profileRoute: '/dashboard',
      passwordSignupFields: 'USERNAME_AND_EMAIL',
      showSignupCode: false
    });
    $.cloudinary.config({
     cloud_name:"showverse-meteor-com"
    });
});