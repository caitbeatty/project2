d3.json("/api/v1.0/censustracts").then((data) => {
    // console.log(data)
    var censusTracts = []
    data.forEach(function(row){
        var dict = {}
        var record = "0"
        var recordnum = row[1]
        var geoid = row[2]
        var coordinates = []
        var coordinate0 = row[5]
        var coordinate1 = row[6]

        if(recordnum == "0"){
            dict["type"] = "Feature"
            dict ["GEOID"] = geoid
            dict[coordinates][0] = coordinate0
            dict[coordinates][1] = coordinate1
        }
        censusTracts.push(dict)
    })
    // console.log(censusTracts)
})