
/// url var

var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

/// display var

var RESULT_HTML_TEMPLATE = (


'<div class="row">' +
'<div class="col-12">' +
'<div class="js-result-form">' +
 '<div class="js-vidprev"> </div>'+ '<p>Click the Thumbnail to view</p>' +
 '<br>'+
'<p><span class="js-title"></span></p>' +
'<br>'+
'<p>Channel Title: <span class="js-channel"></span></p>' +
'<p>Description: <span class="js-desc"></span></p>' +
 '<br>' +
'</div>'+
'</div>'+
'</div>'



);



function getDataFromAPI(searchTerm, callback, t){
    var query = {
  
        part: 'snippet',
        key: 'AIzaSyD9FdxktJMqanXM8-9r7nEj1jduipYJlf4',
        q: searchTerm,
        maxResults: 6,
        type: 'video',
        pageToken: t

    }
     console.log('LOADED');

    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);

    
}


function renderResult(item) {
  var template = $(RESULT_HTML_TEMPLATE);
  

  var videoID=item.id.videoId;
  var thumbnails_default=item.snippet.thumbnails.medium.url;
  console.log(thumbnails_default);

  template.find(".js-vidprev").append('<a id="linktoVid" href="http://www.youtube.com/watch?v=' + videoID +'">' +
'<img id="imgTD" src="' + thumbnails_default + '"/>' + '</a>');
  template.find(".js-title").text(item.snippet.title);
  template.find(".js-channel").text(item.snippet.channelTitle);
  template.find(".js-desc").text(item.snippet.description);
  return template;
}


function displayYouTubeSearchData(data) {
	console.log(data.items[0]);
  var results = data.items.map(function(item, index) {
  	console.log(item);
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query-text');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromAPI(query, displayYouTubeSearchData, null);
  });
}

$(watchSubmit);

