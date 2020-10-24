$(document).ready(function() {


var clientKey = "5544a9b0-1613-11eb-b538-2f88524d0231"

// api call to get latitude and longitude
$("#zip").click(function(event){
    event.preventDefault();
    var userEntry = $("#search").val();
    console.log("i was clicked")
    console.log(userEntry);
    var url = "https://app.zipcodebase.com/api/v1/search?apikey="+clientKey+"&codes="+ userEntry + "&country=US"

    $.ajax({
        "url": url,   
        "dataType": "json"
    }).then(function(response){
        var rerturnedResults = response.results[userEntry]
        var lat = rerturnedResults[0].latitude
        var lon = rerturnedResults[0].longitude
        console.log(lat, lon)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?per_page=5&lat=" + lat + "&lon=" + lon,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
                "x-rapidapi-key": "cfe7afdf80mshe8e756593cc844dp178cccjsn43a92dfc0b42"
            }
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    })
})
})