var apiKey = "1ab12a446aade358252321bfa87f68bc";
$(document).ready(function () {
    $("#search-button").click(function (event) {
        event.preventDefault();

        window.location = "restaurant.html?q=" + $("#search-input").val();
    });


})
function handleSearchParameters() {
    //console.log(event.target);
    // alert("button clicked");
    // console.log("button clicked");

    
  

    // keeps track of search-input value, which is now linked to cityInput
    var cityInput = new URLSearchParams(window.location.search).get('q');
    var cityURL = "https://developers.zomato.com/api/v2.1/cities?count=6&q=" + cityInput;
    console.log(cityURL);
    $.ajax({
        url: cityURL,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", apiKey);
            // console.log(request);
        }
    }).then(function (response) {
        console.log(response);
        
        // used console.log(response) to target the location id
        // keeping track of the location id with cityID variable
        var cityID = response.location_suggestions[0].id;
        // url that uses cityID to connect 
        var cuisineURL = "https://developers.zomato.com/api/v2.1/search?&count=6&entity_id=" + cityID + "&entity_type=city";
        $.ajax({
            url: cuisineURL,
            method: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("user-key", apiKey);
            }
        }).then(function (result) {
            console.log(result);
            // handleCitySearch(ids here)
            var cuisineID = result.restaurants;
            for (var i = 0; i < cuisineID.length; i++) {
                console.log(cuisineID[i] + "hello");
                var createCardContainer = $("<div>").addClass("card-container").attr("id", "card" + i);
                $("#result-cards").append(createCardContainer);
                var containerId = $("#card" + i);
                var createCard = $("<div>").addClass("create-card");
                var createCardImage = $("<div>").addClass("card-image");
                var createCardContent = $("<div>").addClass("card-content");
                var createCardAction = $("<div>").addClass("card-action");

                var results = result.restaurants[i];

                createCardImage.append($("<p>").addClass("card-title").text(results.restaurant.name));

                createCardImage.append($("<img>").addClass("card-image").attr("src", results.restaurant.thumb));

                



                createCard.append(createCardImage);

                var resRating = results.restaurant.user_rating.aggregate_rating;
                
                createCardContent.append($("<p>").addClass("res-rating").html("Restaurant Rating: " + resRating + " "));
                var resAddr = results.restaurant.location.address;
                var resPhone = results.restaurant.phone_numbers;
                createCardContent.append($("<p>").addClass("res-info").html("Address: " + resAddr + '<br>' + "Phone Number: " + resPhone));
                createCard.append(createCardContent);

                var resLink = results.restaurant.url;
                createCardAction.append($("<a>").attr("href", resLink).text('See More').attr("target", "_blank"))

                createCard.append(createCardAction);

                containerId.append(createCard);
            }
        });
    });

}
console.log(window.location.search);
if (typeof window.location.search != 'undefined' && new URLSearchParams(window.location.search).get('q') != null && new URLSearchParams(window.location.search).get('q').length > 0) {
    handleSearchParameters();
}

function showMeData(response){
    console.log(response);
}

function handleCitySearch(cityID, entityType, callback){
    var queryUrl = "https://developers.zomato.com/api/v2.1/location_details?entity_id=" + cityID + "&entity_type=" + entityType; // <-- inputs go here
    $.ajax({
        url: queryUrl,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", apiKey);
        }
    }).then(function(response){
        // console.log(response);
        callback(response);
    });
}
// handleCitySearch("36932", "group", showMeData);

function handleCities(search, callback){
    var queryUrl = "https://developers.zomato.com/api/v2.1/cities?q=" + search; // <-- inputs go here
    $.ajax({
        url: queryUrl,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", apiKey);
        }
    }).then(function(response){
        // console.log(response);
        callback(response);
    });
}
// handleCities("New York", showMeData);


function handleLocations(search, callback){
    var queryUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + search; // <-- inputs go here
    $.ajax({
        url: queryUrl,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", apiKey);
        }
    }).then(function(response){
        // console.log(response);
        callback(response);
    });
}
function handleCuisines(cityID, callback){
    var queryUrl = "https://developers.zomato.com/api/v2.1/search?&count=6&entity_id=" + cityID + "&entity_type=city"; // <-- inputs go here
    $.ajax({
        url: queryUrl,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", apiKey);
        }
    }).then(function(response){
        // console.log(response);
        callback(response);
    });
}
handleLocations("New York", function(response){
    // console.log("My custom callback");
    // console.log(response);
    handleCuisines(response.location_suggestions[0].entity_id,
        function(cuisineResult){
            // console.log("my city")
            // console.log(cityResult);
            displayStuff(response, cuisineResult);
        }
    )
});

function displayStuff(locationResponse, cuisineResult){
    console.log({locationResponse, cuisineResult});

}