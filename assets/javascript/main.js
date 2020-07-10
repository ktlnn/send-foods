// var apiKey = "3NuZ0rqQoo5l9qccbJwvgSu9CxgVE76lv8JwKsD9WjchA_xLd953uH3Ysv5gmvirAvKLSib8DLySFbnaVU02TNx4bO5smMN7uex6CSoJn1kFk_pF7zLxcKgvh4wHX3Yx";
// var queryURL = "https://api.yelp.com/v3/businesses/search" + "&api_key=3NuZ0rqQoo5l9qccbJwvgSu9CxgVE76lv8JwKsD9WjchA_xLd953uH3Ysv5gmvirAvKLSib8DLySFbnaVU02TNx4bO5smMN7uex6CSoJn1kFk_pF7zLxcKgvh4wHX3Yx";

// // var req = "a0e6bab7c7msh0938a97ba929936p1d8000jsn69c1376a3d01";
// // var unirest = require("unirest");
// // var req = unirest("POST", "https://yelpapiserg-osipchukv1.p.rapidapi.com/getAutocomplete");
// // req.headers({
// // 	"x-rapidapi-host": "YelpAPIserg-osipchukV1.p.rapidapi.com",
// // 	"x-rapidapi-key": "a0e6bab7c7msh0938a97ba929936p1d8000jsn69c1376a3d01",
// // 	"content-type": "application/x-www-form-urlencoded",
// // 	"useQueryString": true
// // });
// // req.form({});
// // req.end(function (res) {
// // 	if (res.error) throw new Error(res.error);
// // 	console.log(res.body);
// // });

// $.ajax({
//     url: queryURL,
//     method: "GET"
//  }).then(function(response){
//     console.log(queryURL);
//     console.log(response);
// });

// test run

$(document).ready(function (){
    $("#search-input").empty();
    var cityInput = $("#search-input").val();



    var cityURL = "https://developers.zomato.com/api/v2.1/cities?count=12&q=" + cityInput;

    $.ajax({
        url: cityURL,
        method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("user-key", "173297606dd309e858d947e8c0e0562c");
        },

    })

});