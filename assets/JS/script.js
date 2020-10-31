$(document).ready(function () {
  var trailData;
  var lat;
  var clientKey = "5544a9b0-1613-11eb-b538-2f88524d0231";
  let service;

  function getUserLocation(event) {
    //prevent submit default action
    event.preventDefault();

    //checks to make sure geo location is avaialble on the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        getTrails(lat, lon);
        getBreweries(lat, lon);
      });
    }
  }

  function getBreweries(lat, lon) {
    var searchTerm = "brewery";
    var returnedFields = [
      "name",
      "business_status",
      "formatted_address",
      "place_id",
      "photos",
      "rating",
    ];
    //set the location using imported google Maps library
    var location = new google.maps.LatLng(lat, lon);
    //create request object
    const request = {
      location: location,
      keyword: searchTerm,
      radius: "50000",
      fields: returnedFields,
    };
    ///create node for maps service to use instead of map object
    service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    //submit request to google
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        //add results to brew rows
        for (var i = 0; i < 5; i++) {
          var ele = $("#brew" + i);
          ele.text(results[i].name);
          ele.attr("data-place-id", results[i].place_id);
        }
      }
    });
  }

  function showBreweryDetails() {
    //capture place id from clicked row
    var placeID = $(this).attr("data-place-id");
    //add request parameters
    const request = {
      placeId: placeID,
      fields: [
        "name",
        "formatted_address",
        "place_id",
        "opening_hours",
        "rating",
        "photo",
        "website"
      ],
    };
    //make request to google for place details
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        //add data to hidden modal
        $("#brew-title").text(place.name);

        //get day and set to 0 index value
        var dateObj = new Date();
        var dayNum = dateObj.getDay() - 1;
        var days = place.opening_hours.weekday_text;
        $("#brew-hours").empty();
        //loop though weekday opening hours and append to modal
        for (let i = 0; i < days.length; i++) {
          const day = days[i];
          var dayEle = $("<div>");
          dayEle.text(day);
          //make today bold
          if (i === dayNum) {
            dayEle.attr("class", "font-weight-bold");
          }
          $("#brew-hours").append(dayEle);
        }

        $("#brew-rating").text(place.rating);
        $("#brew-address").text(place.formatted_address);
        $("#brew-image").attr("src",place.photos[0].getUrl);
        $("#brew-image").attr("style","height: auto;");
        $("#brew-image").attr("style","max-width: 100%;");
        $("#brew-image").attr("class","img-fluid");
        $("#brew-link").click(function () {
          window.open(place.website, '_blank');
        });
        //show hidden modal
        $("#brewInfo1").modal("show");
      }
    });
  }

  ///Event Listeners
  $("#user-location").click(getUserLocation);
  $(".brew-row").click(showBreweryDetails);

  // api call to get latitude and longitude from user provided zip code
  $("#zip").click(function (event) {
    event.preventDefault();
    var userEntry = $("#search").val();
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
      getTrails(lat, lon);
      getBreweries(lat, lon);
    });
  });

// getTrails function grabs the list of trails from the provided latitude and longitude from either api or current location and returns trail data

  function getTrails(lat, lon) {
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

// populates modal for trail information

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
  }
});
