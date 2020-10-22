// zipcode api xTowP5iWQjEW3GuTr3HQyng5phTT92b4n8VLexpiAXKIWJ2DdUtKWWWn0n9AC8t4
// zipcode js key js-iRo2591br0iSVen6HjZGUOQNQEIHIYpGlap3HgnFdoKPdK2mQDhrjhxclXmfPFo7
// https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>

// "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians";
var zipcode = "33813";
var clientKey = "xTowP5iWQjEW3GuTr3HQyng5phTT92b4n8VLexpiAXKIWJ2DdUtKWWWn0n9AC8t4"
$("#searchbuttonplaceholder").click(function(){
   var userEntry = $("textinputplaceholder").val().Trim()
   var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians";
   $.ajax({
    "url": url,   
    "dataType": "json"
}).then(function(response) {
    console.log(response);
}
)