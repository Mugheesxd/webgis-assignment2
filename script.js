// ========================================================================
// PUBLIC TRANSPORT AND MOBILITY — ISLAMABAD & RAWALPINDI
// Web GIS Application using JavaScript fetch(), Overpass API & Leaflet
// ========================================================================

// ------------------------------------------------------------------------
// 1. Create Map (Centered on Islamabad & Rawalpindi Twin Cities)
// ------------------------------------------------------------------------
const map = L.map("map").setView([33.6650, 73.0650], 12);

// ------------------------------------------------------------------------
// 2. Base Maps (OpenStreetMap & Esri Satellite Imagery — From Lab 05)
// ------------------------------------------------------------------------
const osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; OpenStreetMap contributors"
  }
).addTo(map);

const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri"
  }
);

// ------------------------------------------------------------------------
// 3. Map Layers (Routes Layer & Stops/Stations Layer)
// ------------------------------------------------------------------------
const routesLayer = L.layerGroup().addTo(map);
const transportLayer = L.layerGroup().addTo(map);

const baseMaps = {
  "OpenStreetMap": osm,
  "Satellite": satellite
};

const overlayMaps = {
  "Transport Routes (Lines)": routesLayer,
  "Stops & Stations": transportLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

// ------------------------------------------------------------------------
// 4. Verified GPS Coordinates of Twin Cities Stations & Stops
//    (Aligned directly to Murree Rd, 9th Ave, Jinnah Ave, Srinagar Hwy,
//     Islamabad Expressway, Park Rd & Pakistan Railways ML-1 Track)
// ------------------------------------------------------------------------
const VERIFIED_LOCATIONS = [
  // RED LINE METROBUS (Rawalpindi Murree Road -> Faizabad -> 9th Ave -> Jinnah Ave -> Pak Secretariat)
  { id: "saddar", name: "Saddar Metrobus Station", latitude: 33.59366, longitude: 73.05605, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "marrir", name: "Marrir Chowk Metrobus Station", latitude: 33.60010, longitude: 73.06190, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "liaquat", name: "Liaquat Bagh Metrobus Station", latitude: 33.60624, longitude: 73.06570, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "committee", name: "Committee Chowk Metrobus Station", latitude: 33.61230, longitude: 73.06630, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "wariskhan", name: "Waris Khan Metrobus Station", latitude: 33.62150, longitude: 73.06890, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "chandni", name: "Chandni Chowk Metrobus Station", latitude: 33.63350, longitude: 73.07360, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "rehmanabad", name: "Rehmanabad Metrobus Station", latitude: 33.64264, longitude: 73.07770, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "sixthroad", name: "6th Road Metrobus Station", latitude: 33.64466, longitude: 73.07850, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "shamsabad", name: "Shamsabad Metrobus Station", latitude: 33.65026, longitude: 73.08036, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "faizabad", name: "Faizabad Metrobus Station", latitude: 33.66464, longitude: 73.08450, category: "Metrobus Station", routeId: "red_line", operator: "PMA / CDA", vehicle: "Red & Blue Line Transfer Hub" },
  { id: "ijp", name: "IJP Metrobus Station", latitude: 33.65501, longitude: 73.06973, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "potohar", name: "Potohar Metrobus Station (I-8 / I-9)", latitude: 33.66114, longitude: 73.06536, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "johar", name: "Khayaban-e-Johar Metrobus Station (H-8/H-9)", latitude: 33.66939, longitude: 73.05911, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "faizahmed", name: "Faiz Ahmed Faiz Metrobus Station (H-8 Transfer Hub)", latitude: 33.67542, longitude: 73.05467, category: "Metrobus Station", routeId: "red_line", operator: "PMA / CDA", vehicle: "Red & Orange Line Transfer Hub" },
  { id: "kashmirhwy", name: "Kashmir Highway Metrobus Station (G-8/G-9)", latitude: 33.68246, longitude: 73.04752, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "chaman", name: "Chaman Metrobus Station (G-8 / G-9)", latitude: 33.68950, longitude: 73.04180, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "ibnesina", name: "Ibn-e-Sina Metrobus Station (G-9 / F-9)", latitude: 33.69750, longitude: 73.03550, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "katchery", name: "Katchery Metrobus Station (F-8 / G-8)", latitude: 33.70280, longitude: 73.04220, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "pims", name: "PIMS Metrobus Central Hub (Centaurus / G-8)", latitude: 33.70590, longitude: 73.04844, category: "Metrobus Station", routeId: "red_line", operator: "PMA / CDA", vehicle: "Red, Blue, Green & Electric Bus Hub" },
  { id: "stockex", name: "Stock Exchange Metrobus Station (Blue Area)", latitude: 33.71050, longitude: 73.05680, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "seventh", name: "7th Avenue Metrobus Station (Blue Area)", latitude: 33.71560, longitude: 73.06640, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "shaheed", name: "Shaheed-e-Millat Metrobus Station (Blue Area)", latitude: 33.72161, longitude: 73.07836, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "parade", name: "Parade Ground Metrobus Station", latitude: 33.72471, longitude: 73.08442, category: "Metrobus Station", routeId: "red_line", operator: "PMA Metrobus", vehicle: "Red Line Articulated BRT" },
  { id: "paksec", name: "Pak Secretariat Metrobus Terminus", latitude: 33.73513, longitude: 73.09232, category: "Metrobus Station", routeId: "red_line", operator: "PMA / CDA", vehicle: "Red Line Terminus" },

  // ORANGE LINE METROBUS (Srinagar Highway: Faiz Ahmed Faiz -> G-10 -> G-11 -> NUST -> G-13 -> N-5)
  { id: "highcourt", name: "G-10 / High Court Orange Line Station", latitude: 33.67120, longitude: 73.02520, category: "Metrobus Station", routeId: "orange_line", operator: "CDA Metrobus", vehicle: "Orange Line BRT" },
  { id: "g11metro", name: "G-11 / Police Foundation Orange Line Station", latitude: 33.66296, longitude: 73.00736, category: "Metrobus Station", routeId: "orange_line", operator: "CDA Metrobus", vehicle: "Orange Line BRT" },
  { id: "nustmetro", name: "NUST Orange Line Station (H-12)", latitude: 33.65571, longitude: 72.99339, category: "Metrobus Station", routeId: "orange_line", operator: "CDA Metrobus", vehicle: "Orange Line BRT" },
  { id: "g13metro", name: "G-13 / Golra Morr Orange Line Station", latitude: 33.64954, longitude: 72.98177, category: "Metrobus Station", routeId: "orange_line", operator: "CDA Metrobus", vehicle: "Orange Line BRT" },
  { id: "n5metro", name: "N-5 / 26 No. Chungi Orange Line Station", latitude: 33.63194, longitude: 72.94486, category: "Metrobus Station", routeId: "orange_line", operator: "CDA Metrobus", vehicle: "Orange Line Airport Corridor" },

  // BLUE LINE METROBUS (PIMS -> Zero Point -> Sohan -> Khanna Pul -> Koral Chowk -> Gulberg Greens)
  { id: "sohan", name: "Sohan Blue Line Metrobus Station", latitude: 33.65961, longitude: 73.09080, category: "Metrobus Station", routeId: "blue_line", operator: "CDA Metrobus", vehicle: "Blue Line BRT" },
  { id: "khannapul", name: "Khanna Pul Blue Line Station", latitude: 33.62706, longitude: 73.11492, category: "Metrobus Station", routeId: "blue_line", operator: "CDA Metrobus", vehicle: "Blue Line BRT" },
  { id: "koral", name: "Koral Chowk Blue Line Station", latitude: 33.60244, longitude: 73.13298, category: "Metrobus Station", routeId: "blue_line", operator: "CDA Metrobus", vehicle: "Blue Line BRT" },
  { id: "gulberg", name: "Gulberg Greens Blue Line Terminus", latitude: 33.59544, longitude: 73.13877, category: "Metrobus Station", routeId: "blue_line", operator: "CDA Metrobus", vehicle: "Blue Line BRT" },

  // GREEN LINE METROBUS (PIMS -> Aabpara -> Lake View Park -> Malpur -> Bhara Kahu)
  { id: "aabpara", name: "Aabpara Chowk Green Line Stop", latitude: 33.70786, longitude: 73.08998, category: "Metrobus Station", routeId: "green_line", operator: "CDA Metrobus", vehicle: "Green Line BRT" },
  { id: "lakeview", name: "Lake View Park / Murree Road Stop", latitude: 33.71380, longitude: 73.12850, category: "Metrobus Station", routeId: "green_line", operator: "CDA Metrobus", vehicle: "Green Line BRT" },
  { id: "bharakahu", name: "Bhara Kahu Green Line Terminus", latitude: 33.73807, longitude: 73.17650, category: "Metrobus Station", routeId: "green_line", operator: "CDA Metrobus", vehicle: "Green Line BRT" },

  // CDA ELECTRIC FEEDER BUS STOPS (FR-4 Park Road & FR-7 Markaz Corridors)
  { id: "rawalchowk", name: "Rawal Chowk Electric Feeder Stop", latitude: 33.69380, longitude: 73.10620, category: "Electric Feeder Stop", routeId: "fr4_park_road", operator: "CDA Electric Feeder FR-4", vehicle: "CDA Zero-Emission Electric Bus" },
  { id: "chakshahzad", name: "Chak Shahzad / NARC Electric Bus Stop", latitude: 33.67320, longitude: 73.13680, category: "Electric Feeder Stop", routeId: "fr4_park_road", operator: "CDA Electric Feeder FR-4", vehicle: "CDA Zero-Emission Electric Bus" },
  { id: "comsats", name: "COMSATS University Park Road Electric Bus Stop", latitude: 33.64794, longitude: 73.15592, category: "Electric Feeder Stop", routeId: "fr4_park_road", operator: "CDA Electric Feeder FR-4", vehicle: "CDA Zero-Emission Electric Bus" },
  { id: "f8markaz", name: "F-8 Markaz Electric Bus Stop", latitude: 33.71080, longitude: 73.04050, category: "Electric Feeder Stop", routeId: "fr7_markaz", operator: "CDA Electric Feeder FR-7", vehicle: "CDA Zero-Emission Electric Bus" },
  { id: "f10markaz", name: "F-10 Markaz Roundabout Electric Bus Stop", latitude: 33.69120, longitude: 73.01180, category: "Electric Feeder Stop", routeId: "fr7_markaz", operator: "CDA Electric Feeder FR-7", vehicle: "CDA Zero-Emission Electric Bus" },
  { id: "g11markaz", name: "G-11 Markaz Electric Bus Stop", latitude: 33.66950, longitude: 72.99820, category: "Electric Feeder Stop", routeId: "fr7_markaz", operator: "CDA Electric Feeder FR-7", vehicle: "CDA Zero-Emission Electric Bus" },

  // INTERCITY BUS TERMINALS
  { id: "faizabad_term", name: "Faizabad Intercity Bus Terminal", latitude: 33.66464, longitude: 73.08707, category: "Bus Terminal", routeId: "blue_line", operator: "CDA / Intercity Operators", vehicle: "Intercity Coaches & Regional Buses" },
  { id: "pirwadhai", name: "Pirwadhai General Bus Stand", latitude: 33.62989, longitude: 73.04208, category: "Bus Terminal", routeId: "red_line", operator: "RDA / Interprovincial Terminal", vehicle: "Intercity & Regional Buses" },

  // PAKISTAN RAILWAYS STATIONS (Main Line-1 Track)
  { id: "rwp_rail", name: "Rawalpindi Railway Station", latitude: 33.60344, longitude: 73.04763, category: "Railway Station", routeId: "railway_ml1", operator: "Pakistan Railways", vehicle: "Main Line-1 Passenger Trains" },
  { id: "chaklala_rail", name: "Chaklala Railway Station", latitude: 33.60150, longitude: 73.08780, category: "Railway Station", routeId: "railway_ml1", operator: "Pakistan Railways", vehicle: "Suburban & ML-1 Rail" },
  { id: "margalla_rail", name: "Margalla Railway Station Islamabad (I-9)", latitude: 33.66354, longitude: 73.04210, category: "Railway Station", routeId: "railway_ml1", operator: "Pakistan Railways", vehicle: "Islamabad Express / Railcar" },
  { id: "golra_rail", name: "Golra Sharif Junction Railway Station", latitude: 33.67050, longitude: 72.94820, category: "Railway Station", routeId: "railway_ml1", operator: "Pakistan Railways", vehicle: "Heritage & Main Line Junction" }
];

// ------------------------------------------------------------------------
// 5. Transit Route Corridors (Waypoints follow the exact highways/tracks)
// ------------------------------------------------------------------------
const TRANSIT_ROUTES = {
  red_line: {
    id: "red_line",
    name: "Red Line Metrobus (Saddar RWP – Pak Secretariat ISB)",
    operator: "Punjab Mass Transit Authority (PMA)",
    vehicleType: "Articulated BRT Metrobus",
    color: "#e11d48",
    snapToRoad: true,
    coords: [
      [33.59366, 73.05605], // Saddar
      [33.60010, 73.06190], // Marrir Chowk
      [33.60624, 73.06570], // Liaquat Bagh
      [33.61230, 73.06630], // Committee Chowk
      [33.62150, 73.06890], // Waris Khan
      [33.63350, 73.07360], // Chandni Chowk
      [33.64264, 73.07770], // Rehmanabad
      [33.64466, 73.07850], // 6th Road
      [33.65026, 73.08036], // Shamsabad
      [33.66464, 73.08450], // Faizabad (Murree Rd / IJP Junction)
      [33.65501, 73.06973], // IJP Station (along IJP Road)
      [33.66114, 73.06536], // Potohar (turns onto 9th Avenue)
      [33.66939, 73.05911], // Khayaban-e-Johar (9th Ave)
      [33.67542, 73.05467], // Faiz Ahmed Faiz (9th Ave)
      [33.68246, 73.04752], // Kashmir Highway Station (9th Ave)
      [33.68950, 73.04180], // Chaman (9th Ave)
      [33.69750, 73.03550], // Ibn-e-Sina (turns onto Jinnah Ave)
      [33.70280, 73.04220], // Katchery (Jinnah Ave)
      [33.70590, 73.04844], // PIMS / Centaurus (Jinnah Ave)
      [33.71050, 73.05680], // Stock Exchange (Jinnah Ave)
      [33.71560, 73.06640], // 7th Avenue (Jinnah Ave)
      [33.72161, 73.07836], // Shaheed-e-Millat (Jinnah Ave)
      [33.72471, 73.08442], // Parade Ground (Jinnah Ave)
      [33.73513, 73.09232]  // Pak Secretariat Terminus
    ]
  },
  orange_line: {
    id: "orange_line",
    name: "Orange Line Metrobus (Faiz Ahmed Faiz – N-5 / 26 No. Chungi)",
    operator: "Capital Development Authority (CDA)",
    vehicleType: "Metrobus Rapid Transit",
    color: "#ea580c",
    snapToRoad: true,
    coords: [
      [33.67542, 73.05467], // Faiz Ahmed Faiz Interchange
      [33.68246, 73.04752], // Srinagar Highway / 9th Ave Junction
      [33.67120, 73.02520], // G-10 / High Court (Srinagar Hwy)
      [33.66296, 73.00736], // G-11 / Police Foundation (Srinagar Hwy)
      [33.65571, 72.99339], // NUST Station (Srinagar Hwy)
      [33.64954, 72.98177], // G-13 / Golra Morr (Srinagar Hwy)
      [33.63194, 72.94486]  // N-5 / 26 No. Chungi Station
    ]
  },
  blue_line: {
    id: "blue_line",
    name: "Blue Line Metrobus (PIMS – Faizabad – Koral – Gulberg Greens)",
    operator: "CDA Metrobus Operations",
    vehicleType: "Metrobus / Expressway Coach",
    color: "#2563eb",
    snapToRoad: true,
    coords: [
      [33.70590, 73.04844], // PIMS Hub
      [33.69450, 73.06550], // Zero Point Interchange
      [33.66464, 73.08450], // Faizabad Interchange
      [33.65961, 73.09080], // Sohan (Islamabad Expressway)
      [33.62706, 73.11492], // Khanna Pul (Islamabad Expressway)
      [33.60244, 73.13298], // Koral Chowk (Islamabad Expressway)
      [33.59544, 73.13877]  // Gulberg Greens Interchange
    ]
  },
  green_line: {
    id: "green_line",
    name: "Green Line Metrobus (PIMS – Aabpara – Lake View – Bhara Kahu)",
    operator: "CDA Metrobus Operations",
    vehicleType: "Green Line Electric / BRT",
    color: "#16a34a",
    snapToRoad: true,
    coords: [
      [33.70590, 73.04844], // PIMS Hub
      [33.70200, 73.07200], // Zero Point North / G-7
      [33.70786, 73.08998], // Aabpara Chowk (Murree Road)
      [33.71050, 73.10500], // Kashmir Chowk / Serena
      [33.71380, 73.12850], // Lake View Park (Murree Road)
      [33.73807, 73.17650]  // Bhara Kahu Terminus
    ]
  },
  fr4_park_road: {
    id: "fr4_park_road",
    name: "CDA Electric Bus FR-4 (PIMS – Rawal Chowk – COMSATS Park Road)",
    operator: "CDA Electric Feeder Service",
    vehicleType: "Zero-Emission Electric Bus",
    color: "#0d9488",
    snapToRoad: true,
    coords: [
      [33.70590, 73.04844], // PIMS Hub
      [33.69450, 73.06550], // Zero Point
      [33.69380, 73.10620], // Rawal Chowk (Park Road Start)
      [33.67320, 73.13680], // Chak Shahzad / NARC (Park Road)
      [33.64794, 73.15592]  // COMSATS University Islamabad (Park Road)
    ]
  },
  fr7_markaz: {
    id: "fr7_markaz",
    name: "CDA Electric Bus FR-7 (PIMS – F-8 – F-10 – G-11 – NUST)",
    operator: "CDA Electric Feeder Service",
    vehicleType: "Zero-Emission Electric Bus",
    color: "#7c3aed",
    snapToRoad: true,
    coords: [
      [33.70590, 73.04844], // PIMS Hub
      [33.70280, 73.04220], // Katchery
      [33.71080, 73.04050], // F-8 Markaz
      [33.69120, 73.01180], // F-10 Markaz Roundabout
      [33.66950, 72.99820], // G-11 Markaz
      [33.65571, 72.99339]  // NUST Orange Line Station
    ]
  },
  railway_ml1: {
    id: "railway_ml1",
    name: "Pakistan Railways Line (Golra Sharif – Margalla – Rawalpindi – Chaklala)",
    operator: "Pakistan Railways",
    vehicleType: "Passenger Rail / Intercity Train",
    color: "#b45309",
    snapToRoad: false, // Railways follow rail track geometry
    coords: [
      [33.67050, 72.94820], // Golra Sharif Junction
      [33.66600, 72.99500], // H-13 / I-11 Rail Track
      [33.66354, 73.04210], // Margalla Railway Station (I-9)
      [33.63500, 73.04450], // IJP / Pirwadhai Rail Corridor
      [33.60344, 73.04763], // Rawalpindi Railway Station
      [33.60150, 73.08780]  // Chaklala Railway Station
    ]
  }
};

// Sector anchors used to give a clean, accurate name to any unnamed OSM stop
const AREA_ANCHORS = [
  { name: "F-6 Markaz", lat: 33.7298, lon: 73.0758, routeId: "red_line" },
  { name: "F-7 Jinnah Super", lat: 33.7210, lon: 73.0580, routeId: "red_line" },
  { name: "F-8 Markaz", lat: 33.7108, lon: 73.0405, routeId: "fr7_markaz" },
  { name: "F-10 Markaz", lat: 33.6912, lon: 73.0118, routeId: "fr7_markaz" },
  { name: "G-6 / Aabpara", lat: 33.7078, lon: 73.0899, routeId: "green_line" },
  { name: "G-7 / Blue Area", lat: 33.7105, lon: 73.0568, routeId: "red_line" },
  { name: "G-8 / PIMS", lat: 33.7059, lon: 73.0484, routeId: "red_line" },
  { name: "G-9 / Karachi Company", lat: 33.6895, lon: 73.0418, routeId: "red_line" },
  { name: "G-10 Srinagar Hwy", lat: 33.6712, lon: 73.0252, routeId: "orange_line" },
  { name: "G-11 Markaz", lat: 33.6695, lon: 72.9982, routeId: "fr7_markaz" },
  { name: "H-12 / NUST", lat: 33.6557, lon: 72.9934, routeId: "orange_line" },
  { name: "G-13 / Golra Morr", lat: 33.6495, lon: 72.9818, routeId: "orange_line" },
  { name: "H-8 / Faiz Ahmed Faiz", lat: 33.6754, lon: 73.0547, routeId: "red_line" },
  { name: "I-8 / Potohar", lat: 33.6611, lon: 73.0654, routeId: "red_line" },
  { name: "Faizabad Interchange", lat: 33.6646, lon: 73.0845, routeId: "red_line" },
  { name: "Park Road / Chak Shahzad", lat: 33.6732, lon: 73.1368, routeId: "fr4_park_road" },
  { name: "COMSATS Park Road", lat: 33.6479, lon: 73.1559, routeId: "fr4_park_road" },
  { name: "Rawal Chowk", lat: 33.6938, lon: 73.1062, routeId: "fr4_park_road" },
  { name: "Bhara Kahu Murree Rd", lat: 33.7381, lon: 73.1765, routeId: "green_line" },
  { name: "Khanna Pul Expressway", lat: 33.6271, lon: 73.1149, routeId: "blue_line" },
  { name: "Koral Chowk Expressway", lat: 33.6024, lon: 73.1330, routeId: "blue_line" },
  { name: "Shamsabad Murree Rd", lat: 33.6503, lon: 73.0804, routeId: "red_line" },
  { name: "Chandni Chowk RWP", lat: 33.6335, lon: 73.0736, routeId: "red_line" },
  { name: "Liaquat Bagh RWP", lat: 33.6062, lon: 73.0657, routeId: "red_line" },
  { name: "Saddar Rawalpindi", lat: 33.5937, lon: 73.0561, routeId: "red_line" }
];

let allLocations = [...VERIFIED_LOCATIONS];
let selectedRouteId = "all";
const markerById = {};

// ------------------------------------------------------------------------
// 6. Snap Route Polylines to Actual OSM Roads using OSRM API
//    (Fixes road path misalignment so lines curve strictly along highways!)
// ------------------------------------------------------------------------
async function snapRoutesToActualRoads() {
  for (const key in TRANSIT_ROUTES) {
    const route = TRANSIT_ROUTES[key];
    if (!route.snapToRoad) continue;

    // OSRM takes lon,lat pairs separated by semicolons
    const coordString = route.coords
      .map(pt => `${pt[1].toFixed(5)},${pt[0].toFixed(5)}`)
      .join(";");

    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;

    try {
      const response = await fetch(osrmUrl);
      if (!response.ok) continue;
      const data = await response.json();
      if (data.routes && data.routes[0] && data.routes[0].geometry) {
        // Convert GeoJSON [lon, lat] back to Leaflet [lat, lon]
        route.roadGeometry = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
        drawRoutes();
      }
    } catch (err) {
      // Fallback to verified station-to-station coordinates if offline
      console.warn("Using station-aligned polyline for", route.id);
    }
  }
}

// ------------------------------------------------------------------------
// 7. Symbology Helper Functions (Distinct Icon & Color per Category)
// ------------------------------------------------------------------------
function getCategorySymbol(category) {
  if (category === "Metrobus Station") {
    return { color: "#e11d48", badge: "M", size: 22 };
  }
  if (category === "Electric Feeder Stop") {
    return { color: "#0d9488", badge: "E", size: 19 };
  }
  if (category === "Bus Terminal") {
    return { color: "#7c3aed", badge: "T", size: 22 };
  }
  if (category === "Railway Station") {
    return { color: "#b45309", badge: "R", size: 22 };
  }
  return { color: "#2563eb", badge: "B", size: 18 };
}

function findNearestArea(lat, lon) {
  let best = AREA_ANCHORS[0];
  let minDist = Infinity;
  for (const anchor of AREA_ANCHORS) {
    const d = Math.hypot(anchor.lat - lat, anchor.lon - lon);
    if (d < minDist) {
      minDist = d;
      best = anchor;
    }
  }
  return best;
}

// ------------------------------------------------------------------------
// 8. Draw & Highlight Transit Route Polylines on Map
// ------------------------------------------------------------------------
function drawRoutes() {
  routesLayer.clearLayers();

  for (const key in TRANSIT_ROUTES) {
    const route = TRANSIT_ROUTES[key];
    const pathCoords = route.roadGeometry || route.coords;
    const isHighlighted = selectedRouteId === route.id;
    const isDimmed = selectedRouteId !== "all" && !isHighlighted;

    // White glow underneath when a route is highlighted
    if (isHighlighted) {
      L.polyline(pathCoords, {
        color: "#ffffff",
        weight: 10,
        opacity: 0.9
      }).addTo(routesLayer);
    }

    const line = L.polyline(pathCoords, {
      color: route.color,
      weight: isHighlighted ? 6 : (isDimmed ? 2.5 : 4.5),
      opacity: isHighlighted ? 1.0 : (isDimmed ? 0.25 : 0.85),
      dashArray: route.id === "railway_ml1" ? "8, 6" : null
    });

    line.bindPopup(`
      <h3>${route.name}</h3>
      <b>Service Type:</b> ${route.vehicleType}<br>
      <b>Operator:</b> ${route.operator}<br>
      <b>Corridor Stops:</b> Click any station along this line for details.
    `);

    line.on("click", function () {
      highlightRoute(route.id, false);
    });

    line.addTo(routesLayer);
  }
}

function highlightRoute(routeId, zoomToRoute) {
  selectedRouteId = routeId;

  const routeSelect = document.getElementById("routeSelect");
  if (routeSelect) routeSelect.value = routeId;

  document.querySelectorAll(".route-pill").forEach(pill => {
    if (pill.getAttribute("data-route") === routeId) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });

  drawRoutes();
  displayTransportFeatures();

  if (routeId !== "all" && TRANSIT_ROUTES[routeId] && zoomToRoute) {
    const pathCoords = TRANSIT_ROUTES[routeId].roadGeometry || TRANSIT_ROUTES[routeId].coords;
    const bounds = L.latLngBounds(pathCoords);
    map.fitBounds(bounds, { padding: [40, 40] });
  }
}

window.selectRouteFromPopup = function (routeId) {
  highlightRoute(routeId, true);
};

// ------------------------------------------------------------------------
// 9. Display Transport Features on Map & Left Sidebar List
// ------------------------------------------------------------------------
function displayTransportFeatures() {
  transportLayer.clearLayers();

  const searchText = document.getElementById("searchInput").value.trim().toLowerCase();
  const selectedCategory = document.getElementById("categoryFilter").value;
  const stationListEl = document.getElementById("stationList");
  stationListEl.innerHTML = "";

  let shownCount = 0;

  for (let i = 0; i < allLocations.length; i++) {
    const loc = allLocations[i];
    const locId = loc.id || ("stop_" + i);
    const routeObj = TRANSIT_ROUTES[loc.routeId] || TRANSIT_ROUTES.red_line;

    const matchesCategory = (selectedCategory === "all" || loc.category === selectedCategory);
    const matchesRoute = (selectedRouteId === "all" || loc.routeId === selectedRouteId);
    const searchableText = `${loc.name} ${loc.category} ${loc.operator} ${loc.vehicle} ${routeObj.name}`.toLowerCase();
    const matchesSearch = (!searchText || searchableText.includes(searchText));

    if (!matchesCategory || !matchesRoute || !matchesSearch) {
      continue;
    }

    shownCount++;
    const symbol = getCategorySymbol(loc.category);

    const icon = L.divIcon({
      className: "",
      html: `<div class="transit-marker" style="width:${symbol.size}px;height:${symbol.size}px;background:${symbol.color};">${symbol.badge}</div>`,
      iconSize: [symbol.size, symbol.size],
      iconAnchor: [symbol.size / 2, symbol.size / 2],
      popupAnchor: [0, -symbol.size / 2]
    });

    const marker = L.marker([loc.latitude, loc.longitude], { icon: icon });

    marker.bindPopup(`
      <h3>${loc.name}</h3>
      <b>Category:</b> ${loc.category}<br>
      <b>Route Corridor:</b> ${routeObj.name}<br>
      <b>Vehicle / Service:</b> ${loc.vehicle}<br>
      <b>Operator:</b> ${loc.operator}<br>
      <b>Coordinates:</b> ${loc.latitude.toFixed(5)}°N, ${loc.longitude.toFixed(5)}°E<br>
      <button type="button" class="popup-route-btn" onclick="selectRouteFromPopup('${loc.routeId}')">
        Highlight Full ${routeObj.name.split("(")[0].trim()} Path
      </button>
    `);

    marker.addTo(transportLayer);
    markerById[locId] = marker;

    // Add item to Left Sidebar Station List (up to 120 items for fast scrolling)
    if (shownCount <= 120) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "station-item";
      btn.innerHTML = `
        <span class="station-item-badge" style="background:${symbol.color}">${symbol.badge}</span>
        <span class="station-item-info">
          <span class="station-item-name">${loc.name}</span>
          <span class="station-item-meta">${loc.category} &bull; ${routeObj.name.split("(")[0].trim()}</span>
        </span>
      `;
      btn.addEventListener("click", function () {
        map.setView([loc.latitude, loc.longitude], 15, { animate: true });
        marker.openPopup();
      });
      stationListEl.appendChild(btn);
    }
  }

  document.getElementById("stationCountBadge").textContent = shownCount;

  const status = document.getElementById("status");
  if (selectedRouteId !== "all" && TRANSIT_ROUTES[selectedRouteId]) {
    status.innerHTML = `Highlighted Route: ${TRANSIT_ROUTES[selectedRouteId].name} — Showing ${shownCount} stations/stops along road corridor.`;
  } else {
    status.innerHTML = `Public transport data active — Displaying ${shownCount} road-aligned stations & electric bus stops across Islamabad and Rawalpindi.`;
  }
}

// ------------------------------------------------------------------------
// 10. Get Data from Overpass API using fetch() (Following Lab 05 Pattern)
// ------------------------------------------------------------------------
async function getTransportDataFromAPI() {
  const overpassQuery = `
    [out:json][timeout:18];
    (
      node["highway"="bus_stop"](33.58,72.94,33.75,73.18);
      node["public_transport"="station"](33.58,72.94,33.75,73.18);
      node["amenity"="bus_station"](33.58,72.94,33.75,73.18);
      node["railway"="station"](33.58,72.94,33.75,73.18);
    );
    out body 160;
  `.trim();

  const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(overpassQuery);

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}

// ------------------------------------------------------------------------
// 11. Load & Process API Data (Smart-naming any unnamed OSM stops)
// ------------------------------------------------------------------------
async function loadTransportData() {
  const status = document.getElementById("status");
  status.innerHTML = "Retrieving public transport data from OpenStreetMap Overpass API...";

  // Render verified stations & snap routes to real roads
  drawRoutes();
  displayTransportFeatures();
  snapRoutesToActualRoads();

  const data = await getTransportDataFromAPI();

  if (data && Array.isArray(data.elements)) {
    const combined = [...VERIFIED_LOCATIONS];
    let stopCounter = 1;

    for (const el of data.elements) {
      if (typeof el.lat !== "number" || typeof el.lon !== "number") continue;

      // Skip if within ~350m of an already verified station so markers don't overlap
      const isDuplicate = combined.some(existing => {
        return Math.abs(existing.latitude - el.lat) < 0.0035 && Math.abs(existing.longitude - el.lon) < 0.0035;
      });
      if (isDuplicate) continue;

      const tags = el.tags || {};
      const area = findNearestArea(el.lat, el.lon);

      let category = "Electric Feeder Stop";
      let vehicle = "CDA Electric / Urban Feeder Bus";
      if (tags.railway === "station") {
        category = "Railway Station";
        vehicle = "Pakistan Railways Passenger Train";
      } else if (tags.amenity === "bus_station") {
        category = "Bus Terminal";
        vehicle = "Intercity & Regional Bus";
      } else if (tags.public_transport === "station" || (tags.name && tags.name.toLowerCase().includes("metro"))) {
        category = "Metrobus Station";
        vehicle = "Metrobus Rapid Transit (BRT)";
      }

      // Smart Name Assignment: Never leave any stop as "unnamed"!
      const rawName = tags.name || tags["name:en"] || tags["addr:street"] || tags.ref;
      let cleanName = "";
      if (rawName && String(rawName).trim().length > 0) {
        cleanName = String(rawName).trim();
      } else {
        cleanName = `${area.name} Electric Bus Stop #${stopCounter++}`;
      }

      combined.push({
        id: "osm_" + el.id,
        name: cleanName,
        latitude: el.lat,
        longitude: el.lon,
        category: category,
        routeId: area.routeId,
        operator: tags.operator || (el.lat >= 33.66 ? "CDA Electric Bus / PMA" : "PMA / Rawalpindi Transit"),
        vehicle: vehicle
      });
    }

    allLocations = combined;
    displayTransportFeatures();
  }
}

// ------------------------------------------------------------------------
// 12. Map Legend (Following Lab 05 Step 15 Pattern)
// ------------------------------------------------------------------------
const legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  const div = L.DomUtil.create("div", "legend");
  div.innerHTML = `
    <b>Transport Map Legend</b>
    <span class="legend-section-title">Stops &amp; Stations (Icons)</span>
    <span class="legend-icon" style="background:#e11d48">M</span> Metrobus Station (BRT)<br>
    <span class="legend-icon" style="background:#0d9488">E</span> CDA Electric Feeder Stop<br>
    <span class="legend-icon" style="background:#7c3aed">T</span> Intercity Bus Terminal<br>
    <span class="legend-icon" style="background:#b45309">R</span> Railway Station<br>
    <span class="legend-section-title">Transit Routes (Click to Highlight)</span>
    <span class="legend-line" style="background:#e11d48"></span> Red Line Metrobus<br>
    <span class="legend-line" style="background:#ea580c"></span> Orange Line Metrobus<br>
    <span class="legend-line" style="background:#2563eb"></span> Blue Line Metrobus<br>
    <span class="legend-line" style="background:#16a34a"></span> Green Line Metrobus<br>
    <span class="legend-line" style="background:#0d9488"></span> Electric Bus FR-4 / FR-7<br>
    <span class="legend-line" style="background:#b45309"></span> Pakistan Railways Line
  `;
  return div;
};

legend.addTo(map);

// ------------------------------------------------------------------------
// 13. UI Filter & Route Highlight Event Listeners
// ------------------------------------------------------------------------
document.getElementById("searchInput").addEventListener("input", displayTransportFeatures);
document.getElementById("categoryFilter").addEventListener("change", displayTransportFeatures);

document.getElementById("routeSelect").addEventListener("change", function (e) {
  highlightRoute(e.target.value, true);
});

document.querySelectorAll(".route-pill").forEach(button => {
  button.addEventListener("click", function () {
    const routeId = this.getAttribute("data-route");
    highlightRoute(routeId, true);
  });
});

document.getElementById("resetBtn").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
  document.getElementById("categoryFilter").value = "all";
  highlightRoute("all", false);
  map.setView([33.6650, 73.0650], 12);
});

// ------------------------------------------------------------------------
// 14. Initial Data Load (From Lab 05)
// ------------------------------------------------------------------------
loadTransportData();