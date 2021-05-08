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
    var household = new L.LayerGroup();

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
        "Household Income": household
    };

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    // Function to detemine marker size based on household income
    function markerSize(income) {
        return income / 10000
    };

    // Add circleMarkers to represent income values per GEOID
    d3.json("/api/v1.0/census_household").then((householdData) => {
        householdData.map(row => {
            var lat = row[4]
            var lng = row[5]
            var householdIncome = row[1]
            var GEOID = row[3]
            marker = new L.circleMarker([lat, lng], {
                radius: markerSize(householdIncome),
                fillColor: "aqua",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
                // create popup values to represent household income for each GEOID
                // add to household LayerGroup
            }).bindPopup(`<strong>Household Income: $</strong>${householdIncome}<br>\
            <strong>GEOID:</strong> ${GEOID}`).addTo(household);

            // add household LayerGroup to myMap
            household.addTo(myMap);
        });
    });
});
