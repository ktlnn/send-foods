var apiKey = "1ab12a446aade358252321bfa87f68bc";
$(document).ready(function () {
    $("#search-button").click(function (event) {
        event.preventDefault();

        window.location = "restaurant.html?q=" + $("#search-input").val();
    });


})

function handleCitySearch(cityInput){
    var cityInput = new URLSearchParams(window.location.search).get('q');
    var cityURL = "https://developers.zomato.com/api/v2.1/cities?count=6&q=" + cityInput;
    // console.log(cityURL);
    $.ajax({
        url: cityURL,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", apiKey);
            console.log(request);
        }
    });
}

function handleCuisines(){ 
    
    var cityID = request.object.responseJSON.location_suggestions[0].id;
        // url that uses cityID to connect 
        var cuisineURL = "https://developers.zomato.com/api/v2.1/search?&count=6&entity_id=" + cityID + "&entity_type=city";
        $.ajax({
            url: cuisineURL,
            method: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("user-key", apiKey);
            }
        })
}


function displayCards(){
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
}

if (typeof window.location.search != 'undefined' && new URLSearchParams(window.location.search).get('q') != null && new URLSearchParams(window.location.search).get('q').length > 0) {
    handleCitySearch();
    handleCuisines();
    displayCards();
}