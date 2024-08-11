
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

# Run the App
if __name__ == '__main__':
    app.run(debug=True)