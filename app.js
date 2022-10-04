
function buildPlot(subject_id) {
  d3.json("samples.json").then(function (data) {
    result = data.samples.filter(sampleObj => sampleObj.id == subject_id)[0];
    console.log(result)

    otu_ids = result.otu_ids
    otu_labels = result.otu_labels
    sample_values = result.sample_values




    data = [{y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
    x: sample_values.slice(0, 10).reverse(),
    text: otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"}]

    layout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 },
      xaxis: { title: 'sample_values' },
      yaxis: { title: 'otu_ids' },

    }

    Plotly.newPlot("bar", data, layout);


    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
    }};

    var Bubledata = [trace2];

    var layout2 = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30 }
    };

    Plotly.newPlot('bubble', Bubledata, layout2);


  })
}

selector = d3.select('#selDataset')
d3.json("samples.json").then(function (data) {
  subject_names = data.names
  subject_names.forEach((subject) => {
    selector
      .append("option")
      .text(subject)
      .property("value", subject);
  })
  demo(subject_names[0])
  buildPlot(subject_names[0])
});

function demo(subject_id){
  d3.json("samples.json").then(function (data) {
   meta_data = data.metadata.filter(sampleObj => sampleObj.id == subject_id)[0]
   console.log(meta_data)
   panel = d3.select('#sample-metadata')
   panel.html("")

   Object.entries(meta_data).forEach(([key, value]) => {
    panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });
  })

}

  function optionChanged(subject_id) {
    demo(subject_id)
    buildPlot(subject_id)
  }

