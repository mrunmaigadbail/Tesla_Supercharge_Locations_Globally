
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
   return render_template("superChargerMap.html")

@app.route("/api/v1/get_map_Data")   
def get_map_Data():
    map_Data = sql.get_map_Data()
    data = {
        "map_Data": map_Data
        }
    return jsonify(data)

@app.route("/api/v1/sunburst")   
def sunburst():
    sunburst_data = sql.get_sunburst()
    data = {
        "sunburst_data": sunburst_data
        }
    return jsonify(data)

@app.route("/api/v1/get_dashboard/<min_stalls>/<country>/<state>")   
def get_dashboard(min_stalls, country, state):
    min_stalls = int(min_stalls) # cast to int

    bubble_data = sql.get_bubble(min_stalls, country, state)

    data = {
        "bubble_data": bubble_data,
        }
    return(jsonify(data))

# @app.route("/api/v1/get_filter_Data")   
# def get_filter_Data():
#     Country_State_data = sql.get_filter_Data()
#     data = {
#         "Country_State_data": Country_State_data
#         }
    
#     # # Convert to nested JSON structure

#     # for item in Country_State_sql_data:
#     #     country = item['Country']
#     #     state = item['State']
#     #     if country not in data.Country_State_data:
#     #         data.Country_State_data[country] = {"States": []}
#     #     data.Country_State_data[country]["States"].append(state)

#     # Convert to nested JSON structure
#     # nested_json = {}

#     # for item in data:
#     #     Country = item['Country']
#     #     State = item['State']
#     #     if Country not in nested_json:
#     #         nested_json[Country] = {"States": []}
#     #     nested_json[Country]["States"].append(State)

#     # Country_State_data = {
#     #     "Country_State_data":nested_json
#     # }   

#     return jsonify(data)

# Run the App

@app.route("/api/v1/get_Country_filter_Data")   
def get_Country_filter_Data():
    Countries = sql.get_Country_filter_Data()
    data = {
        "Countries": Countries
        }

    return jsonify(data)

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