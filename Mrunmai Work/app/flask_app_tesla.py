
from flask import Flask, jsonify, render_template
import pandas as pd
import numpy as np
from sqlHelper import SQLHelper

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
    sunburst_data = sql.get_sunburst()
    data = {
        "sunburst_data": sunburst_data
        }
    return [(jsonify(data)),
            render_template("home.html")]


   



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