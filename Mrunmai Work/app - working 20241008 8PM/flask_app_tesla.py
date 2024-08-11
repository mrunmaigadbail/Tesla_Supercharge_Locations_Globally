
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


@app.route("/api/v1/sunburst")   
def sunburst():
    sunburst_data = sql.get_sunburst()
    data = {
        "sunburst_data": sunburst_data
        }
    return jsonify(data)
    # def create_nested_name(data):
    #     for entry in data['sunburst_data']:
    #         country = entry['Country']
    #         state = entry['State']
    #         state = f"{state}_{country}"
    #         city = entry['City']
    #         city = f"{city}_{state}_{country}"
    # nested_data = create_nested_name(data)

    # # Output the result in JSON format
    # return jsonify(nested_data)


    # # Initialize a nested dictionary
    # def create_nested_structure(data):
    #     countries = {}
    #     for entry in data['sunburst_data']:
    #         country = entry['Country']
    #         state = entry['State']
    #         city = entry['City']
            
    #         if country not in countries:
    #             countries[country] = {"name": country, "children": []}
            
    #         country_node = countries[country]
            
    #         state_node = next((item for item in country_node["children"] if item["name"] == state), None)
    #         if not state_node:
    #             state_node = {"name": f"{state}_{country}", "children": []}
    #             country_node["children"].append(state_node)
            
    #         state_node["children"].append({
    #             "name": f"{city}_{state}_{country}",
    #             "max_kw": entry["max_kw"],
    #             "min_kw": entry["min_kw"],
    #             "stalls": entry["stalls"]
    #         })
        
    #     return list(countries.values())

    # nested_data = create_nested_structure(data)

    # # Output the result in JSON format
    # return jsonify(nested_data)


# Run the App
if __name__ == '__main__':
    app.run(debug=True)


















# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func, text
# import numpy as np
# import pandas as pd
# import datetime as dt

# from flask import Flask, jsonify

# engine = create_engine("sqlite:///Tesla.sqlite")
# # reflect an existing database into a new model
# Base = automap_base()

# # reflect the tables

# Base.prepare(autoload_with=engine)
# SuperchargeLocation = Base.classes.supercharge_locations



# conn = engine.connect()

# session = Session(engine)
# #################################################
# # Flask Setup
# #################################################


# app = Flask(__name__)


# #################################################
# # Flask Routes
# #################################################
# @app.route("/")
# def welcome():
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/v1.0/bubble<br/>"
      
      
#     )

# @app.route("/api/v1.0/bubble")
# def bubbles():
#     results = (
#     session.query(
#         SuperchargeLocation.Country,
#         func.count().label('Location_Count'),
#         func.avg(SuperchargeLocation.Stalls).label('Average_Stalls')
#     )
#     .group_by(SuperchargeLocation.Country)
#     .order_by(func.count().desc())
#     .all()
#         )
#     df = pd.DataFrame(results, columns=['Country', 'Location_count', 'Average_Stalls'])

#     data = df.to_dict(orient="records")
#     return(jsonify(data))

# session.close()

# if __name__ == '__main__':
#     app.run(debug=True)
# Transform data
    # 