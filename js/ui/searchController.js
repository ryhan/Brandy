/* Search Controller */

// Store all search related values in this object
var searchModel = {};

// Add the inputs
searchModel.$searchInput = $('#search');
searchModel.searchInput = searchModel.$searchInput[0];

// Caching
searchModel.cachedQuery = "";
searchModel.lastUpdate = (new Date()).getTime();

// Define what happens when the input changes
searchModel.$searchInput.keyup(function() 
{
  searchModel.query = searchModel.searchInput.value;
  updateResults();

  setTimeout(updateResults, 500);
});

function updateResults()
{
	searchModel.query = searchModel.searchInput.value;

	// Check if there has been a change to the query
	/*
	if (searchModel.query == searchModel.cachedQuery)
	{
		return true;
	}
	*/

	// Check if we've given enough time between requests
	var currentTime = (new Date()).getTime();
	if (currentTime - searchModel.lastUpdate < 500)
	{
		return true;
	}

	// Make a new request

	searchModel.lastUpdate = currentTime;
	
	var suggestions = _.map(suggestNames(searchModel.query), function(v)
	{

		var highlighted = v.replace(searchModel.query, 
			"<strong>"+searchModel.query+"</strong>");
		
		return {
			id: v,
			text: highlighted
		};

		//return {text: v};
		//return {text: v.replace(searchModel.query, "<strong>"+searchModel.query+"</strong")};
	});

	var ulContainer = document.createElement('div');
	var ul = document.createElement('ul');
	for( var i=0; i < suggestions.length; i++){
		var li = document.createElement('li');

		var text = document.createElement('span');
		text.innerHTML = suggestions[i].text;
		li.setAttribute('id','safeurl'+suggestions[i].id);
		li.appendChild(text);

		var availability = document.createElement('div');
		availability.setAttribute('class', 'availability');
		availability.innerHTML = availabilityChecks(suggestions[i].id);
		li.appendChild(availability);

		ul.appendChild(li);
	}
	ulContainer.appendChild(ul);

	$('#results')[0].innerHTML = ulContainer.innerHTML;
	setTimeout(updateResults, 500);

}

function availabilityChecks(text){

	var twitter = isValidHandle(text);
	var com = isValidUrl("http://"+ text+ ".com");
	var me  = isValidUrl("http://"+ text+ ".me");

	var genSpan = function(s,bool){ 
		if (bool === false){ return "<span class='active'>"+s+"</span>";}
		if (bool === true){ return "<span class='taken'>"+s+"</span>";}
		return "<span>"+s+"</span>";
	};

	return genSpan('@', twitter) + genSpan('.COM', com) + genSpan('.ME', me);
}

/*
function searchCtrl($scope)
{
	// Query model
	$scope.query = "";
	$scope.cachedQuery = "";
	$scope.cachedResults = "";
	$scope.lastUpdate = (new Date()).getTime();

	// Results model
	$scope.results = function()
	{
		// Check if the current query is already cached
		if ($scope.query == $scope.cachedQuery)
		{
			return $scope.cachedResults;
		}

		// Get the current time
		var currentTime = (new Date()).getTime();

		// If the current time is sufficiently 
		// far enough away from the last update,
		// fetch the results again.
		if (currentTime - $scope.lastUpdate > 500)
		{
			$scope.lastUpdate = currentTime;
			return fetchResults();
		}
		else
		{
			return $scope.cachedResults;
		}
	};

	// Define how to get new results
	var fetchResults = function()
	{
		// Define how to update the cache
		var updateResultCache = function(arr){
			$scope.cachedQuery = $scope.query;
			$scope.cachedResults = arr;
			return arr;
		};

		// Handle empty query
		if ($scope.query == "")
		{ 
			return updateResultCache([]); 
		}

		// Suggest options
		var suggestions = _.map(suggestNames($scope.query), 
			function(v){return {text: v};});
		return updateResultCache(suggestions);
	};

}*/