$(document).ready(function() {
    console.log("Main Script Loaded");
    var page = 1;
    
    $("#search-btn").click(function(event){
        // console.log($("#search").val());
        // When Clicking search, the list should empty to show new results.
        $("#brewery-list").empty();

        // https://api.openbrewerydb.org/breweries/search?query=Death%20Avenue&per_page=5&page=1
        var searchStr = encodeURI($("#search").val());
        $.ajax({
            type: "GET",
            url: `https://api.openbrewerydb.org/breweries/search?query=${searchStr}&per_page=5&page=1`,
            success: function(data){
                console.log(data);
                loadBreweryInUI(data);
                page = page + 1
            },
            fail: function(data) {
                console.log("FAILED");
            },
            always: function(data) {
                console.log("ALWAYS");
            }
        });

    });

    
    $("#load-more-btn").click(function(event){
        // console.log("Load More");

        // https://api.openbrewerydb.org/breweries/search?query=Death%20Avenue&per_page=5&page=1
        var searchStr = encodeURI($("#search").val());
        $.ajax({
            type: "GET",
            url: `https://api.openbrewerydb.org/breweries/search?query=${searchStr}&per_page=5&page=${page}`,
            success: function(data){
                // console.log(data);
                loadBreweryInUI(data);
                page = page + 1
            },
            fail: function(data) {
                console.log("FAILED");
            },
            always: function(data) {
                console.log("ALWAYS");
            }
        });

    });

    
});


function loadBreweryInUI(data) {
    // console.log(data);
    for (i = 0; i < data.length; i++) {
        // console.log(data[i]);
        // We Need name, brewery_type, state, city, website_url
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
