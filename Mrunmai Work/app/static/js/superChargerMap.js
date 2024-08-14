
// Creating the map object
let myMap = L.map("map", {
  center: [39.39 , -8.22],
  zoom: 3,
 // layers: [street, heatLayer]
});

// let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// }).addTo(myMap);

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// query URL.
let url = `/api/v1/get_map_Data`

// Get the data with d3.
d3.json(url).then(function(response) {

  // Create a new marker cluster group.
  let markers = L.markerClusterGroup();
  let data = response.map_Data;
  let heatArray = [];

  // Loop through the data.
  for (let i = 0; i < data.length; i++) {

    // Set the data location property to a variable.
    let latitude = data[i].Latitude;
    let longitude = data[i].Longitude;
    let popupmsg = `Name :${data[i].Supercharger} <br>
                    Address: ${data[i].Street_Address} <br>
                    Stalls: ${data[i].Stalls}`

    // Add a new marker to the cluster group, and bind a popup.
    markers.addLayer(L.marker([latitude, longitude])
      .bindPopup(popupmsg)
    );
    if (latitude & longitude) {
      let point = [latitude, longitude];
      heatArray.push(point);
    }
    let heatLayer = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    });
    
  let overlayLayers = {
    Heatmap: heatLayer
  }
  
  //L.control.layers(markers, overlayLayers).addTo(myMap)
  // Add our marker cluster layer to the map.
  myMap.addLayer(markers,overlayLayers);
}

});

