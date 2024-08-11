import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
from sqlalchemy import create_engine, text, func
import datetime

import pandas as pd
import numpy as np

# The Purpose of this Class is to separate out any Database logic
class SQLHelper():
    #################################################
    # Database Setup
    #################################################

    # define properties
    def __init__(self):
        self.engine = create_engine("sqlite:///Tesla.sqlite")
    def get_sunburst(self):

        # build the query
        query = f"""
            SELECT
        Country,
        State,
        City,
        SUM(Stalls) AS stalls,
        MIN(kW) AS min_kw,
        MAX(kW) AS max_kw
        FROM supercharge_locations
        where stalls >= 15
        GROUP BY Country, State, City;
           
        """

        df = pd.read_sql(text(query), con = self.engine)
        df['City'] = df['City'] + "_" + df['State']
        df['State'] = df['State'] + "_" + df['Country']
        


        data = df.to_dict(orient="records")
        return(data)
        #      SELECT Country, State, City, sum(Stalls) as Stalls, Avg(kW) as kW
        # FROM supercharge_locations
        # where Country is not null and State is not null and kW > 0 
        #        and State != City and Country != State and Country != City
        #        and Country = 'Germany'
        # group by Country, State, City         
                
        # ORDER BY Country, State, Stalls, kW DESC;
            # SELECT
    #     Country,
    #     State,
    #     City,
    #     SUM(Stalls) AS stalls,
    #     MIN(kW) AS min_kw,
    #     MAX(kW) AS max_kw
    #     FROM supercharge_locations
    #     GROUP BY Country, State, City
    #     Limit 50;