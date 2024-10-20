const eventMapping = {
    'TO.W': 'Tornado Warning',                   // red
    'TO.A': 'Tornado Watch',                     // yellow
    'SV.W': 'Severe Thunderstorm Warning',       // orange
    'SV.A': 'Severe Thunderstorm Watch',         // yellow
    'FF.W': 'Flash Flood Warning',               // darkred
    'FF.A': 'Flash Flood Watch',                 // #ffa07a
    'FA.Y': 'Flood Advisory',                    // green
    'WS.W': 'Winter Storm Warning',              // purple
    'BZ.W': 'Blizzard Warning',                  // lightblue
    'HW.W': 'High Wind Warning',                 // pink
    'HT.Y': 'Heat Advisory',                     // darkorange
    'FR.W': 'Freeze Warning',                    // blue
    'FR.Y': 'Frost Advisory',                    // lightblue
    'FL.W': 'Flood Warning',                     // #00ff00
    'FL.A': 'Flood Watch',                       // #ffff00
    'WI.Y': 'Wind Advisory',                     // #ff69b4
    'IS.W': 'Ice Storm Warning',                 // #b0e0e6
    'WC.W': 'Wind Chill Warning',                // #add8e6
    'WC.Y': 'Wind Chill Advisory',               // #d3d3d3
    'DS.W': 'Dust Storm Warning',                // #f4a460
    'EH.W': 'Excessive Heat Warning',            // #ff0000
    'EH.A': 'Excessive Heat Watch',              // #ff8c00
    'AF.Y': 'Air Stagnation Advisory',           // #ffb6c1
    'CF.W': 'Coastal Flood Warning',             // #4682b4
    'CF.A': 'Coastal Flood Watch',               // #7fffd4
    'CF.Y': 'Coastal Flood Advisory',            // #00ffff
    'MA.W': 'Marine Warning',                    // #d2691e
    'SU.W': 'High Surf Warning',                 // #dc143c
    'SU.Y': 'High Surf Advisory',                // #00ced1
    'TS.W': 'Tsunami Warning',                   // #0000cd
    'TS.A': 'Tsunami Watch',                     // #1e90ff
    'TS.Y': 'Tsunami Advisory',                  // #87cefa
    'SE.W': 'Special Weather Statement',         // #ffa500
    'SM.W': 'Small Craft Advisory',              // #8b0000
    'SR.W': 'Storm Warning',                     // #00bfff
    'TR.W': 'Tropical Storm Warning',            // #ff4500
    'TR.A': 'Tropical Storm Watch',              // #ff6347
    'HU.W': 'Hurricane Warning',                 // #ff00ff
    'HU.A': 'Hurricane Watch',                   // #ff1493
    'LE.W': 'Lake Effect Snow Warning',          // #ffa07a
    'LE.A': 'Lake Effect Snow Watch',            // #ffd700
    'LE.Y': 'Lake Effect Snow Advisory',         // #ffdab9
    'GL.W': 'Gale Warning',                      // #ff69b4
    'GL.A': 'Gale Watch',                        // #ffb6c1
    'HZ.W': 'Hard Freeze Warning',               // #6a5acd
    'HZ.A': 'Hard Freeze Watch',                 // #7b68ee
    'HZ.Y': 'Hard Freeze Advisory',              // #e6e6fa
    'ZF.W': 'Freezing Fog Warning',              // #8b4513
    'ZF.Y': 'Freezing Fog Advisory',             // #cd853f
    'SS.W': 'Storm Surge Warning',               // #f08080
    'SS.A': 'Storm Surge Watch',                 // #fa8072
    'FF.S': 'Flash Flood Statement',             // #ff6347
    'FL.S': 'Flood Statement',                   // #ff4500
    'FG.Y': 'Dense Fog Advisory',                // #dda0dd
    'LW.Y': 'Lake Wind Advisory',                // #8fbc8f
    'HW.A': 'High Wind Watch',                   // #f0e68c
    'FR.A': 'Freeze Watch',                      // #b0c4de
    'EH.Y': 'Excessive Heat Advisory',           // #ff7f50
    'SC.Y': 'Special Marine Warning',            // #3cb371
    'WS.A': 'Winter Storm Watch',                // #ba55d3
    'BZ.A': 'Blizzard Watch',                    // #66cdaa
    'WW.Y': 'Winter Weather Advisory',           // #5f9ea0
    'HS.W': 'Heavy Snow Warning',                // #f4a460
    'FA.A': 'Flood Watch',                       // #32cd32
    'WC.A': 'Wind Chill Watch',                  // #cd853f
    'WI.A': 'Wind Advisory',                     // #ffa07a
    'FW.W': 'Red Flag Warning',                  // #ff4500
    'FW.A': 'Fire Weather Watch',                // #ff6347
    'FW.Y': 'Fire Weather Advisory',             // #ff8c00
    'FZ.A': 'Freeze Watch',                      
    'FZ.W': 'Freeze Warning', 
    'BH.S': 'Beach Hazards Statement',
    'RP.S': 'Rip Current Statement'
  };



// Define color mapping for phensig codes
const colorMapping = {
    'TO.W': 'red',                   // Tornado Warning
    'TO.A': 'yellow',                // Tornado Watch
    'SV.W': 'orange',                // Severe Thunderstorm Warning
    'SV.A': 'yellow',                // Severe Thunderstorm Watch
    'FF.W': 'darkred',               // Flash Flood Warning
    'FF.A': '#ffa07a',               // Flash Flood Watch
    'FA.Y': 'green',                 // Flood Advisory
    'WS.W': 'purple',                // Winter Storm Warning
    'BZ.W': 'lightblue',             // Blizzard Warning
    'HW.W': 'pink',                  // High Wind Warning
    'HT.Y': 'darkorange',            // Heat Advisory
    'FR.W': 'blue',                  // Freeze Warning
    'FR.Y': '#5f9ea0',             // Frost Advisory
    'FL.W': '#00ff00',               // Flood Warning
    'FL.A': '#ffff00',               // Flood Watch
    'WI.Y': '#ff69b4',               // Wind Advisory
    'IS.W': '#b0e0e6',               // Ice Storm Warning
    'WC.W': '#add8e6',               // Wind Chill Warning
    'WC.Y': '#d3d3d3',               // Wind Chill Advisory
    'DS.W': '#f4a460',               // Dust Storm Warning
    'EH.W': '#ff0000',               // Excessive Heat Warning
    'EH.A': '#ff8c00',               // Excessive Heat Watch
    'AF.Y': '#ffb6c1',               // Air Stagnation Advisory
    'CF.W': '#4682b4',               // Coastal Flood Warning
    'CF.A': '#7fffd4',               // Coastal Flood Watch
    'CF.Y': '#00ffff',               // Coastal Flood Advisory
    'MA.W': '#d2691e',               // Marine Warning
    'SU.W': '#dc143c',               // High Surf Warning
    'SU.Y': '#00ced1',               // High Surf Advisory
    'TS.W': '#0000cd',               // Tsunami Warning
    'TS.A': '#1e90ff',               // Tsunami Watch
    'TS.Y': '#87cefa',               // Tsunami Advisory
    'SE.W': '#ffa500',               // Special Weather Statement
    'SM.W': '#8b0000',               // Small Craft Advisory
    'SR.W': '#00bfff',               // Storm Warning
    'TR.W': '#ff4500',               // Tropical Storm Warning
    'TR.A': '#ff6347',               // Tropical Storm Watch
    'HU.W': '#ff00ff',               // Hurricane Warning
    'HU.A': '#ff1493',               // Hurricane Watch
    'LE.W': '#ffa07a',               // Lake Effect Snow Warning
    'LE.A': '#ffd700',               // Lake Effect Snow Watch
    'LE.Y': '#ffdab9',               // Lake Effect Snow Advisory
    'GL.W': '#ff69b4',               // Gale Warning
    'GL.A': '#ffb6c1',               // Gale Watch
    'HZ.W': '#6a5acd',               // Hard Freeze Warning
    'HZ.A': '#7b68ee',               // Hard Freeze Watch
    'HZ.Y': '#e6e6fa',               // Hard Freeze Advisory
    'ZF.W': '#8b4513',               // Freezing Fog Warning
    'ZF.Y': '#cd853f',               // Freezing Fog Advisory
    'SS.W': '#f08080',               // Storm Surge Warning
    'SS.A': '#fa8072',               // Storm Surge Watch
    'FF.S': '#ff6347',               // Flash Flood Statement
    'FL.S': '#ff4500',               // Flood Statement
    'FG.Y': '#dda0dd',               // Dense Fog Advisory
    'LW.Y': '#8fbc8f',               // Lake Wind Advisory
    'HW.A': '#f0e68c',               // High Wind Watch
    'FR.A': '#b0c4de',               // Freeze Watch
    'EH.Y': '#ff7f50',               // Excessive Heat Advisory
    'SC.Y': '#3cb371',               // Special Marine Warning
    'WS.A': '#ba55d3',               // Winter Storm Watch
    'BZ.A': '#66cdaa',               // Blizzard Watch
    'WW.Y': '#5f9ea0',               // Winter Weather Advisory
    'HS.W': '#f4a460',               // Heavy Snow Warning
    'FA.A': '#32cd32',               // Flood Watch
    'WC.A': '#cd853f',               // Wind Chill Watch
    'WI.A': '#ffa07a',               // Wind Advisory
    'FW.W': '#ff4500',               // Red Flag Warning
    'FW.A': '#ff6347',               // Fire Weather Watch
    'FW.Y': '#ff8c00',               // Fire Weather Advisory
    'FZ.A': '#4682B4',                //Freeze Watch                    
    'FZ.W': '#00008B',                //Freeze Warning
    'BH.S': '#FF7F50',                //Beach Hazards Statement
    'RP.S': '#008080'                //Rip Current Statement
  
    
    // Add more mappings as needed
  };

const highPriorityEvents = [
  'TO.W',  // Tornado Warning
  'HU.W',  // Hurricane Warning
  'SV.W',  // Severe Thunderstorm Warning
  'FF.W',  // Flash Flood Warning
  'BZ.W',  // Blizzard Warning
  'IS.W',  // Ice Storm Warning
  'WC.W',  // Wind Chill Warning
  'EH.W',  // Excessive Heat Warning
  'DS.W',  // Dust Storm Warning
  'SS.W',  // Storm Surge Warning
  'SR.W',  // Storm Warning
  'TR.W',  // Tropical Storm Warning
  'TS.W',  // Tsunami Warning
  'HZ.W',  // Hard Freeze Warning
  'HS.W',  // Heavy Snow Warning
  'FW.W',  // Red Flag Warning
  'ZF.W',  // Freezing Fog Warning
  'MA.W',  // Marine Warning
];


const mediumPriorityEvents = [
  'TO.A',  // Tornado Watch
  'HU.A',  // Hurricane Watch
  'SV.A',  // Severe Thunderstorm Watch
  'FF.A',  // Flash Flood Watch
  'BZ.A',  // Blizzard Watch
  'WC.A',  // Wind Chill Watch
  'EH.A',  // Excessive Heat Watch
  'SS.A',  // Storm Surge Watch
  'SR.A',  // Storm Watch
  'TR.A',  // Tropical Storm Watch
  'TS.A',  // Tsunami Watch
  'HZ.A',  // Hard Freeze Watch
  'FW.A',  // Fire Weather Watch
  'FR.W',  // Freeze Warning
  'HW.W',  // High Wind Warning
  'WS.W',  // Winter Storm Warning
  'LE.W',  // Lake Effect Snow Warning
  'GL.W',  // Gale Warning
];

const lowPriorityEvents = [
  'WI.Y',  // Wind Advisory
  'FR.Y',  // Frost Advisory
  'FA.Y',  // Flood Advisory
  'WC.Y',  // Wind Chill Advisory
  'EH.Y',  // Excessive Heat Advisory
  'FW.Y',  // Fire Weather Advisory
  'ZF.Y',  // Freezing Fog Advisory
  'SC.Y',  // Special Marine Warning
  'LE.A',  // Lake Effect Snow Watch
  'LE.Y',  // Lake Effect Snow Advisory
  'FL.W',  // Flood Warning
  'FL.A',  // Flood Watch
  'FA.A',  // Flood Watch
  'FL.S',  // Flood Statement
  'FF.S',  // Flash Flood Statement
  'FR.A',  // Freeze Watch
  'HW.A',  // High Wind Watch
  'WS.A',  // Winter Storm Watch
  'WW.Y',  // Winter Weather Advisory
  'SM.W',  // Small Craft Advisory
  'SU.W',  // High Surf Warning
  'SU.Y',  // High Surf Advisory
  'CF.W',  // Coastal Flood Warning
  'CF.A',  // Coastal Flood Watch
  'CF.Y',  // Coastal Flood Advisory
  'WI.A',  // Wind Advisory
  'FG.Y',  // Dense Fog Advisory
  'LW.Y',  // Lake Wind Advisory
  'SE.W',  // Special Weather Statement
];

  export {eventMapping,colorMapping,highPriorityEvents,mediumPriorityEvents,lowPriorityEvents } ;
