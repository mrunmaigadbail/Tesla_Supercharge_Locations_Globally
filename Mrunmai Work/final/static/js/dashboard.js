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
      make_table(data.bubble_data, country, state);
      make_bar_chart(data.bubble_data, country, state);
    });
  }

  function make_table(filtered_data, country, state) {
    // re-init the datatable
  $('#data_table').DataTable().clear().destroy();
    // select table
    let table = d3.select("#data_table");
    let table_body = table.select("tbody");
    table_body.html(""); // destroy any existing rows
  
    let SelectionHeaderLabel = document.getElementById("selection_label");
    
    // create table
    for (let i = 0; i < filtered_data.length; i++){
      // get data row
      let data_row = filtered_data[i];
  
      // creates new row in the table
      let row = table_body.append("tr");

      if (country == 'All')
      {
        row.append("td").text(data_row.Country);
        SelectionHeaderLabel.innerHTML  = "Country";
      }
      else if (state == "All")
      {
        row.append("td").text(data_row.State);
        SelectionHeaderLabel.innerHTML  = "State";
      }
      else
      {
        row.append("td").text(data_row.City);
        SelectionHeaderLabel.innerHTML  = "City";
      }
      
      row.append("td").text(data_row.TotalStalls);  
      row.append("td").text(Number(data_row.AvgStalls).toFixed(2));
      row.append("td").text(data_row.min_kw);
      row.append("td").text(data_row.max_kw);
    }
    // Create the datatable
    $('#data_table').DataTable();
  }
  
  function make_bubble(filtered_data, country, state) {
    // extract data for bubble chart
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
        color:X_data,
        size: Y_data,
        colorscale: 'Bluered',
        // label: label_data
      }
    };
  
    // Create data array
    let data = [trace1];
  
    // Apply a title to the layout
    let layout = {
      title: "Average vs Total Number of Stalls",
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

  function make_bar_chart(filtered_data, country, state) {

    let Y_data = filtered_data.map(x => x.TotalStalls);
    //let Y_data = filtered_data.map(x => x.AvgStalls);
    let label_data = []
    let barLabelName = ""
    
    if (country == 'All')
    {
      X_data = filtered_data.map(x => x.Country);
      barLabelName = "Countries";
    }
    else if (state == "All")
    {
      X_data = filtered_data.map(x => x.State);
      barLabelName = "States";
    }
    else
    {
      X_data = filtered_data.map(x => x.City)
      barLabelName = "Cities";
    }
    
    var trace1 = {
      x: X_data.slice(0, 10),
      y: Y_data,
      //text: label_data,
      type: 'bar',
      marker:{
          color: '#330099',
      }
      
      //orientation: 'h'
      //mode: 'markers',
      // marker: {
      //   size: X_data,
      //   // label: label_data
      // }
    };
  
    // Create data array
    let data = [trace1];
  
    // Apply a title to the layout
    let layout = {
      title: `Total Number of Stalls by top ${barLabelName}`,
      // xaxis: "Total stalls",
      // yaxis: "Average stalls",
      
      xaxis: { title: barLabelName },
      yaxis: { title: "Total Stalls" },

      showlegend: false,
      // height: 600,
      // width: 600
    }
  
    Plotly.newPlot("bar_chart", data, layout);
  }

//   function updateBarChart(country, state) {
//     fetch('/api/v1/updateBarChart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       })
//       .then(response => {
//         // Handle the response
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       })
//     .then(response => response.json())
//     .then(data => {
//         const xValues = data.map(item => `${item.Country} - ${item.State}`);
//         const yValues = data.map(item => item.Location_Count);

//         const trace = {
//             x: xValues,
//             y: yValues,
//             type: 'bar',
//         };

//         const layout = {
//             title: 'Location Count by Country and State',
//         };

//         const plotData = [trace];

//         Plotly.newPlot('barChart', plotData, layout);
//     })
//     // .catch(error => console.error('Error fetching data:', error));
// }

  function make_country_filters() {  
      // We need to make a request to the API
      let url = `/api/v1/get_Country_filter_Data`;
      d3.json(url).then(function (data) {
    
      // make country filters        
      let CountryFilter = document.getElementById("country_filter");

      // Clear the state dropdown first
      CountryFilter.innerHTML = "";
      
      //add option All
      const option = document.createElement("option");
      option.text = "All";
      CountryFilter.add(option);

      // Populate state dropdown with options for the selected country
      data.Countries.forEach(element => {
          const option = document.createElement("option");
          option.text = element.Country;
          CountryFilter.add(option);
      });
      CountryFilter.options[0].selected = true;
      make_state_filters("All");
      do_work();
    });
  }

  function make_state_filters(Country) {  
    // We need to make a request to the API
    let url = `/api/v1/get_State_filter_Data/${Country}`;
    d3.json(url).then(function (data) {
  
    // make country filters        
    let StateFilter = document.getElementById("state_filter");

    // Clear the state dropdown first
    StateFilter.innerHTML = "";
    
    //add option All
    const option = document.createElement("option");
    option.text = "All";
    StateFilter.add(option);

    // Populate state dropdown with options for the selected country
    data.States.forEach(element => {
        const option = document.createElement("option");
        option.text = element.State;
        StateFilter.add(option);
    });
    
    StateFilter.options[0].selected = true;
    
  });
}
  
  country_filter.addEventListener("change", function() {
    make_state_filters(document.getElementById("country_filter").value)
  });

  
  // event listener for CLICK on Button
  d3.select("#filter").on("click", do_work);
  
  // on page load, don't wait for the click to make the graph, use default

  make_country_filters();
  
  
