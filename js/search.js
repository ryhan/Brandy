/*
 * Search.js
 * Domain Lookup
 */

// Key-Value pairing for URL + URL occupancy
var queryStore = {};

// Check if a value is valid
var notEmpty = function(v){ return (v!=undefined && v!=null); };

/*
 * isValidUrl
 * Returns a boolean determining whether 
 * a URL has content. Caches requests
 * in queryStore for faster response times.
 */
function isValidUrl(url)
{
	if (notEmpty(queryStore[url]))
	{
		// We've already looked up this URL, 
		// so just return the cached result.
		return queryStore[url];
	}
	else
	{
		// Query YQL to lookup the content at the URL
		yqlLookup(url, function(data){
			queryStore[url] = notEmpty(data.query.results);
			return queryStore[url];
		});

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