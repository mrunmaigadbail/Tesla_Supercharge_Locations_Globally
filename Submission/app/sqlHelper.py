import sqlalchemy
from sqlalchemy import create_engine, text, func
import datetime

import pandas as pd
import numpy as np

# The Purpose of this Class is to separate out any Database logic
class SQLHelper():

    # define properties
    def __init__(self):
        self.engine = create_engine("sqlite:///Tesla.sqlite")
   
# Quary to get sunburst chart data    
    def get_sunburst(self):
        query = f"""
        SELECT
        Country,
        State,
        City,
        Supercharger,
        Street_Address,
        kW,
        Stalls,
        Latitude,
        Longitude
        FROM supercharge_locations;

        """
        df = pd.read_sql(text(query), con = self.engine)
# sunburst chart was showing an warning as same city in different states and same state name in different countries
# joined city with state and state with country to make unique values
        df['City'] = df['City'] + "_" + df['State']
        df['State'] = df['State'] + "_"+ df['Country']
        data = df.to_dict(orient="records")
        return(data)
    

# Quary to get bubble chart data with min stallsn country and state filter
    def dashboard_data(self, min_stalls, country, state):

        # where and group clause based on filter selected
        if country == 'All':
            where_clause = "and 1=1"
            group_clause = "Country"  
        elif state == 'All':
            where_clause = f"and country = '{country}'"  
            group_clause = "Country, State"  
        else:
            where_clause = f"and country = '{country}' and state = '{state}'" 
            group_clause = "Country, State, City"  

        # build the query
        query = f"""
            SELECT
                Country,
                State,
                City,
                AVG(Stalls) AS AvgStalls,
                SUM(Stalls) AS TotalStalls,
                MIN(kW) AS min_kw,
                MAX(kW) AS max_kw
            FROM
                supercharge_locations
            WHERE
                Stalls >= {min_stalls}
                {where_clause}
            GROUP BY
                {group_clause}
            ORDER BY
                TotalStalls DESC;   
        """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)
    
    # quary to get all countries from data base to add to country filter
    def get_Country_filter_Data(self):
        query = f"""
            select
                DISTINCT Country 
            from
                supercharge_locations
            group by
                Country
            order by
                Country

        """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)

    # quary to get all states in a country selected in country filter
    def get_State_filter_Data(self, country):
        query = f"""
            select
                DISTINCT State 
            from
                supercharge_locations
            Where
                Country = '{country}' 
            group by
                State
            order by
                State

        """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)
    
    

 #Quary to get map data        
    def get_map_Data(self):
        query = f"""
        SELECT
            Country,
            State,
            City,
            Supercharger,
            Street_Address,
            kW,
            Stalls,
            Latitude,
            Longitude
        FROM
            supercharge_locations

        """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)