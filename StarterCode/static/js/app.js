

function buildPlot() {
d3.json("../data/samples.json").then(function(data){
     console.log(data)
    
    otuID = []
    sampleValues = []

     otu_ids = data.samples.map(sample=>sample.otu_ids)
     sample_values = data.samples.map(sample=>sample.sample_values)
   
    for (i=0; i<data.samples.length; i++){
        for (k=0; k<152; k++){
        sampleValues.push(sample_values[k][i])
        otuID.push(otu_ids[k][i])
    
    }}
    
     console.log(sampleValues)
     console.log(otuID)


     var trace1 = {
        x : sampleValues,
        type : 'bar',
        name : otuID

     }

     plotData = [trace1]

     layout = {
        title: 'test'
    
     }
     Plotly.newPlot("plot", plotData, layout);


     var trace2 = {
  x: otuID,
  y: sampleValues,
  mode: 'markers',
  marker: {
    size: sampleValues,
    color : otuID
  }
};

var Bubledata = [trace2];

var layout2 = {
  title: ' Buble chart',
  showlegend: false,
  height: 800,
  width: 800
};

Plotly.newPlot('bubble', Bubledata, layout2);

    
})
}


d3.selectAll("#selDataset").on("change", updatePage);

function updatePage() {
  var dropdownMenu = d3.selectAll("#selDataset");
  var dataset = dropdownMenu.property("value")

  var x = [];
  var y = [];


  if (dataset === 'dataset1'){

    x = sampleValues;
  }
  else if (dataset === 'dataset2'){
   
    x = otuID;
  }
  
  Plotly.restyle("plot", "x", [x]);

}

buildPlot();



