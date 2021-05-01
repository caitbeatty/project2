// pull in JSON file and populate the drop down 
d3.json("/api/v1.0/query_url").then((data)=> {
    console.log(data)

    var trace1 = {
        type: "bar",
        x: data.,
        y: closingPrices,
      };
  
      var data = [trace1];
  
      var layout = {
        title: `${stock} closing prices`,
        xaxis: {
          range: [startDate, endDate],
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear"
        }
      };
  
      Plotly.newPlot("plot", data, layout);





})  
    // var datalist = Object.values(data);

    // var ele = document.getElementById('selDataset');
    // for (var i = 0; i < datalist.length; i++) {
    //     // POPULATE SELECT ELEMENT WITH JSON.
    //     ele.innerHTML = ele.innerHTML +
    //         '<option value="' + datalist[i]+ '">' + datalist[i] + '</option>';
    // })   