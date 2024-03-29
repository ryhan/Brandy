/*
 * Search.js
 * Domain Lookup
 *
 * isValidUrl(url)
 */

// Key-Value pairing for URL + URL occupancy
var urlQueryStore = {};

var urlify = function(s){ return 'http://' + s;};

// Check if a value is valid
var notEmpty = function(v){ return (v!=undefined && v!=null); };

jQuery(document).ready(function($) {

/*
 * isValidUrl
 * Returns a boolean determining whether 
 * a URL has content. Caches requests
 * in queryStore for faster response times.
 */
function isValidUrl(url)
{
	if (notEmpty(urlQueryStore[url]))
	{
		// We've already looked up this URL, 
		// so just return the cached result.
		return urlQueryStore[url];
	}
	else
	{
		// Query YQL to lookup the content at the URL
		yqlLookup(url, function(data){
			urlQueryStore[url] = notEmpty(data.query.results);
			return urlQueryStore[url];
		});

		return 'requested';

	}
}

/* 
 * yqlLookup
 * Looks up the body at a given URL, 
 * and passes the resulting data in JSON format
 * to a function specified as success
 */
function yqlLookup(url, success)
{
	$.ajax({
	  url : 'http://query.yahooapis.com/v1/public/yql',
	  jsonp : 'callback',
	  dataType : 'jsonp',
	  data : {
	    q : 'select * from html where url="' + url + '" and xpath="//body"',
	    format : 'json'
	  },
	  success : function(data){ return success(data);}
	});
}
}); //document.ready
