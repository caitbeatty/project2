d3.json("/api/v1.0/censustracts").then((data) => {
    console.log(data)
    var censusTracts = []

    

    data.forEach(function(row){
        var dict = {}
        var record = "0"
        var recordnum = row[1]
        var geoid = row[2]
        var coordinates = []

        // while(recordnum = record){
        //     var coordinate0 = row[5]
        //     var coordinate1 = row [6]
        //     coordinates.push(coordinates0, coordinates1)
        // }
        // if(recordnum == "0"){
        //     dict["type"] = "Feature"
        //     dict ["GEOID"] = geoid
        //     dict['geometry'] = {}
        //     dict['geometry']['type'] = 'Polygon'
        //     dict['geometry']["coordinates"] = [[coordinates]]
        //     var coordinate0 = row[5]
        //     var coordinate1 = row[6]
        //     coordinates.push(coordinate0, coordinate1)
        // }
        // censusTracts.push(dict)
        // console.log(coordinates)
    })
    // console.log(censusTracts)

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