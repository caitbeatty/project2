d3.json("/api/v1.0/phillyschools").then((data)=> {
    
    console.log(data);

    var schools = [];
    var locations = [];
    var scores = [];
    var grade_level = [];
    var school_type = [];

    for (var i = 0; i < data.length; i++) {
        schools.push(
            data[i][[1]]  
        );  

        scores.push(
            data[i][[9]]  
        ); 

        grade_level.push(
            data[i][[3]]  
        ); 

        school_type.push(
            data[i][[4]]  
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
            L.marker(locations[i]).bindPopup("<h1>" + schools[i] + "<br>" + "<hr>"+ "Grade Level: " + grade_level[i] + "<br>" + "<hr>"+ "School Type: " + school_type[i] + "<br>" + "<hr>"+ "SPR PERCENT POINTS EARNED: " + scores[i] + "%" + "</h1>")
        );
    
    console.log(schoolMarkers);
}

  // Add all the cityMarkers to a new layer group.
  // Now we can handle them as one group instead of referencing each individually
    var schoolLayer = L.layerGroup(schoolMarkers);

    // Define variables for our tile layers
    var outdoormap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: API_KEY
    });


    var grayscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    })

    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        maxZoom: 18,
        id: "mapbox/satellite-v9",
        accessToken: API_KEY
    });

    // Only one base layer can be shown at a time
    var baseMaps = {
        "Outdoors": outdoormap,
        "Grayscale": grayscalemap,
        "Satellite": satellitemap
    };

    // Overlays that may be toggled on or off
    var overlayMaps = {
      Schools: schoolLayer
    };

    // Create map object and set default layers
    var myMap = L.map("map", {
      center: [39.9526, -75.1652],
      zoom: 12,
      layers: [outdoormap, schoolLayer]
    });

    myMap.invalidateSize();

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

  });
