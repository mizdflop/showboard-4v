UI.registerHelper('getSquareImage',function (user, size){
     if(user === "me") user = Meteor.userId();
     var baseImgUrl = Meteor.users.findOne({_id: user}).profile.image;
     var cloudinaryFilter = "c_fill,g_face,h_" + size + ",w_" + size + "/";
     var posOfUpload =  baseImgUrl.indexOf("upload/")+7;
     return baseImgUrl.substring(0, posOfUpload) + cloudinaryFilter + baseImgUrl.substring(posOfUpload);
});
