from flask import Flask, jsonify, send_from_directory
#from flask_cors import CORS
import sqlite3

import os 
app = Flask(__name__, static_folder='Madden/static') 

@app.route('/') 
def home(): 
    return send_from_directory('Madden', 'index.html')  
@app.route('/data')
def data():
    conn = sqlite3.connect('Tesla.sqlite')
    cursor = conn.cursor()
    cursor.execute("SELECT Latitude, Longitude, Stalls FROM supercharge_locations")
    rows = cursor.fetchall()
    conn.close()

    # Transform data into JSON-friendly format
    result = [{"latitude": lat, "longitude": lon, "stalls": stalls} for lat, lon, stalls in rows]
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)