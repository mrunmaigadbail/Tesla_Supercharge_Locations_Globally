// Creating the map object
let myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

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

  // Loop through the data.
  for (let i = 0; i < response.length; i++) {

    // Set the data location property to a variable.
    let superchargerLocation = response[i];

    // Add a new marker to the cluster group, and bind a popup.
    markers.addLayer(L.marker([superchargerLocation.Latitude, superchargerLocation.Longitude])
      .bindPopup(superchargerLocation.Supercharger));

  }

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

});
