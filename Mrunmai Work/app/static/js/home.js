d3.csv('cleaned_.csv', function(err, rows){
    function unpack(rows, key) {
    return rows.map(function(row) {return row[key]})
  }
  
    var data = [{
          type: "sunburst",
          maxdepth: 2,
          ids: unpack(rows, 'Country'),
          labels: unpack(rows, 'State'),
          parents: unpack(rows, 'city'),
          textposition: 'inside',
          insidetextorientation: 'radial'
    }]
  
    var layout = {margin: {l: 0, r: 0, b: 0, t:0}}
  
    Plotly.newPlot('sunburst', data, layout)
  })