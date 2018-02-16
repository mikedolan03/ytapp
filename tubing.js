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

function getDataFromApi(searchTerm, callback, pageTok = '') {

console.log("getting data: " + pageTok);

	const query = {
	  'part':'snippet',
	  'maxResults': 6,
	  'q':`${searchTerm}`,
	  'type': 'video',
	  'pageToken': `${pageTok}`,
	  'key': 'AIzaSyDYPt_m-1WwC6boAsqjjjmkqQmbtH8tK2I'
	};
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result, index, dataLength) {
	console.log(result.snippet.title);
	console.log(result.snippet.thumbnails.default);

	let searchResults ='';

	if(index === 0) {
		searchResults = `<div class='row starterrow' id='${index}'>` 
	}

	searchResults += `<div class="col-4" id='${index}'>
							<h3>${result.snippet.title}</h3>
						 	<a href='http://www.youtube.com/watch?v=${result.id.videoId}&t=1m'> 
						 	<img src='${result.snippet.thumbnails.default.url}' alt=''>
						 	</a>
					 </div> <!-- classdiv-->`;

	return searchResults; 
}


function renderData(items){

 	let searchResults = '';

 	for (let rowI = 0; rowI < items.length; rowI = rowI+3){

		for (let i = 0; i < 3; i++) {



			if(i==0) { 
				searchResults += `<div class='row'>`; 
			}

			let currentIndex = rowI + i;  

			if(currentIndex >= items.length) { break; }

			console.log("current item: " +items[currentIndex].id.videoId);


			searchResults += `<div class="col-4" id='${currentIndex}'>
								<div class="box">
								<div class="box-content">
								<h3>${items[currentIndex].snippet.title}</h3>
							 	<a href='http://www.youtube.com/watch?v=${items[currentIndex].id.videoId}&t=1m'> 
							 	<img src='${items[currentIndex].snippet.thumbnails.medium.url}' alt=''>
							 	</a>
							 	</div>
							 	</div>
						 </div> <!-- classdiv-->`;

			if(i==2) {
				searchResults += `</div>`;
			}
		}
	}

	return searchResults;

}


function displaySearchData(data, status) {

	console.log	("ditems: " + data.items.length);
	console.log	("dit 1: " + data.items[1].id.videoId);

	const results = renderData(data.items); 

 	//const results = data.items.map((item, index) => renderResult(item, index, data.items.length));
	console.log("status"+status);
 	//results = data.items;

	// $('.js-search-results').html(results);
 	//console.log(results);
	$('.js-results').html(results);

	$('.js-next').removeClass( "hidden" ).addClass( "show" );
	$('.js-next').attr("data", `${data.nextPageToken}`);

	getNextButtonInput();



}

function getNextButtonInput(){
		$('.js-next').click( event => {
		event.preventDefault();
		console.log($('.js-next').attr('data')); 
		getDataFromApi( $('input').val(), displaySearchData, $('.js-next').attr('data') );

		document.body.scrollTop = 0;
    	document.documentElement.scrollTop = 0;

	});
}

function getUserInput(){
	$('.js-search-button').click( event => {
		event.preventDefault();
		getDataFromApi( $('input').val(), displaySearchData);

	});
}

$( getUserInput() );