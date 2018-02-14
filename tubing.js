/*
Build a page with a simple search form that allows the user to search YouTube videos.
Based on the search results the page will display thumbnail images of videos that match the search.

key: AIzaSyDYPt_m-1WwC6boAsqjjjmkqQmbtH8tK2I

https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyDYPt_m-1WwC6boAsqjjjmkqQmbtH8tK2I
     &part=snippet,contentDetails,statistics,status

GET {base_URL}/search?part=snippet
                     &q=YouTube+Data+API
                     &type=video
                     &videoCaption=closedCaption
                     &key={YOUR_API_KEY}

https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=space&type=video&key=AIzaSyDYPt_m-1WwC6boAsqjjjmkqQmbtH8tK2I
  
*/

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
	const query = {
	  'part':'snippet',
	  'maxResults': 1,
	  'q':`${searchTerm}`,
	  'type': 'video',
	  'key': 'AIzaSyDYPt_m-1WwC6boAsqjjjmkqQmbtH8tK2I'
	};
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
	console.log(result.snippet.title);
	console.log(result.snippet.thumbnails.default);

	let searchResults = `<h3>${result.snippet.title}</h3>
						 <a href='http://www.youtube.com/watch?v=${result.id.videoId}'> <img src='${result.snippet.thumbnails.default.url}' alt=''></a>`;

	return searchResults; 
}

function displaySearchData(data) {
 	const results = data.items.map((item, index) => renderResult(item));
	// $('.js-search-results').html(results);
 	console.log(results);
	$('.js-results').html(results);
}

function getUserInput(){
	$('.js-search-button').click( event => {
		event.preventDefault();
		getDataFromApi( $('input').val(), displaySearchData );

	});
}

$( getUserInput() );