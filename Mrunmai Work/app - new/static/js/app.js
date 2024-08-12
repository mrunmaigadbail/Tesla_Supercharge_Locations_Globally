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
      //make_sunburst(data.sunbusrt_data)
    });
  }

  function make_table(filtered_data, country, state) {
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

  
  // function make_filters(country) {  
  //       // We need to make a request to the API
  //       let url = `/api/v1/get_filter_Data`;
  //       d3.json(url).then(function (data) {
      
  //       // make filters        
  //       make_country_filters(data);
  //       //make_state_filters("All");
  //       });  
  // }

    
  // function make_country_filters(data) {    
  //   //const selectedCountry = country;
  //   //console.log("Selected Country:", selectedCountry);

  //   let CountryFilter = document.getElementById("country_filter");

  //   // Clear the state dropdown first
  //   CountryFilter.innerHTML = "";

  //   // Populate state dropdown with options for the selected country
  //   Country_State_data.forEach(country => {
  //       const option = document.createElement("option");
  //       option.text = country;
  //       CountryFilter.add(option);
  //   });
  // }
    
  // function make_state_filters(Country) {    
  //   const selectedCountry = document.getElementById("country_filter").selectedCountry;
  //   //console.log("Selected Country:", selectedCountry);

  //   let StateFilter = document.getElementById("state_filter");

  //   // Clear the state dropdown first
  //   StateFilter.innerHTML = "";

  //   // Populate state dropdown with options for the selected country
  //   Country_State_data.selectedCountry.forEach(state => {
  //       const option = document.createElement("option");
  //       option.text = state;
  //       StateFilter.add(option);
  //   });
  // }
  // function make_state_filters(country) {    
  //   const selectedCountry = country_filter.value;
  //   console.log("Selected Country:", selectedCountry);

  //   const states = countryStates[selectedCountry];
  //   console.log("States for Selected Country:", states);

  //   // Clear the state dropdown first
  //   state_filter.innerHTML = "";

  //   // Populate state dropdown with options for the selected country
  //   states.forEach(state => {
  //       const option = document.createElement("option");
  //       option.text = state;
  //       stateSelect.add(option);
  //   });
  //}
  // country_filter.addEventListener("change", function() {
  //   make_state_filters()
  // });

//   document.addEventListener('DOMContentLoaded', function() {
//     make_filters()
//     // // Call updateBarChart with default values or when dropdown values change
//     // const defaultCountry = 'All'; // Default country value
//     // const defaultState = 'All'; // Default state value
//     // updateBarChart(defaultCountry, defaultState);

//     // // Add event listeners to country and state dropdowns to update the chart
//     // document.getElementById('countryDropdown').addEventListener('change', function() {
//     //     const selectedCountry = this.value;
//     //     const selectedState = document.getElementById('stateDropdown').value;
//     //     updateBarChart(selectedCountry, selectedState);
//     // });

//     // document.getElementById('stateDropdown').addEventListener('change', function() {
//     //     const selectedCountry = document.getElementById('countryDropdown').value;
//     //     const selectedState = this.value;
//     //     updateBarChart(selectedCountry, selectedState);
//     // });
// });
  
  // event listener for CLICK on Button
  d3.select("#filter").on("click", do_work);
  
  // on page load, don't wait for the click to make the graph, use default
  do_work();
  
