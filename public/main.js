$(document).ready(function() {
    console.log("Main Script Loaded");
    var page = 1;

    $("#search-form").submit(function() {
        $("#brewery-list").empty();
        page = 1; // Set Page to 1 before new search
        searchBrewery($("#search").val(), page);
        page = page + 1;
        return false;
    });
    
    $("#search-btn").click(function(event){
        // When Clicking search, the list should empty to show new results.
        $("#brewery-list").empty();
        page = 1; // Set Page to 1 before new search
        searchBrewery($("#search").val(), page);
        page = page + 1;

    });

    
    $("#load-more-btn").click(function(event){
        searchBrewery($("#search").val(), page);
        page = page + 1;

    });

    
});


function searchBrewery(searchStr, currentPage) {
    var searchStr = encodeURI(searchStr);
    $.ajax({
        type: "GET",
        url: `https://api.openbrewerydb.org/breweries/search?query=${searchStr}&per_page=5&page=${currentPage}`,
        success: function(data){
            loadBreweryInUI(data);
        },
        fail: function(data) {
            console.log("FAILED");
        },
        always: function(data) {
            console.log("ALWAYS");
        }
    });
}



function loadBreweryInUI(data) {
    for (i = 0; i < data.length; i++) {
        var breweryElement = $(`
        <li class="list-group-item">
          <div>
            <div class="card-body">
              <h5 class="card-title">${data[i].name}</h5>
              <h6 class="card-subtitle mb-2">${data[i].brewery_type}</h6>
              <h6 class="card-subtitle mb-2 text-muted">${data[i].state} - ${data[i].city}</h6><a href="${data[i].website_url}"
                class="card-link">Link to website</a>
            </div>
          </div>
        </li>
        `);

        
        $("#brewery-list").append(breweryElement);
    }
}
