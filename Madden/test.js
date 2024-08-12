const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('Tesla.sqlite');

db.all('SELECT Latitude, Longitude, Stalls FROM your_table', (err, rows) => {
  if (err) {
    console.error(error);
  }else {  // Process rows here
    console.log(rows);}

  db.close();
  // Process rows here
  //console.log(rows);
});