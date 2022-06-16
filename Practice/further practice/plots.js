// Line graph
//Plotly.newPlot("plotArea", [{x: [5, 10, 15, 20], y: [10, 20, 30, 40]}]);


//Bar Graph
// var trace = {x: ['burrito', 'pizza', 'chicken'],
//             y: [10, 18, 5],
//             type: 'bar'
// };

// var layout = {
//     title: 'Luncheon Survey',
//     xaxis: {title: 'Food Option'},
//     yaxis: {title: 'Number of Respondents'}
// };

// Plotly.newPlot('plotArea', [trace], layout);

//Bar Graph 2
// var trace = {x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
//             y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//             type: 'bar'
// };

// var layout = {
//     title: 'Drink Orders',
//     xaxis: {title: 'Drink Option'},
//     yaxis: {title: 'Percent Ordered'}
// };

// Plotly.newPlot('plotArea', [trace], layout);

//Pie Chart
// var trace = {
//     labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita",
//     "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
//     values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//     type: 'pie'
//    };
//    var data = [trace];
//    var layout = {
//     title: "'Pie' Chart",
//    };
//    Plotly.newPlot("plotArea", data, layout);

//Scatter plot
var trace1 = {
    x: [1, 2, 3, 4, 5],
    y: [1, 6, 3, 6, 1],
    mode: 'markers',
    type: 'scatter',
    name: 'Team A',
    text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    marker: { size: 12 }
  };
  
  var trace2 = {
    x: [1.5, 2.5, 3.5, 4.5, 5.5],
    y: [4, 1, 7, 1, 4],
    mode: 'markers',
    type: 'scatter',
    name: 'Team B',
    text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
    marker: { size: 12 }
  };
  
  var data = [ trace1, trace2 ];
  
  var layout = {
    xaxis: {
      range: [ 0.75, 5.25 ]
    },
    yaxis: {
      range: [0, 8]
    },
    title:'Data Labels Hover'
  };
  
  Plotly.newPlot('plotArea', data, layout);