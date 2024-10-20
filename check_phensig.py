# this script was used to debug an issue with a phensig code that was not in my mappings
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

# Define the mapping for known phensig codes
phensig_to_warning = {
    'TO.W': 'Tornado Warning',
    'TO.A': 'Tornado Watch',
    'SV.W': 'Severe Thunderstorm Warning',
    'SV.A': 'Severe Thunderstorm Watch',
    'FF.W': 'Flash Flood Warning',
    'FF.A': 'Flash Flood Watch',
    'FA.Y': 'Flood Advisory',
    'WS.W': 'Winter Storm Warning',
    'BZ.W': 'Blizzard Warning',
    'HW.W': 'High Wind Warning',
    'HT.Y': 'Heat Advisory',
    'FR.W': 'Freeze Warning',
    'FR.Y': 'Frost Advisory',
    'FL.W': 'Flood Warning',
    'FL.A': 'Flood Watch',
    'WI.Y': 'Wind Advisory',
    'IS.W': 'Ice Storm Warning',
    'WC.W': 'Wind Chill Warning',
    'WC.Y': 'Wind Chill Advisory',
    'DS.W': 'Dust Storm Warning',
    'EH.W': 'Excessive Heat Warning',
    'EH.A': 'Excessive Heat Watch',
    'AF.Y': 'Air Stagnation Advisory',
    'CF.W': 'Coastal Flood Warning',
    'CF.A': 'Coastal Flood Watch',
    'CF.Y': 'Coastal Flood Advisory',
    'MA.W': 'Marine Warning',
    'SU.W': 'High Surf Warning',
    'SU.Y': 'High Surf Advisory',
    'TS.W': 'Tsunami Warning',
    'TS.A': 'Tsunami Watch',
    'TS.Y': 'Tsunami Advisory',
    'SE.W': 'Special Weather Statement',
    'SM.W': 'Small Craft Advisory',
    'SR.W': 'Storm Warning',
    'TR.W': 'Tropical Storm Warning',
    'TR.A': 'Tropical Storm Watch',
    'HU.W': 'Hurricane Warning',
    'HU.A': 'Hurricane Watch',
    'LE.W': 'Lake Effect Snow Warning',
    'LE.A': 'Lake Effect Snow Watch',
    'LE.Y': 'Lake Effect Snow Advisory',
    'GL.W': 'Gale Warning',
    'GL.A': 'Gale Watch',
    'HZ.W': 'Hard Freeze Warning',
    'HZ.A': 'Hard Freeze Watch',
    'HZ.Y': 'Hard Freeze Advisory',
    'ZF.W': 'Freezing Fog Warning',
    'ZF.Y': 'Freezing Fog Advisory',
    'SS.W': 'Storm Surge Warning',
    'SS.A': 'Storm Surge Watch',
    'FF.S': 'Flash Flood Statement',
    'FL.S': 'Flood Statement',
    'FG.Y': 'Dense Fog Advisory',
    'LW.Y': 'Lake Wind Advisory',
    'HW.A': 'High Wind Watch',
    'FR.A': 'Freeze Watch',
    'EH.Y': 'Excessive Heat Advisory',
    'SC.Y': 'Special Marine Warning',
    'WS.A': 'Winter Storm Watch',
    'BZ.A': 'Blizzard Watch',
    'WW.Y': 'Winter Weather Advisory',
    'HS.W': 'Heavy Snow Warning',
    'FA.A': 'Flood Watch',
    'WC.A': 'Wind Chill Watch',
    'WI.A': 'Wind Advisory',
    'FW.W': 'Red Flag Warning',
    'FW.A': 'Fire Weather Watch',
    'FW.Y': 'Fire Weather Advisory',
}



# Prepare the GeoJSON structure
geojson_wdata = {
    "type": "FeatureCollection",
    "features": []
}

# Create a set to store missing phensig codes for debugging
missing_phensigs = set()

# Process each response and add it to the GeoJSON structure
for ob in response:
    poly = ob.getGeometry()
    pd = ob.getDataTime().getValidPeriod()
    ref = ob.getDataTime().getRefTime()

    # Extract phensig from the response object
    phensig = ob.getString("phensig")

    # Only process polygons with a valid phensig
    if phensig:
        # Check if phensig exists in the mapping
        if phensig not in phensig_to_warning:
            # Add to the missing phensig set for debugging
            missing_phensigs.add(phensig)

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

        # Add the feature to the GeoJSON structure
        geojson_wdata["features"].append(feature)

# Save the geojson_data to a file
with open("./public/warnings.geojson", "w") as f:
    json.dump(geojson_wdata, f)

# Log missing phensig codes
if missing_phensigs:
    print("Missing phensig codes that are not in the mapping:")
    for missing in missing_phensigs:
        print(missing)

print("GeoJSON data saved to ./public/warnings.geojson")
