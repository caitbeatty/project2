d3.json("/api/v1.0/censustracts").then((data) => {
    // console.log(data)
    var coord_dict = {}
    var prev_geoID = 42101009400
    var geoid = 0
    var curr_arr = []
    var coord_arr = []
    var coordinates = []
    data.map(row => {
        geoid = parseInt(row[2])
        if(geoid == prev_geoID){
            curr_arr = [Number(row[6]), Number(row[5])]
            coord_arr.push(curr_arr)
            prev_geoID = geoid
            coord_dict[geoid] = coord_arr
        }
        else{
            coord_arr = []
            prev_geoID = geoid
            curr_arr = [Number(row[6]), Number(row[5])]
            coord_arr.push(curr_arr)
            coord_dict[geoid] = coord_arr
        }
        
    })
    // console.log(coord_dict)

    Object.entries(coord_dict).forEach(([key, value]) => {
            coordinates.push(value)
    });

    var removed = coordinates.splice(210)
    console.log(coordinates)

var tracts = new L.LayerGroup()

var grayscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
})

var myMap = L.map("map", {
    center: [40.007797, -75.125260],
    zoom: 11,
    layers: [
        grayscalemap
    ]
  });

  grayscalemap.addTo(myMap)

  L.polygon(coordinates, {
    color: "red",
    fillcolor: "red",
    fillOpacity: 0.25
}).addTo(myMap)

})