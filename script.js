$(document).ready(function() {


var clientKey = "5544a9b0-1613-11eb-b538-2f88524d0231"

// api call to get latitude and longitude
$("#zip").click(function(event){
    event.preventDefault();
    var userEntry = $("#search").val();
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
    })
})
})