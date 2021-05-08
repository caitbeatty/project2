# Philly Living

Relocating to a new place is often a harrowing experience, requiring one to make many important decisions with limited information. This project serves to provide guidance to individuals in this precarious situation - specifically, those thinking about moving to [Philly](https://www.phila.gov/)!

Philadelphia is a amazing city with a history that is tied closely to that of the United States. Over the years it has also played an important role in media - who can forget Sylvester Stallone's triumphant run up the steps of the Philadelphia Museum of Art in the film "Rocky." However, regardless of the history of the place, what does it actually mean to live here? Are the schools good? What is the average household income? How much can one expect to earn?

The following analysis looks at some of these factors, ones that would be most important to professionals early in their careers or young families. In designing the initial scope, the analyst also focused specicially to factors important to women. The census tracts information from Census 2010 was used as a backdrop of this analysis. Given its structure, it was an appropriate way to differentiate different areas of the city. All the factors studied here were then overlayed on this information - thus allowing for a comparison across geographic barriers. 

## The analysis itself followed this process: ##
   * **Get the data set** - The data was gathered through api calls to [OpenDataPhilly](https://www.opendataphilly.org/dataset)
   * **Import and Clean the data** - data was gathered in jupyter notebooks where initial cleaning and transformation was conducted. Load data to SQLite - once cleaned data was loaded as tables to a SQLite database
   * **API calls with Flask** - pull data into javascript files using Python (Flask)
   * **Visualizations** - analyze the data in javascript files and create visualizations using [Plotly](https://plotly.com/) and [Leaflet](https://leafletjs.com/). The visualizations must allow for user interaction and load to html pages

## File Structure: ##
   * **API datasources**
       * householdInfo - initial transformation of household income information
           * household_income_summary.csv
       * Household_Income_and_Census_Data - transformations of census tracts and household income data; tables pushed to SQLite database
           * household_income_summary.csv
           * census_tracts_summary.csv
           * merged_df.csv
       * income - transformation of salary data; tables pushed to SQLite
           * salary_summary_df.csv
       * Philly_Schools - school data cleaned and transformed tables pushed to SQLite
           * schools_clean.csv
       * **philly.sqlite** - database with all the tables

   * **app.py** - flask app created routes connecting to tables in SQLite

   * **Templates**
       * index.html - html code for the homepage
       * salaries.html - html code for the salaries page
       * schools.html - html code for the schools page

   * **Static**
       * **css**
           * .stylelintrc.json
           * bootstrap.min.css
           * homepage.css
           * styles.css
       * **js**
           * homepage_plot.js
		* code to transform census tract and household income information
		* use Leaflet to create visualizations
           * salary_plot.js
		* code to transform income information by gender
		* use Plotly to create visualizations
           * schools.js
		* code to transform school data, including school ratings
		* use Leaflet to create visualizations






