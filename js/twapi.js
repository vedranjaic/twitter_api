// Declare variables to hold twitter API url and user name
// var twitter_api_url = 'http://search.twitter.com/search.json';
var twitter_api_url = 'https://api.twitter.com/1.1/search/tweets.json';
var twitter_user    = 'vedranjaic';

// Enable caching
jQuery.ajaxSetup({ 
	cache: true
});

// Send JSON request
// The returned JSON object will have a property called "results" where we find
// a list of the tweets matching our request query
$.getJSON(
	// change the rpp=3 to whatever number you want
	twitter_api_url + '?callback=?&rpp=3&q=from:' + twitter_user,
	function(data) {
		$.each(data.results, function(i, tweet) {
		// Uncomment line below to show tweet data in Fire Bug console
		// Very helpful to find out what is available in the tweet objects
		//console.log(tweet);

		// Before we continue we check that we got data
			if(tweet.text !== undefined) {
			// Calculate how many hours ago was the tweet posted
				var date_tweet = new Date(tweet.created_at);
				var date_now   = new Date();
				var date_diff  = date_now - date_tweet;
				var hours      = Math.round(date_diff/(1000*60*60));

				// Build the html string for the current tweet
				var tweet_html = '<li>';

				tweet_html    += tweet.text;
				tweet_html    += '<div class="tweet_hours">';
				tweet_html    += '<a href="http://www.twitter.com/';
				tweet_html    += twitter_user + '/status/' + tweet.id + '">' + hours;
				tweet_html    += ' hours ago</a></li>';

				// Append html string to tweet_container div
				$('#tweet_container').append(tweet_html);
			}

			// hide the loading message
			jQuery('#loadingmessage').hide(); 

		});
	}
);