$(document).ready(function () {
    $("#search-button").click(function (event) {
        event.preventDefault();

        window.location = "restaurant.html?q=" +  $("#search-input").val();
    });

    
})
function handleSearchParameters(){
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
                    var cuisineID = result.restaurants;
                    for(var i=0; i < cuisineID.length; i++){
                        console.log(cuisineID[i] + "hello");
                
                    }
                });
        });

}
console.log(window.location.search);
if(typeof window.location.search != 'undefined' && new URLSearchParams(window.location.search).get('q') != null && new URLSearchParams(window.location.search).get('q').length > 0){
    handleSearchParameters();
}