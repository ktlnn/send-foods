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
    var cityURL = "https://developers.zomato.com/api/v2.1/cities?count=10&q=" + cityInput;
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
        var cuisineURL = "https://developers.zomato.com/api/v2.1/search?&count=10&entity_id=" + cityID + "&entity_type=city";
        $.ajax({
            url: cuisineURL,
            method: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("user-key", apiKey);
            }
        }).then(function (result) {
            console.log(result);
            callWeatherApi(cityInput);
            var cuisineID = result.restaurants;
            console.log(cuisineID);
            var iUsed = [];
            var i = 0;

            for (var j = 0; j < 6; j++) {
                i = Math.floor(Math.random() * cuisineID.length);

                while (iUsed.includes(i)) {
                    i = Math.floor(Math.random() * cuisineID.length);
                }

                iUsed.push(i);

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
                createCardContent.append($("<p>").addClass("res-info").html("Address: " + resAddr + '<br>' + "Phone Number: " + resPhone))
                createCard.append(createCardContent);

                var resLink = results.restaurant.url;
                createCardAction.append($("<a>").attr("href", resLink).text('See More').attr("target", "_blank"));

                createCard.append(createCardAction);

                containerId.append(createCard);
            }
        });
    });

}
// weather API
var APIKey = "d292af27d806c0fcfa7e75827ed7045b"

var callWeatherApi = function (cityInput) {
    var cityInput = new URLSearchParams(window.location.search).get('q');
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityInput + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var weatherIcon = response.weather[0].icon;
        $("#cityName").html(response.name + " (" + new Date().toLocaleDateString() + ")");
        $("#mainIcon").html("<img src='" + "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png" + "'>")
        $("#temperature").html("Temperature: " + response.main.temp + " &#8457;");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH ")

    });
}

console.log(window.location.search);
if (typeof window.location.search != 'undefined' && new URLSearchParams(window.location.search).get('q') != null && new URLSearchParams(window.location.search).get('q').length > 0) {
    handleSearchParameters();
}

