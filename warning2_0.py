#Unsure if well get to this 
#Ignore for now

from awips.dataaccess import DataAccessLayer
from datetime import datetime, timedelta, timezone
from dynamicserialize.dstypes.com.raytheon.uf.common.time import TimeRange
import json
from shapely.geometry import mapping

# Set the EDEX Host
DataAccessLayer.changeEDEXHost("edex-cloud.unidata.ucar.edu")

# Define the time range for 12 hours ago to now
endDateTime = datetime.now(timezone.utc)
startDateTime = endDateTime - timedelta(hours=12)
timerange = TimeRange(startDateTime, endDateTime)

# Request weather warning polygons
request_warnings = DataAccessLayer.newDataRequest()
request_warnings.setDatatype("warning")
request_warnings.setParameters("phensig", "phen", "sig")
times_warnings = DataAccessLayer.getAvailableTimes(request_warnings)
response_warnings = DataAccessLayer.getGeometryData(request_warnings, times_warnings[-250:])

# Request GFS gridded data (temperature, humidity, wind)
request_gfs = DataAccessLayer.newDataRequest()
request_gfs.setDatatype("gfs")  # Gridded data from GFS model
request_gfs.setParameters("Temperature", "RH", "WindSpeed")  # Temperature, Humidity, Wind
request_gfs.setLevels("1000MB")  # Surface-level data
times_gfs = DataAccessLayer.getAvailableTimes(request_gfs)
response_gfs = DataAccessLayer.getGridData(request_gfs, times_gfs[-1:])  # Request latest data



# Prepare the GeoJSON structure
geojson_wdata = {
    "type": "FeatureCollection",
    "features": []
}

# Process each warning polygon and calculate average values from gridded data
for ob in response_warnings:
    poly = ob.getGeometry()
    pd = ob.getDataTime().getValidPeriod()
    ref = ob.getDataTime().getRefTime()

    # Extract phensig from the response object
    phensig = ob.getString("phensig") if ob.getString("phensig") else "Unknown"

    # Variables to calculate averages
    temp_sum = 0
    humidity_sum = 0
    wind_sum = 0
    grid_point_count = 0

    # Loop through the GFS grid data and find points that intersect the polygon
    for grid in response_gfs:
        # Extract grid geometry and values
        grid_geom = grid.getLocation()  # Grid point location (geometry)
        grid_temperature = grid.getValue("Temperature")
        grid_humidity = grid.getValue("RH")
        grid_wind = grid.getValue("WindSpeed")

        # Check if the grid point intersects the polygon using shapely
        if poly.intersects(grid_geom):
            # Accumulate the values for averaging
            temp_sum += grid_temperature
            humidity_sum += grid_humidity
            wind_sum += grid_wind
            grid_point_count += 1

    # Calculate the averages, if there are any grid points in the polygon
    if grid_point_count > 0:
        avg_temperature = temp_sum / grid_point_count
        avg_humidity = humidity_sum / grid_point_count
        avg_wind = wind_sum / grid_point_count
    else:
        avg_temperature = "N/A"
        avg_humidity = "N/A"
        avg_wind = "N/A"

    # Build the feature object with averaged gridded data
    feature = {
        "type": "Feature",
        "geometry": mapping(poly),
        "properties": {
            "phensig": phensig,
            "valid_period": str(pd),
            "reference_time": str(ref),
            "avg_temperature": avg_temperature,
            "avg_humidity": avg_humidity,
            "avg_windSpeed": avg_wind
        }
    }

    geojson_wdata["features"].append(feature)

# Save the geojson_data to a file
with open("./public/warnings_with_weather.geojson", "w") as f:
    json.dump(geojson_wdata, f)

print("GeoJSON data with weather saved to ./public/warnings_with_weather.geojson")
