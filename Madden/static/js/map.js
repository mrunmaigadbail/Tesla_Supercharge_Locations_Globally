 //Create map
 let map = L.map("map", {
     center: [40.7, -94.5],
     zoom: 3
   });
  
   // Create and add base layers
   let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }).addTo(map);
  
   let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
   });

   const sqlite3 = require('sqlite3').verbose();
   const db = new sqlite3.Database('Tesla.sqlite');
   
   db.all('SELECT Latitude, Longitude, Stalls FROM supercharge_locations', (err, rows) => { 
    if (err) { 
      console.error(err); 
      return; }
    console.log(rows);

    let heatPoints = rows.map(row => [row.Latitude, row.Longitude, row.Stalls]);

    let heat = L.heatLayer(heatPoints, {radius: 25, blur: 15, maxZoom: 17}).addTo(map);
   });
db.close();