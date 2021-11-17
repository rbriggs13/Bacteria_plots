function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples and metadata array. 
    var sampleData = data.samples;
    var metadata = data.metadata;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = sampleData.filter(sampleObject => sampleObject.id === sample);
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var bacteriaData = sampleArray[0];
    var result = resultArray[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = bacteriaData.otu_ids;
    var otuLabels = bacteriaData.otu_labels;
    var sampleValues = bacteriaData.sample_values;

    //create a variable that converts the washing frequency to a floating point number
    var washFreq = parseFloat(result.wfreq)
    console.log(washFreq);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIds.slice(0,10).reverse().map(id => 'OTU ' + id);

    // 8. Create the trace for the bar chart. 
    var barTrace = {
      type: 'bar',
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels.slice(0,10).reverse(),
      hoverinfo:'text',
      orientation: 'h'
    };
    var barData = [barTrace];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'  
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);

    //Bubble Plot
    // 1. Create the trace for the bubble chart.
    var bubbleTrace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: [
          ['0.0', 'rgb(165,08,3)'],
          ['0.111111111111', 'rgb(215,48,39)'],
          ['0.222222222222', 'rgb(244,109,67)'],
          ['0.333333333333', 'rgb(253,174,97)'],
          ['0.444444444444', 'rgb(254,224,144)'],
          ['0.555555555556', 'rgb(224,243,248)'],
          ['0.666666666667', 'rgb(171,217,233)'],
          ['0.777777777778', 'rgb(116,173,209)'],
          ['0.888888888889', 'rgb(69,117,180)'],
          ['1.0', 'rgb(49,54,149)']
        ]}
    }
    
    var bubbleData = [bubbleTrace];
   

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: 'OTU ID'},
      hovermode: 'text',
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    //Gauge chart
    // 4. Create the trace for the gauge chart.
    var gaugeTrace = {
      value: washFreq,
      type: 'indicator',
      mode: 'gauge+number',
      title: {text: 'Wash Frequency'},
      gauge: {
        bar: {color: 'black'},
        steps: [
          {range: [0, 2], color: 'red'},
          {range: [2, 4], color: 'orange'},
          {range: [4, 6], color: 'yellow'},
          {range: [6, 8], color: 'greenyellow'},
          {range: [8, 10], color: 'green'}
        ],
        axis: {range: [0, 10]}
      }
    }

    var gaugeData = [gaugeTrace];
     
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width: 500,
      length: 500,
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
