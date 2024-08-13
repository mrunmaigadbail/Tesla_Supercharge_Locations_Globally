const URL = `/api/v1/get_map_Data`;
const HEAT_RADIUS = 50;
const HEAT_BLUR = 30;
const HEAT_MAX = 0.1;
const MAP_DEFAULTS = { 
  LAT: 39.39,
  LON: -8.22,
  ZOOM: 3,
};






function heatMap(locations) {

  let heatArray = [];

  // for each row, add to heat layer array
  for (let i = 0; i < locations.length; i++) {
    let location = locations[i];

    let latitude = location.Latitude;
    let longitude = location.Longitude;
    if (latitude & longitude) {
      let point = [latitude, longitude];
      heatArray.push(point);
    }
  }

  // create layer
  let heatLayer = L.heatLayer(heatArray, {
    radius: HEAT_RADIUS,
    blur: HEAT_BLUR,
    max: HEAT_MAX,
    
  });

  return heatLayer;
}

function makeMarkers(locations) {
  let markers = L.markerClusterGroup();
 
  for (let i = 0; i < locations.length; i++) {
    let location = locations[i];
    // Set the data location property to a variable.
    let latitude = location.Latitude;
    let longitude = location.Longitude;
    let popupmsg = `Name: ${location.Supercharger} <br>
                    Address: ${location.Street_Address} <br>
                    Stalls: ${location.Stalls}`

    // Add a new marker to the cluster group, and bind a popup.
    markers.addLayer(L.marker([latitude, longitude])
      .bindPopup(popupmsg)
      );
  }
  return markers;
}


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


// Step 3: BUILD the Layer Controls

  // Only one base layer can be shown at a time.
  let baseLayers = {
    Street: street,
    Topography: topo
  };

  let locations= data.map_Data;
  let markers = makeMarkers(locations);
  let heatLayer = heatMap(locations)
  
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
    center: [MAP_DEFAULTS.LAT, MAP_DEFAULTS.LON],
    zoom: MAP_DEFAULTS.ZOOM,
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
    
  
    // make TWO requests
    d3.json(URL).then(function (data) {
      createMap(data);
    });
  }
  
do_work();

