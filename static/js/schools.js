// Pull data using API call to SQLite database
d3.json("/api/v1.0/censustracts").then((data) => {
    var coord_dict = {};
    var prev_geoID = 42101009400;
    var geoid = 0;
    var curr_arr = [];
    var coord_arr = [];
    var coordinates = [];

    // Loop through data to find lat and lng for each coordinate point 
    // in a polygon for every census tract
    // Save data in a dictionary
    data.map(row => {
        geoid = parseInt(row[2])
        if (geoid == prev_geoID) {
            curr_arr = [parseFloat(row[6]), parseFloat(row[5])]
            coord_arr.push(curr_arr);
            prev_geoID = geoid;
            coord_dict[geoid] = coord_arr;
        }
        else {
            coord_arr = [];
            prev_geoID = geoid;
            curr_arr = [parseFloat(row[6]), parseFloat(row[5])];
            coord_arr.push(curr_arr);
            coord_dict[geoid] = coord_arr;
        };
    });

    // Push coordinate records into an array
    Object.entries(coord_dict).forEach(([key, value]) => {
        coordinates.push(value);
    });


    // Remove records with NaN lat or lng values
    coordinates.splice(210,1);

    console.log(coordinates)
    // Create LayerGroups for tract and household income information
    // each layerGroup will be added to myMap once populated
    var tracts = new L.LayerGroup();
    var district = new L.LayerGroup();

    // Create layers to be the background of the map
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

    // Create a map with default layers to display
    var myMap = L.map("map", {
        center: [40.007797, -75.125260],
        zoom: 11,
        layers: [
            outdoormap,
            tracts
        ]
    });
    // set outdoormap as the default layout when page is loaded
    outdoormap.addTo(myMap);

    // Create polygon layer pulling data from the coordinates array
    // Add data to tracts LayerGroup
    L.polygon(coordinates, {
        color: "purple",
        fillcolor: "purple",
        fillOpacity: 0.25
    }).addTo(tracts);
    // Add tracts LayerGroup to myMap
    tracts.addTo(myMap);

    // Define baseMaps object to hold base layers
    var baseMaps = {
        "Outdoors": outdoormap,
        "Grayscale": grayscalemap,
        "Satellite": satellitemap
    };

    // Create overlay object to hold overlay layer
    var overlayMaps = {
        "Census Tracts": tracts,
        "Schools": district
    };

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    // Function to detemine marker size based on household income
    function markerSize(score) {
        return score / 8
    };

    // Add circleMarkers to represent income values per GEOID
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
    
        //var schoolMarkers = [];
    
        for (var i = 0; i < locations.length; i++) {

            // var colors = {
            //     orange: '#ffa500',
            //     blue: '#0000ff',
            //     green: '#008000',
            //     pink: '#ffc0cb',
            //     red: '#ff0000',
            //     yellow: '#ffff00'
            // };
        
            // var markerOptions = {
            //     opacity: 1,
            // };
        
            // switch(school_type[i].value) {
            //     case "Neighborhood":
            //         markerOptions.color = colors.orange;
            //         break;
            //     case "Citywide":
            //         markerOptions.color = colors.blue;
            //         break;
            //     case "Special Admit":
            //         markerOptions.color = colors.green;
            //         break;
            //     case "Alternative":
            //         markerOptions.color = colors.pink;
            //         break;
            //     case "Virtual":
            //         markerOptions.color = colors.red;
            //         break;
            //     case "'Citywide With Criteria'":
            //         markerOptions.color = colors.pink;
            //         break;
            //  }
        
             //var marker = new L.circleMarker(markerLocation,markerOptions).addTo(map);

            var schoolMarkers = new
                L.circleMarker((locations[i]),
                {
                    radius: markerSize(scores[i]),
                    fillColor: "green",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                    // create popup values to represent household income for each GEOID
                    // add to household LayerGroupr>" + "<hr>"+ "School Type: " + scho
                }).bindPopup("<h4>" + "<strong>" + schools[i] + "</strong>"+ "</h4>" + "<h5>" + "<hr>"+ "Grade Level: " + grade_level[i] + "<br>" + "<hr>" + "Type: " + school_type[i] + "<br>" + "<hr>"+ "SPR Percent Points Earned: " + scores[i] + "%" + "</h5>").addTo(district)
        ;
        
        console.log(schoolMarkers);
    }
    
       district.addTo(myMap);

    })
});