d3.json("/api/v1.0/censustracts").then((data) => {
    console.log(data)

    // var dict = {}
    // var prev_geoID = 42101009400
    // var curr_geoID = 0
    // var coord_dict = {}
    // // var coord_arr = []
    // var curr_arr = []
    // data.forEach(function(row){
    //     // console.log(row)
    //     curr_geoID = parseInt(row[2])
    //     // console.log(curr_geoID)
    //    // console.log(row)
    //    var coord_arr = []

    //    if(curr_geoID == prev_geoID) {
    //      curr_arr = [row[6], row[5]]
    //     //  console.log(curr_arr)
    //     //  coord_arr = coord_arr
    //      coord_arr.push(curr_arr)
    //      prev_geoID = curr_geoID
    //    }
    //    else {
    //     //    console.log(prev_geoID, coord_arr)
    //        //dict[geoID] = prev_geoID
    //        var coord_arr = []
    //        prev_geoID = curr_geoID
    //        curr_arr = [row[6], row[5]]
    //        coord_arr.push(curr_arr)
           
    //    }

    // })
    var coord_dict = {}
    var geoid = 0
    var prev_geoID = 42101009400
    var list_value = []
    // var prev_row = []
    var master = []
    data.map(row => {
        geoid = parseInt(row[2])
        if(geoid == prev_geoID){
            list_value = [row[6], row[5]]
            master.push(list_value)
        }
        else{
            master = []
            list_value = [row[6], row[5]]
            master.push(list_value)
        }
        console.log(master)
        
    })



})

// CODE FOR THE MAP

// var tracts = new L.LayerGroup()
// var grayscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/light-v10",
//   accessToken: API_KEY
// })

// var map = L.map("map", {
//     center: [39.9526, -75.1652],
//     zoom: 10,
//     layers: [
//         grayscalemap
//     ]
//   });

//   grayscalemap.addTo(map)

//   var url = "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Census_Tracts_2010/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token="
//   d3.json(url, function (data){
//   L.geoJSON(data,{
//       color: "red"
//   }).addTo(tracts);
//   tracts.addTo(map)
// })