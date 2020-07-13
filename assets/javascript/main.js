

// test run

$(document).ready(function () {
    $("#search-button").click(function(event){
        console.log(event.target);
        // alert("button clicked");
        // console.log("button clicked");
    
    var apiKey = "1ab12a446aade358252321bfa87f68bc";
    // removes all child nodes
    $("#search-input").empty();
    // keeps track of search-input value, which is now linked to cityInput
    var cityInput = $("#search-input").val();
    var cityURL = "https://developers.zomato.com/api/v2.1/cities?count=6&q=" + cityInput;
    console.log(cityURL);
    $.ajax({
        url: cityURL,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", "1ab12a446aade358252321bfa87f68bc");
            console.log(request);
        }
    }).then(function (response) {
        console.log(response);

    
        








    });
});
})


