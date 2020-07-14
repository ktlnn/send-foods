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

    var apiKey = "1ab12a446aade358252321bfa87f68bc";
    // removes all child nodes

    // keeps track of search-input value, which is now linked to cityInput
    var cityInput = new URLSearchParams(window.location.search).get('q');
    var cityURL = "https://developers.zomato.com/api/v2.1/cities?count=6&q=" + cityInput;
    console.log(cityURL);
    $.ajax({
        url: cityURL,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", "1ab12a446aade358252321bfa87f68bc");
            // console.log(request);
        }
    }).then(function (response) {
        console.log(response);
        // var cuisine =
        // used console.log(response) to target the location id
        // keeping track of the location id with cityID variable
        var cityID = response.location_suggestions[0].id;
        // url that uses cityID to connect 
        var cuisineURL = "https://developers.zomato.com/api/v2.1/search?&count=6&entity_id=" + cityID + "&entity_type=city";
        $.ajax({
            url: cuisineURL,
            method: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("user-key", "1ab12a446aade358252321bfa87f68bc");
            }
        }).then(function (result) {
            console.log(result);
            // using console to target where restaurant information lies in object
            // keeping track using cuisineID variable
            var cuisineID = result.restaurants;
            // forward loop used since object displays restaurant information as an array
            // will allow for card to be created and information to be displayed onto the page
            for (var i = 0; i < cuisineID.length; i++) {
                console.log(cuisineID[i] + "hello");
                // keeping track of the variable that is creating a container for cards
                // adding class to style the card container
                // adding attribute "id" that gives createCardContainer id = "card" + i 
                var createCardContainer = $("<div>").addClass("").attr("id", "card" + i);
                // appending card container to id "result-cards" in html 
                $("result-cards").append(createCardContainer);
                // keeping track of the variable that is creating the div for the card/card image/ card content/ card link 
                // adding class to style each card component
                var containerId = $("#card" + i);
                var createCard = $("<div>")//.addClass("");
                var createCardImage = $("<div>")//.addClass("");
                var createCardContent = $("<div>")//.addClass("");
                // var createCardLink = $("<div>").addClass("");

                // keeping track of starting position for targeting specific items in result object
                var results = result.restaurants[i];

                createCardImage.append($("<p>").text(results.restaurant.name));
                createCardImage.append($("<img>").attr("src", results.restaurant.thumb));

                createCard.append(createCardImage);

                var resRating = results.restaurant.user_rating.aggregate_rating;
                createCardContent.append($("<p>").html("Restaurant Rating: " + resRating));

                var resAddress = results.restaurant.location.address;
                createCardContent.append($("<p>").html("Restaurant Address: " + resAddress));

                var resPhone = results.restaurant.phone_numbers;
                createCardContent.append($("<p>").html("Restaurant Phone Number: " + resPhone));

                createCard.append(createCardContent);

                containerId.append(createCard);








            }
        });
    });

}
console.log(window.location.search);
if (typeof window.location.search != 'undefined' && new URLSearchParams(window.location.search).get('q') != null && new URLSearchParams(window.location.search).get('q').length > 0) {
    handleSearchParameters();
}