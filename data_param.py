from awips.dataaccess import DataAccessLayer
from datetime import datetime, timedelta
from dynamicserialize.dstypes.com.raytheon.uf.common.time import TimeRange
import json
from shapely.geometry import mapping

DataAccessLayer.changeEDEXHost("edex-cloud.unidata.ucar.edu")

request = DataAccessLayer.newDataRequest()
request.setDatatype("warning")
params = ["phensig", "sig"]
request.setParameters(*(params))

# Get records from the last 12 hours
lastHourDateTime = datetime.utcnow() - timedelta(hours=12)
start = lastHourDateTime.strftime('%Y-%m-%d %H:%M:%S')
end = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')

beginRange = datetime.strptime(start, "%Y-%m-%d %H:%M:%S")
endRange = datetime.strptime(end, "%Y-%m-%d %H:%M:%S")
timerange = TimeRange(beginRange, endRange)

request = DataAccessLayer.newDataRequest()
request.setDatatype("warning")
request.setParameters('phensig')
times = DataAccessLayer.getAvailableTimes(request)
response = DataAccessLayer.getGeometryData(request, times[-50:-1])

geojson_wdata = {
    "type": "FeatureCollection",
    "features": []
}

unique_parameters = set()

for ob in response:
    poly = ob.getGeometry()
    site = ob.getLocationName()
    pd = ob.getDataTime().getValidPeriod()
    ref = ob.getDataTime().getRefTime()
    phensig = ob.getString("phensig")  # Get the phensig value



    feature = {
        "type": "Feature",
        "geometry": mapping(poly),
        "properties": {
            "site": site,
            "valid_period": str(pd),
            "reference_time": str(ref),
            "phensig": phensig,  # Include phensig in properties
        }
    }
    
    geojson_wdata["features"].append(feature)

# Save the geojson_data to a file
with open("./public/warnings.geojson", "w") as f:
    json.dump(geojson_wdata, f)

# Print the unique parameters found
print(f"Unique parameters found: {unique_parameters}")
