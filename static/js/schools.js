d3.json("/api/v1.0/schools").then((data)=> {
    
    console.log(data);

    var schools = [];
    var locations = [];
    // var latitude = [];
    // var longitude = [];


    for (var i = 0; i < data.length; i++) {
        schools.push(
            data[i][[1]]  
        );  
        
        var splitLoc = data[i][6].split(",");
        var latInt = parseFloat(splitLoc[0]);
        var longInt = parseFloat(splitLoc[1]);

        // console.log(splitLoc);
        // console.log(latInt);
        // console.log(longInt);

        locations.push(
            [latInt, longInt]
        )
    }

    console.log(locations);
    //console.log(longitude);

    var schoolMarkers = [];

    for (var i = 0; i < locations.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
        schoolMarkers.push(
            L.marker(locations[i]).bindPopup("<h1>" + schools[i] + "</h1>")
        );
    
    console.log(schoolMarkers);
}

  // Add all the cityMarkers to a new layer group.
  // Now we can handle them as one group instead of referencing each individually
  var schoolLayer = L.layerGroup(schoolMarkers);

  // Define variables for our tile layers
  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Only one base layer can be shown at a time
  var baseMaps = {
    Light: light,
    Dark: dark
  };

  // Overlays that may be toggled on or off
  var overlayMaps = {
    Schools: schoolLayer
  };

  // Create map object and set default layers
  var myMap = L.map("map", {
    center: [39.9526, -75.1652],
    zoom: 12,
    layers: [light, schoolLayer]
  });

  myMap.invalidateSize();

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

});


