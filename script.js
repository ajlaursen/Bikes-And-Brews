$(document).ready(function () {
  var trailData;
  var lat;
  var lon;
  var clientKey = "5544a9b0-1613-11eb-b538-2f88524d0231";

  // api call to get latitude and longitude
  $("#zip").click(function (event) {
        event.preventDefault();
        var userEntry = $("#search").val();
        console.log("i was clicked");
        console.log(userEntry);
        var url =
        "https://app.zipcodebase.com/api/v1/search?apikey=" +
        clientKey +
        "&codes=" +
        userEntry +
        "&country=US";

        $.ajax({
        url: url,
        dataType: "json",
        }).then(function (response) {
            var rerturnedResults = response.results[userEntry];
            lat = rerturnedResults[0].latitude;
            lon = rerturnedResults[0].longitude;
            console.log(lat, lon);
            getTrails(lat, lon);
        });
    });



    function getTrails(lat, lon){   
            var settings = {
            async: true,
            crossDomain: true,
            url:
                "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?per_page=5&lat=" +
                lat +
                "&lon=" +
                lon,
            method: "GET",
            headers: {
                "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
                "x-rapidapi-key": "cfe7afdf80mshe8e756593cc844dp178cccjsn43a92dfc0b42",
            },
            };

        $.ajax(settings).then(function (response) {
            console.log(response);
            $("#display-table").removeClass("d-none");
            trailData = response.data;
            for (let index = 0; index < trailData.length; index++) {
                const element = trailData[index];
                $("#trail" + index).text(element.name);
            }
        });

        $(".trail-row").click(function () {
            $("#trail-name-modal").empty();
            $("#trail-length").empty();
            $("#trail-diff").empty();
            $("#trail-descrip").empty();
            $("#trail-img").empty();
            var dataId = $(this).attr("data-id");
            console.log(dataId);
            $("#trailInfo1").modal("show");
            $("#trail-name-modal").text(trailData[dataId].name);
            $("#trail-length").text("Length: " + trailData[dataId].length + " miles");
            $("#trail-diff").text("Difficulty: " + trailData[dataId].difficulty);
            $("#trail-descrip").text(trailData[dataId].description);
            $("#trail-img").attr("src", trailData[dataId].thumbnail);
            $("#trail-link").click(function () {
                window.location.href = trailData[dataId].url;
            });
        });
    };
});

