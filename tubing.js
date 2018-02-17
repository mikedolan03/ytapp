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
								<button name = "Play: ${items[currentIndex].snippet.title} "class="js-play-video" data='${items[currentIndex].id.videoId}'>
							 	<img src='${items[currentIndex].snippet.thumbnails.medium.url}' alt='${items[currentIndex].snippet.title}' data='${items[currentIndex].id.videoId}'>
							 	</button>
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
	$('.js-results-shown').html(`<h3>New Search Results. Showing ${data.pageInfo.resultsPerPage} results out of ${data.pageInfo.totalResults} videos found.</h3>`).prop('hidden', false);

	$('.js-results').prop('hidden', false).html(results);


	$('.js-next').removeClass( "hidden" ).addClass( "show" );
	$('.js-next').attr("data", `${data.nextPageToken}`);

	getNextButtonInput();

	getVideoPlayInput();
}

function getVideoPlayInput() {

	$('.js-play-video').click( event => {
		event.preventDefault();
		$('.modal').addClass("show").removeClass("hidden");
		console.log($(event.target));
		let vidID = $(event.target).attr('data');
		let videoHtml = `<iframe title="Embedded YouTube Video" id="ytplayer" type="text/html" class="video-player"
			src="https://www.youtube.com/embed/${vidID}?cc_load_policy=1"
			frameborder="0" allowfullscreen></iframe> 
			<p><a href="#" class="js-close">X Close</a></p>`; 

		$('.video-content').html( videoHtml );

		$('.js-close').click( event => {
			event.preventDefault();
			$('.modal').prop('hidden', false).addClass("hidden").removeClass("show");
		});
	});
	
	
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