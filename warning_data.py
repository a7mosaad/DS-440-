from awips.dataaccess import DataAccessLayer
from datetime import datetime, timedelta, timezone
from dynamicserialize.dstypes.com.raytheon.uf.common.time import TimeRange
import json
from shapely.geometry import mapping

# Set the EDEX Host
DataAccessLayer.changeEDEXHost("edex-cloud.unidata.ucar.edu")

# Define the time range from 24 to 12 hours ago using timezone-aware datetimes
endDateTime = datetime.now(timezone.utc) - timedelta(hours=12)
startDateTime = endDateTime - timedelta(hours=12)

beginRange = startDateTime
endRange = endDateTime
timerange = TimeRange(beginRange, endRange)

# Create the data request
request = DataAccessLayer.newDataRequest()
request.setDatatype("warning")

# Set the desired parameters
params = ["phensig", "phen", "sig"]
request.setParameters(*(params))

# Get available times in the last 12 hours
times = DataAccessLayer.getAvailableTimes(request)

# Adjust the range to get the most recent records (using the last 250 available times)
response = DataAccessLayer.getGeometryData(request, times[-250:])



# Prepare the GeoJSON structure
geojson_wdata = {
    "type": "FeatureCollection",
    "features": []
}

# Process each response and add it to the GeoJSON structure
for ob in response:
    poly = ob.getGeometry()
    pd = ob.getDataTime().getValidPeriod()
    ref = ob.getDataTime().getRefTime()

    # Extract phensig from the response object
    phensig = ob.getString("phensig") if ob.getString("phensig") else "Unknown"



    # Build the feature object
    feature = {
        "type": "Feature",
        "geometry": mapping(poly),
        "properties": {
            "phensig": phensig,
            "valid_period": str(pd),
            "reference_time": str(ref)
        }
    }

    geojson_wdata["features"].append(feature)

# Save the geojson_data to a file
with open("./public/warnings.geojson", "w") as f:
    json.dump(geojson_wdata, f)

print("GeoJSON data saved to ./public/warnings.geojson")
