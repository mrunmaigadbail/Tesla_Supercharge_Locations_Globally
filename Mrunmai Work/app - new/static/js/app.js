function do_work() {
    // extract user input
    let min_stalls = d3.select("#stall_filter").property("value");
    min_stalls = parseInt(min_stalls);
    let country = d3.select("#country_filter").property("value");
    let state = d3.select("#state_filter").property("value");
  
    // We need to make a request to the API
    let url = `/api/v1/get_dashboard/${min_stalls}/${country}/${state}`;
    d3.json(url).then(function (data) {
  
      // create the graphs
      make_bubble(data.bubble_data, country, state);
      //make_sunburst(data.sunbusrt_data)
    });
  }

  function make_table() {
    // select table
    let table = d3.select("#data_table");
    let table_body = table.select("tbody");
    table_body.html(""); // destroy any existing rows
  
    // create table
    for (let i = 0; i < filtered_data.length; i++){
      // get data row
      let data_row = filtered_data[i];
  
      // creates new row in the table
      let row = table_body.append("tr");
      row.append("td").text(data_row.name);
      row.append("td").text(data_row.full_name);
      row.append("td").text(data_row.region);
      row.append("td").text(data_row.latitude);
      row.append("td").text(data_row.longitude);
      row.append("td").text(data_row.launch_attempts);
      row.append("td").text(data_row.launch_successes);
      row.append("td").text(data_row.launch_attempts - data_row.launch_successes);
    }
  }
  
  function make_bubble(filtered_data, country, state) {
    // extract data for pie chart
    let X_data = filtered_data.map(x => x.TotalStalls);
    let Y_data = filtered_data.map(x => x.AvgStalls);
    let label_data = []
    
    if (country == 'All')
    {
      label_data = filtered_data.map(x => x.Country);
    }
    else if (state == "All")
    {
      label_data = filtered_data.map(x => x.State);
    }
    else
    {
      label_data = filtered_data.map(x => x.City)
    }

  
    var trace1 = {
      x: X_data,
      y: Y_data,
      text: label_data,
      mode: 'markers',
      marker: {
        size: Y_data,
        // label: label_data
      }
    };

    // let trace1 = {
    //   values: X_data,
    //   labels: pie_labels,
    //   type: 'pie',
    //   hoverinfo: 'label+percent+name',
    //   hole: 0.4,
    //   name: "Attempts"
    // }
  
    // Create data array
    let data = [trace1];
  
    // Apply a title to the layout
    let layout = {
      title: "Average vs Total number of Stalls",
      // xaxis: "Total stalls",
      // yaxis: "Average stalls",
      
      xaxis: { title: "Total Stalls" },
      yaxis: { title: "Average Stalls" },

      showlegend: false,
      // height: 600,
      // width: 600

    }
  
    Plotly.newPlot("bubble_chart", data, layout);
  }
  
  // event listener for CLICK on Button
  d3.select("#filter").on("click", do_work);
  
  // on page load, don't wait for the click to make the graph, use default
  do_work();
  
