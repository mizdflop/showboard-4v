Meteor.methods({
	fetchRemoteData: function (urlString) {
		if(urlString.substring(0,4)!=="http"){
			urlString = "http://" + urlString;
		}
		console.log(urlString);
        try{
            var result = HTTP.get(urlString);
        } catch(e){
            new Error;
        }
        var Cheerio = Meteor.require('cheerio');          
		$ = Cheerio.load(result.content);
		if( $("meta[property='og:title']").attr("content") ){
			return {
				"title": $("meta[property='og:title']").attr("content"),
				"image": $("meta[property='og:image']").attr("content"),
				"description": $("meta[property='og:description']").attr("content"),
				"site_name": $("meta[property='og:site_name']").attr("content")
			};
		}
	},	
	fetchAudioURL: function(urlString) {
		//make sure submitted audio url looks like it's in the right format
		var validAudio = ['mp3', 'mp4', 'ogg', 'wbm', 'wav'];
		var strArray = urlString.split(".");
		if( _.indexOf( validAudio, _.last(strArray)) == -1 ){
			throw new Error;
	    }
	},
	save_url: function(image){
        console.log(image.upload_data.url);
        Meteor.users.update(
        	{_id: Meteor.userId() },
        	{ $set: {"profile.image": image.upload_data.url }}
        );
    }
});