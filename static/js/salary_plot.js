f// pull in JSON file and populate the drop down 
d3.json("/api/v1.0/query_url").then((data)=> {
console.log(data)

    // var datalist = Object.values(data);

    // var ele = document.getElementById('selDataset');
    // for (var i = 0; i < datalist.length; i++) {
    //     // POPULATE SELECT ELEMENT WITH JSON.
    //     ele.innerHTML = ele.innerHTML +
    //         '<option value="' + datalist[i]+ '">' + datalist[i] + '</option>';
    }   

    // // Be able to click on an ID and have it recognize it - On change to the DOM, call getData()
    // d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
// function getData() {
    // var dropdownMenu = d3.select("#selDataset");
    // // Assign the value of the dropdown menu option to a variable
    // var idno = dropdownMenu.property("value");

    // //get array for data in samples 
    // var samples = Object.values(data[0].samples);

    // //create function to find the users choice
    // function checkID(sampleOutput){
    //   return sampleOutput.id ==idno;
    // }

    // //put data that used picked into a dictionary of its own
    // var requiredSample = samples.filter(checkID)[0];
    // //console.log (requiredSample)

    //make variables for the thing I need to chart otu_ids, sample_values, otu_labels 
    // var otuIds = requiredSample.otu_ids; 
    // var sampleValues = requiredSample.sample_values; 
    // var otuLabels = requiredSample.otu_labels; 

    //slice to get top ten samples
    // var slicedOtuID = otuIds.slice(0, 10);
    // var stringId = slicedOtuID.map(String)
    // stringId = stringId.map(i => 'OTU ' + i);
    // //console.log(slicedOtuID);
    // var slicedSampleValues = sampleValues.slice(0, 10);
    // var slicedOtuLabels = otuLabels.slice(0, 10);

    // //make bar chart
    //   var barData = [{
    //     x: slicedSampleValues.reverse(),
    //     y: stringId.reverse(), 
    //     text: slicedOtuLabels.reverse(),
    //     type: 'bar',
    //   }];
    
    //   var layout = {
    //     height: 600,
    //     width: 800
    //   };
    
    //   Plotly.newPlot("bar", barData, layout);


    //   // make bubble chart

    //   
  

     

//demographic info
      //get array for data in metadata
      // var demographics = Object.values(data[0].metadata);

     

      // // //put data that used picked into a dictionary of its own
      // var requiredDemo = demographics.filter(checkID)[0];
      

      // // //make chart to show id, ethnicity, gender, age, location, bbtype, wfreq
      //   var demoInfo = d3.select("#sample-metadata");

      //     // build the metadata table
      // demoInfo.html("");
      // Object.entries(requiredDemo).forEach(([key, value]) => {
      //     demoInfo.append("p").text(`${key}: ${value}`)
      // });
     
 
        



   
//   }
  
//   getData();

   
// })