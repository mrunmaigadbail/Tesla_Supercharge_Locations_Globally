function createMap(data) {
    // STEP 1: Init the Base Layers
  // Define variables for our tile layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
// Step 2: Create the Overlay layers
let markers = L.markerClusterGroup();
  let row = data.map_Data;
  let heatArray = [];

  // Loop through the data.
  for (let i = 0; i < row.length; i++) {

    // Set the data location property to a variable.
    let latitude = row[i].Latitude;
    let longitude = row[i].Longitude;
    let popupmsg = `Name :${row[i].Supercharger} <br>
                    Address: ${row[i].Street_Address} <br>
                    Stalls: ${row[i].Stalls}`

    // Add a new marker to the cluster group, and bind a popup.
    markers.addLayer(L.marker([latitude, longitude])
      .bindPopup(popupmsg)
      );
      if (latitude & longitude) {
        let point = [latitude, longitude];
        heatArray.push(point);
      }
    }


      // create layer
  let heatLayer = L.heatLayer(heatArray, {
    radius: 25,
    blur: 20
  });
// Step 3: BUILD the Layer Controls

  // Only one base layer can be shown at a time.
  let baseLayers = {
    Street: street,
    Topography: topo
  };

  let overlayLayers = {
    Markers: markers,
    Heatmap: heatLayer
  }
// Step 4: INIT the Map

  // Destroy the old map
  d3.select("#map-container").html("");

  // rebuild the map
 d3.select("#map-container").html("<div id='map'></div>");

  let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 5,
    layers: [street, markers]
  });
  // Step 5: Add the Layer Control filter + legends as needed
  L.control.layers(baseLayers, overlayLayers).addTo(myMap);
  }

function do_work() {
    // extract user input
    // let min_launches = d3.select("#launch_filter").property("value");
    // min_launches = parseInt(min_launches);
    // let region = d3.select("#region_filter").property("value");
  
    // We need to make a request to the API
    let url = `/api/v1/get_map_Data`;
  
    // make TWO requests
    d3.json(url).then(function (data) {
      createMap(data);
    });
  }
  
do_work();

