// Pull data using API call to SQLite datbase
d3.json("/api/v1.0/censustracts").then((data) => {
    var coord_dict = {}
    var prev_geoID = 42101009400
    var geoid = 0
    var curr_arr = []
    var coord_arr = []
    var coordinates = []

    // Loop through data to find lat and lng for each coordinate point 
    // in a polygon for every census tract
    // Save data in a dictionary
    data.map(row => {
        geoid = parseInt(row[2])
        if (geoid == prev_geoID) {
            curr_arr = [parseFloat(row[6]), parseFloat(row[5])]
            coord_arr.push(curr_arr)
            prev_geoID = geoid
            coord_dict[geoid] = coord_arr
        }
        else {
            coord_arr = []
            prev_geoID = geoid
            curr_arr = [parseFloat(row[6]), parseFloat(row[5])]
            coord_arr.push(curr_arr)
            coord_dict[geoid] = coord_arr
        }
    })

    // Push coordinate records into an array
    Object.entries(coord_dict).forEach(([key, value]) => {
        coordinates.push(value)
    });
    
    // Remove records with NaN lat or lng values
    coordinates.splice(210)

    var tracts = new L.LayerGroup()

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

    outdoormap.addTo(myMap)

    // Create polygon layer pulling data from the coordinates array
    L.polygon(coordinates, {
        color: "red",
        fillcolor: "red",
        fillOpacity: 0.25
    }).addTo(tracts)

    tracts.addTo(myMap)

    // Define baseMaps object to hold base layers
    var baseMaps = {
        "Outdoors": outdoormap,
        "Grayscale": grayscalemap,
        "Satellite": satellitemap
    }

    // Create overlay object to hold overlay layer
    var overlayMaps = {
        "Census Tracts": tracts
    }

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
})