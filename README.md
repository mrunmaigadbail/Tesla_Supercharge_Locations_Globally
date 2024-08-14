# Tesla_Supercharge_Locations_Globally
Project 3: Data Visualization Web Application
#### All Deliverables are located in the Submission folder
## Overview
This project is a web application that showcases dynamic data visualizations created using Plotly. The data for these visualizations was sourced from a CSV dataset, cleaned, transformed, and stored in a SQLite database. The web application allows users to interact with the data by changing filters through a dashboard and map to find locations of Tesla Superchargers globally. 

## Features
Dynamic data visualizations powered by Plotly. You are able to filter by country and then further by state to see not only the location of the Superchargers but the average number of stalls and the min/max of the kW. There is also an interactive map where you are able to explore the world to see which countries and regions have the most or least chargers. 

## To use the web application:
  1. Clone this repository to your local machine.
     Ensure you have Python and SQLite installed.
     Run the app.py file to start the web application.
     Navigate to the provided URL in your web browser to interact with the visualizations.
  2. You can access our webpage using this link until November 2024: https://mrunmaigadbail.pythonanywhere.com/

## Bias, Limitations, and Future Work:
When preforming our analysis we noticed that there are no publically avalible Superchargers in South America, India, or Africa. This was an interesting point especially due to the high population densities in these regions. Initally we wanted to explore the trends of when and where the charging stations were being built and predict where future chargers would be built. But, while doing our research and analysis we found out that the team at Tesla that is responsible for the Supercharger develoupment was laid off. It is unclear what the future holds for the expansion of the Superchargers. Future work could include where the next Superchargers are likely to be located, how elevation can affect where a charger will be located, how the average kW has changed over time.

## Data Sources
The dataset used for this project was sourced from (https://www.kaggle.com/datasets/omarsobhy14/supercharge-locations).

