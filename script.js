$("#searchBtn").on("click", function(event){
  event.preventDefault();
  
  var citySearch = $("#city-search").val().trim();
var APIKey = "856c8252f2e2bf1bf60c5ee8bf0df557";

// Here we are building the URL we need to query the database



var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?" +
"q=" + citySearch +"&units=imperial&appid=" + APIKey;



  var forecastDiv = $("#forecastDiv");

/////// Weather ///////////////


$.ajax({
  url: queryWeatherURL,
  method: "GET"
})
// We store all of the retrieved data inside of an object called "response"
.then(function(response) {
 
  var currentDate = moment().format('l');
  console.log(response);
  console.log(response.coord.lat);
  console.log(response.coord.lon);
  
  uviAPI_Call(response.coord.lat, response.coord.lon);
  
        $(".city").html(response.name + " (" + currentDate + " )");
        $(".temp").text("Temperature: " + response.main.temp +" °F");
        $(".humidity").text("Humidity: " + response.main.humidity + " %");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".UV").text("UV Index: " + response.coord.lat, response.coord.lon)


  });


////////////// forecast 5 /////////////////////

 

    function uviAPI_Call (lat, lon){

      var queryUVI_URL = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&APIKey=${APIKey}`;

      $.ajax({
        url: queryUVI_URL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
      
          console.log(response);

      
       
       
       
        });


    
    
    } 

    


      var queryForcast5URL = "https://api.openweathermap.org/data/2.5/forecast?" +
      "q="+ citySearch +"&units=imperial&appid=" + APIKey;
      
      $.ajax({
        url: queryForcast5URL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(data) {
      
          console.log("data list",data.list);
    
          var forecastList = data.list;
        
  
    // for(var i = 0; i < forecastList.length; i++) {
    
      // if(forecastList[i].dt_txt.indexOf("15:00:00")!==-1){
        var cardCol = $("<div>").addClass("col-md-2");
        var card = $("<div>").addClass("card bg-primary text-white");
        var forecastCard = $("<div>").addClass("card-body p-2");
    
      var forecastDate = $("<h6>").addClass("card-title").text(forecastList[0].dt_txt);
       var forecastTemp = $("<p>").addClass("card-text").text("Temp: " + forecastList[0].main.temp_max);
       var forecastHum = $("<p>").addClass("card-text").text("Humidity: " + forecastList[0].main.humidity);
     
       cardCol.append(card.append(forecastCard.append(forecastDate ,forecastTemp ,forecastHum)));
       forecastDiv.append(cardCol);

    // forecastDiv.append(forecastCard);
    // cardCol.append(forecastDate,card,forecastHum);
    
      // }
    
       //}
       
        });

        var h1 = $("<h1>")
        h1.text("Test")
    $(".forecast").append(h1)
    });