// pull in JSON file and populate the drop down 
d3.json("/api/v1.0/query_url").then((data)=> {
    // console.log(data)


    var jobs = {};

    data.forEach(function(row){
        var jobTitle = row[1]
        var gender = row[0]
        var salary = row[2]

        if(!(jobTitle in jobs)){
            jobs[jobTitle] = [];
        }

        if(gender == "Male"){
            jobs[jobTitle][0]=salary
        }

        else{
            jobs[jobTitle][1]=salary
        }

    } );

    // console.log(jobs)

    var jobName = []
    var maleSalary = []
    var femaleSalary = []

   for (var item in jobs){
        jobName.push(item)
        maleSalary.push(jobs[item][0])
        femaleSalary.push(jobs[item][1])
    };

    // console.log(maleSalary)



    var male = {
        x: jobName,
        y: maleSalary,
        name: "Male",
        type: "bar"
      };
      var female = {
        x: jobName,
        y: femaleSalary,
        name: "Female",
        type: "bar"
      };
      var points = [male, female];
      var layout = {barmode: "group"};
      Plotly.newPlot('myDiv', points, layout);
     

})  
    // var datalist = Object.values(data);

    // var ele = document.getElementById('selDataset');
    // for (var i = 0; i < datalist.length; i++) {
    //     // POPULATE SELECT ELEMENT WITH JSON.
    //     ele.innerHTML = ele.innerHTML +
    //         '<option value="' + datalist[i]+ '">' + datalist[i] + '</option>';
    // })   