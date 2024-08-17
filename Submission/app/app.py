
from flask import Flask, jsonify, render_template
import json
import pandas as pd
import numpy as np
from sqlHelper import SQLHelper
from collections import defaultdict
#################################################
# Flask Setup
#################################################
app = Flask(__name__)
sql = SQLHelper()

#################################################
# Flask Routes
#################################################

# HTML ROUTES
@app.route("/")
def index():
   return render_template("home.html")

@app.route("/dashboard")
def dashboard():
   return render_template("dashboard.html")

@app.route("/map")
def map():
   return render_template("map.html")

@app.route("/about_us")
def about_us():
   return render_template("about_us.html")

@app.route("/works_cited")
def works_cited():
   return render_template("works_cited.html")

#route for map data
@app.route("/api/v1/get_map_Data")   
def get_map_Data():
    map_Data = sql.get_map_Data()
    data = {
        "map_Data": map_Data
        }
    return jsonify(data)

# suburst data route
@app.route("/api/v1/sunburst")   
def sunburst():
    sunburst_data = sql.get_sunburst()
    data = {
        "sunburst_data": sunburst_data
        }
    return jsonify(data)

#Dashborad data routes
@app.route("/api/v1/get_dashboard/<min_stalls>/<country>/<state>")   
def get_dashboard(min_stalls, country, state):
    min_stalls = int(min_stalls) # cast to int
    dashboard_data = sql.dashboard_data(min_stalls, country, state)
    data = {
        "dashboard_data": dashboard_data,
        }
    return(jsonify(data))


#Country filter data route
@app.route("/api/v1/get_Country_filter_Data")   
def get_Country_filter_Data():
    Countries = sql.get_Country_filter_Data()
    data = {
        "Countries": Countries
        }
    return jsonify(data)

#state filter data route
@app.route("/api/v1/get_State_filter_Data/<country>")   
def get_State_filter_Data(country):
    States = sql.get_State_filter_Data(country)
    data = {
        "States": States
        }
    return jsonify(data)

# Run the App
if __name__ == '__main__':
    app.run(debug=True)