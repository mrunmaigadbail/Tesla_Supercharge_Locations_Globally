// GOAL 1
// Can I render a basic base map? - Set up Leaflet correctly
// Can we fetch the data that we need to plot?

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
  let heatArray = [];

  for (let i = 0; i < data.length; i++){
    let row = data[i];
    let location = row.location;

    // create marker
    if (location) {
      // extract coord
      let point = [location.coordinates[1], location.coordinates[0]];

      // make marker
      let marker = L.marker(point);
      let popup = `<h1>${row.incident_address}</h1><hr><h2>${row.borough}</h2><hr><h3>${row.descriptor} | ${row.created_date}</h3>`;
      marker.bindPopup(popup);
      markers.addLayer(marker);

      // add to heatmap
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
  let myMap = L.map("map", {
    center: [34.05, -118.24],
    zoom: 11,
    layers: [street, markers]
  });


  // Step 5: Add the Layer Control filter + legends as needed
  L.control.layers(baseLayers, overlayLayers).addTo(myMap);

}

  
  function do_work() {
    // extract user input
    //let min_launches = d3.select("#launch_filter").property("value");
    //min_launches = parseInt(min_launches);
    let region = d3.select("#region_filter").property("value");
  
    // We need to make a request to the API
    let url = `/api/v1.0/get_map/${min_launches}/${region}`;
  
    // make TWO requests
    d3.json(url).then(function (data) {
      createMap(data);
    });
  }
  
  // event listener for CLICK on Button
  d3.select("#filter").on("click", do_work);
  
  do_work();
  