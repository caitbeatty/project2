function buildMetadata() {
    d3.json("/api/v1.0/query_url")).then((data) => {

        var data1 = data
    //   var metadata = data.metadata;
    //   // Filter the data for the object with the desired sample number
    //   var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    //   var result = resultArray[0];
    //   // Use d3 to select the panel with id of `#sample-metadata`
    //   var PANEL = d3.select("#sample-metadata");
  
    //   // Use `.html("") to clear any existing metadata
    //   PANEL.html("");
  
    //   // Use `Object.entries` to add each key and value pair to the panel
    //   // Hint: Inside the loop, you will need to use d3 to append new
    //   // tags for each key-value in the metadata.
    //   Object.entries(result).forEach(([key, value]) => {
    //     PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    //   });
  
    //   // BONUS: Build the Gauge Chart
    //   buildGauge(result.wfreq);
    });
  }

  buildMetadata()