from awips.dataaccess import DataAccessLayer
from datetime import datetime, timedelta, timezone
from dynamicserialize.dstypes.com.raytheon.uf.common.time import TimeRange
import json
from shapely.geometry import mapping

# Initialize DataAccessLayer
DataAccessLayer.changeEDEXHost("edex-cloud.unidata.ucar.edu")

# Define the time range from 24 to 12 hours ago using timezone-aware datetimes
endDateTime = datetime.now(timezone.utc) - timedelta(hours=12)
startDateTime = endDateTime - timedelta(hours=12)

start = startDateTime.strftime('%Y-%m-%d %H:%M:%S')
end = endDateTime.strftime('%Y-%m-%d %H:%M:%S')

beginRange = datetime.strptime(start, "%Y-%m-%d %H:%M:%S").replace(tzinfo=timezone.utc)
endRange = datetime.strptime(end, "%Y-%m-%d %H:%M:%S").replace(tzinfo=timezone.utc)
timerange = TimeRange(beginRange, endRange)

# Create a DataRequest object for warnings
request = DataAccessLayer.newDataRequest()
request.setDatatype("warning")

# Set the parameters to include in the request
params = ["phensig", "phen", "sig", "wfo"]
request.setParameters(*params)

# Fetch available times
times = DataAccessLayer.getAvailableTimes(request)
print("Available times:", times)

# Function to convert FormattedDate to timezone-aware datetime
def to_aware_datetime(fd):
    return datetime.utcfromtimestamp(fd.getRefTime().getTime() / 1000).replace(tzinfo=timezone.utc)

# Filter times within the specified time range
filtered_times = [time for time in times if beginRange <= to_aware_datetime(time) <= endRange]
print("Filtered times:", filtered_times)

# Check if filtered times is empty
if not filtered_times:
    print("No times available within the specified range.")
else:
    # Try fetching the geometry data within the specified time range
    try:
        print("Filtered reftime values:")
        reftime_values = [to_aware_datetime(time).strftime('%Y-%m-%d %H:%M:%S') for time in filtered_times]
        print(reftime_values)

        response = DataAccessLayer.getGeometryData(request, filtered_times)
        print(f"Fetched {len(response)} records.")

        # Prepare GeoJSON structure
        geojson_wdata = {
            "type": "FeatureCollection",
            "features": []
        }

        # Process the response and convert to GeoJSON
        for ob in response:
            poly = ob.getGeometry()
            site = ob.getLocationName()
            pd = ob.getDataTime().getValidPeriod()
            ref = ob.getDataTime().getRefTime()
            phensig = ob.getString("phensig")  # Get the phensig value
            phen = ob.getString("phen")  # Get the phen value
            sig = ob.getString("sig")  # Get the sig value
            wfo = ob.getString("wfo")  # Get the wfo value

            feature = {
                "type": "Feature",
                "geometry": mapping(poly),
                "properties": {
                    "site": site,
                    "valid_period": str(pd),
                    "reference_time": str(ref),
                    "phensig": phensig,  # Include phensig in properties
                    "phen": phen,  # Include phen in properties
                    "sig": sig,  # Include sig in properties
                    "wfo": wfo  # Include wfo in properties
                }
            }
            
            geojson_wdata["features"].append(feature)

        # Save the geojson_data to a file
        output_path = "/users/ahmedmosaad/documents/skyedge/MY-MAP/public/warnings_24_to_12_hours_ago.geojson"
        with open(output_path, "w") as f:
            json.dump(geojson_wdata, f)

        print(f"GeoJSON data saved to {output_path}")
    
    except Exception as e:
        print(f"Error fetching geometry data: {e}")
