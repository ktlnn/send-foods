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
                  // used console to go through "result" object and found where the info for restaurants is located
            // keeping track of restaurant info 
            var cuisineID = result.restaurants;
            // since restaurant info is located in an array, for loop is able to be used
            // this forward loop allows "for" the card being created inside "for" loop to access info from database
            for (var i = 0; i < cuisineID.length; i++) {
                console.log(cuisineID[i] + "hello");
                // keeping track of new <div> being created with jquery (lines 53-60)
                // adds class that allows for css style to be applied
                var createCardContainer = $("<div>").addClass("card-container").attr("id", "card" + i);
                $("#result-cards").append(createCardContainer);
                var containerId = $("#card" + i);
                var createCard = $("<div>").addClass("create-card");
                var createCardImage = $("<div>").addClass("card-image");
                var createCardContent = $("<div>").addClass("card-content");
                var createCardAction = $("<div>").addClass("card-action");
                // keeping track of array found which is where restaurant info is located using console 
                var results = result.restaurants[i];
                createCardImage.append($("<p>").addClass("card-title").text(results.restaurant.name))
                // appends image tag to var createCardImage
                // adds class that allows for css style to be applied
                // gives image source attr which displays image found using consle
                createCardImage.append($("<img>").addClass("card-image").attr("src", results.restaurant.thumb))

                



                createCard.append(createCardImage);

                var resRating = results.restaurant.user_rating.aggregate_rating;
                
                createCardContent.append($("<p>").addClass("res-rating").html("Rating: " + resRating + " stars"));
                var resAddr = results.restaurant.location.address;
                var resPhone = results.restaurant.phone_numbers;
                createCardContent.append($("<p>").addClass("res-info").html("Address: " + resAddr + '<br>' + "Phone Number: " + resPhone))
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