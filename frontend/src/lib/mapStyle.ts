// @ts-nocheck
// Todo: See if the map style that I based this on was wrong, or if the TS types are wrong.
// See https://maplibre.org/maplibre-gl-js-docs/style-spec/expressions/#interpolate

import type { StyleSpecification } from "maplibre-gl";

// Constants for repeated values
const WATER_COLOR = "hsl(205, 61%, 83%)";

const SUBURB_NAMES_MAX_ZOOM = 15;

const CYCLE_INFRA_CLASSES = [
  "separatedCycleway",
  "sharedPath",
  "safeSpeed",
  "constructionCycleway",
  "proposedCycleway",
];

const PUBLIC_TRANSPORT_STOP_STYLE_LAYOUT = {
  "text-anchor": "top",
  // Only show names at zoom 12 and below
  "text-field": ["step", ["zoom"], "", 12, ["get", "name:latin"]],
  // "text-field": "{name:latin}\n{name:nonlatin}",
  "text-font": ["Inter Semi Bold"],
  "text-max-width": 8,
  "text-offset": [0, 0.5],
  "text-size": 11,
  visibility: "visible",
  "icon-rotate": 0,
  "icon-overlap": "always",
  "text-optional": true,
};
const PUBLIC_TRANSPORT_STOP_STYLE_PAINT = {
  "text-color": "hsl(0, 0%, 25%)",
  "text-halo-blur": 0,
  "text-halo-color": "hsl(0, 0%, 100%)",
  "text-halo-width": 2,
  "icon-opacity": {
    stops: [
      [9, 0.5],
      [12, 1],
    ],
  },
};

const CONTOURS_STYLE_LAYOUT = {
  "line-cap": "round",
  "line-join": "round",
};

const CONTOURS_STYLE_PAINT = {
  "line-color": "hsl(47, 80%, 28%)",
  "line-opacity": {
    stops: [
      [14, 0.1],
      [16, 0.175],
      [18, 0.25],
    ],
  },
  "line-width": 1,
};

const ONEWAY_STYLE_LAYOUT = {
  visibility: "visible",
  "symbol-placement": "line",
  "icon-image": "one_way",
  "icon-size": {
    base: 1.4,
    stops: [
      [15, 0.4],
      [20, 1],
    ],
  },
};

// Map style
const mapStyle: StyleSpecification = {
  version: 8,
  name: "Basic",
  metadata: {
    "mapbox:autocomposite": false,
    "mapbox:type": "template",
    "maputnik:renderer": "mbgljs",
    "openmaptiles:version": "3.x",
    "openmaptiles:mapbox:owner": "openmaptiles",
    "openmaptiles:mapbox:source:url": "mapbox://openmaptiles.4qljc88t",
  },
  sources: {
    openmaptiles: {
      type: "vector",
      url: "pmtiles://https://src.carto.au/bikemap.pmtiles",
    },
    contours: {
      type: "vector",
      url: "pmtiles://https://src.carto.au/contours.pmtiles",
    },
  },
  glyphs: "/glyphs/{fontstack}/{range}.pbf",
  sprite:
    (globalThis.window?.location.origin ?? "https://bikemap.carto.au") +
    "/map-icons/spritesheets/sheet",
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "hsl(47, 26%, 88%)" },
    },
    {
      id: "landuse-residential",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["in", "class", "residential", "suburb", "neighbourhood"],
      ],
      layout: { visibility: "visible" },
      paint: { "fill-color": "hsl(47, 13%, 86%)", "fill-opacity": 0.7 },
    },
    {
      id: "landcover_grass",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "class", "grass"],
      paint: { "fill-color": "hsl(82, 46%, 72%)", "fill-opacity": 0.45 },
    },
    {
      id: "landcover_wood",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "class", "wood"],
      paint: {
        "fill-color": "hsl(82, 46%, 72%)",
        "fill-opacity": {
          base: 1,
          stops: [
            [8, 0.6],
            [22, 1],
          ],
        },
      },
    },
    {
      id: "water_intermittent",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      filter: ["all", ["==", "$type", "Polygon"], ["==", "intermittent", 1]],
      layout: { visibility: "visible" },
      paint: { "fill-color": WATER_COLOR, "fill-opacity": 0.7 },
    },
    {
      id: "landcover-ice-shelf",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "subclass", "ice_shelf"],
      layout: { visibility: "visible" },
      paint: { "fill-color": "hsl(47, 26%, 88%)", "fill-opacity": 0.8 },
    },
    {
      id: "landcover-glacier",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "subclass", "glacier"],
      layout: { visibility: "visible" },
      paint: {
        "fill-color": "hsl(47, 22%, 94%)",
        "fill-opacity": {
          base: 1,
          stops: [
            [0, 1],
            [8, 0.5],
          ],
        },
      },
    },
    {
      id: "landcover_sand",
      type: "fill",
      metadata: {},
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["all", ["in", "class", "sand"]],
      paint: {
        "fill-antialias": false,
        "fill-color": "rgba(232, 214, 38, 1)",
        "fill-opacity": 0.3,
      },
    },
    {
      id: "landuse",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", "class", "agriculture"],
      layout: { visibility: "visible" },
      paint: { "fill-color": "#eae0d0" },
    },
    {
      id: "landuse_overlay_national_park",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "class", "national_park"],
      paint: {
        "fill-color": "#E1EBB0",
        "fill-opacity": {
          base: 1,
          stops: [
            [5, 0],
            [9, 0.75],
          ],
        },
      },
    },
    {
      id: "landuse-education",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      minzoom: 13,
      filter: [
        "in",
        "class",
        "school",
        "university",
        "kindergarten",
        "college",
      ],
      layout: { visibility: "visible" },
      paint: { "fill-color": "hsl(54, 60%, 90%)" },
    },
    {
      id: "waterway-tunnel",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "tunnel"],
      ],
      layout: { visibility: "visible" },
      paint: {
        "line-color": WATER_COLOR,
        "line-dasharray": [3, 3],
        "line-gap-width": {
          stops: [
            [12, 0],
            [20, 6],
          ],
        },
        "line-opacity": 1,
        "line-width": {
          base: 1.4,
          stops: [
            [8, 1],
            [20, 2],
          ],
        },
      },
    },
    {
      id: "waterway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!in", "brunnel", "tunnel", "bridge"],
        ["!=", "intermittent", 1],
      ],
      layout: { visibility: "visible" },
      paint: {
        "line-color": WATER_COLOR,
        "line-opacity": 1,
        "line-width": {
          base: 1.4,
          stops: [
            [8, 1],
            [20, 8],
          ],
        },
      },
    },
    {
      id: "waterway_intermittent",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!in", "brunnel", "tunnel", "bridge"],
        ["==", "intermittent", 1],
      ],
      layout: { visibility: "visible" },
      paint: {
        "line-color": WATER_COLOR,
        "line-dasharray": [2, 1],
        "line-opacity": 1,
        "line-width": {
          base: 1.4,
          stops: [
            [8, 1],
            [20, 8],
          ],
        },
      },
    },
    {
      id: "tunnel_railway_transit",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 0,
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "tunnel"],
        ["==", "class", "transit"],
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "hsl(34, 12%, 66%)",
        "line-dasharray": [3, 3],
        "line-opacity": {
          base: 1,
          stops: [
            [11, 0],
            [16, 1],
          ],
        },
      },
    },
    {
      id: "building",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "building",
      paint: {
        "fill-antialias": true,
        "fill-color": "rgba(222, 211, 190, 1)",
        "fill-opacity": {
          base: 1,
          stops: [
            [13, 0],
            [15, 1],
          ],
        },
        "fill-outline-color": {
          stops: [
            [15, "rgba(212, 177, 146, 0)"],
            [16, "rgba(212, 177, 146, 0.5)"],
          ],
        },
      },
    },
    // {
    //   id: "housenumber",
    //   type: "symbol",
    //   source: "openmaptiles",
    //   "source-layer": "housenumber",
    //   minzoom: 17,
    //   filter: ["==", "$type", "Point"],
    //   layout: {
    //     "text-field": "{housenumber}",
    //     "text-font": ["Inter Semi Bold"],
    //     "text-size": 10,
    //   },
    //   paint: { "text-color": "rgba(212, 177, 146, 1)" },
    // },
    {
      id: "contours_sub10m",
      type: "line",
      source: "contours",
      "source-layer": "contours",
      minzoom: 14,
      filter: ["all", ["!=", ["%", ["to-number", ["get", "e"]], 10], 0]],
      layout: { ...CONTOURS_STYLE_LAYOUT },
      paint: { ...CONTOURS_STYLE_PAINT },
    },
    {
      id: "contours_10m",
      type: "line",
      source: "contours",
      "source-layer": "contours",
      minzoom: 12,
      filter: ["all", ["==", ["%", ["to-number", ["get", "e"]], 10], 0]],
      layout: { ...CONTOURS_STYLE_LAYOUT },
      paint: { ...CONTOURS_STYLE_PAINT },
    },
    // Water must be above contours to prevent all the weird harbour/ocean contours showing
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["!=", "intermittent", 1],
        ["!=", "brunnel", "tunnel"],
      ],
      layout: { visibility: "visible" },
      paint: { "fill-color": WATER_COLOR },
    },
    {
      id: "road_area_pier",
      type: "fill",
      metadata: {},
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["all", ["==", "$type", "Polygon"], ["==", "class", "pier"]],
      layout: { visibility: "visible" },
      paint: { "fill-antialias": true, "fill-color": "hsl(47, 26%, 88%)" },
    },
    {
      id: "road_pier",
      type: "line",
      metadata: {},
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["all", ["==", "$type", "LineString"], ["in", "class", "pier"]],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "hsl(47, 26%, 88%)",
        "line-width": {
          base: 1.2,
          stops: [
            [15, 1],
            [17, 4],
          ],
        },
      },
    },
    {
      id: "road_bridge_area",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["all", ["==", "$type", "Polygon"], ["in", "brunnel", "bridge"]],
      layout: {},
      paint: { "fill-color": "hsl(47, 26%, 88%)", "fill-opacity": 0.5 },
    },
    {
      id: "road_path",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation_name", // Todo: Work out why it isn't working with "transportation" and move it to that
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "path", "track"],
        ["!=", "subclass", "steps"],
      ],
      layout: { "line-cap": "square", "line-join": "bevel" },
      paint: {
        "line-color": "hsl(0, 0%, 97%)",
        "line-dasharray": [3, 1],
        "line-width": {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 10],
          ],
        },
      },
    },
    {
      id: "road_steps",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation_name", // Todo: Work out why it isn't working with "transportation" and move it to that
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "path", "track"],
        ["==", "subclass", "steps"],
      ],
      layout: { "line-cap": "square", "line-join": "bevel" },
      paint: {
        "line-color": "hsl(0, 0%, 97%)",
        "line-dasharray": [0.35, 0.35],
        "line-width": {
          base: 1.55,
          stops: [
            [4, 0.5],
            [20, 20],
          ],
        },
      },
    },
    {
      id: "road_minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 13,
      filter: ["all", ["==", "$type", "LineString"], ["in", "class", "minor"]],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "hsl(0, 0%, 97%)",
        "line-width": {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
      },
    },
    {
      id: "tunnel_minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "tunnel"],
        ["==", "class", "minor_road"],
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "#efefef",
        "line-dasharray": [0.36, 0.18],
        "line-width": {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
      },
    },
    {
      id: "tunnel_major",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "tunnel"],
        [
          "in",
          "class",
          "motorway",
          "primary",
          "secondary",
          "tertiary",
          "trunk",
        ],
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "#fff",
        "line-opacity": 0.4,
        // "line-dasharray": [0.28, 0.14],
        "line-width": {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 30],
          ],
        },
      },
    },
    {
      id: "aeroway-area",
      type: "fill",
      metadata: { "mapbox:group": "1444849345966.4436" },
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 4,
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["in", "class", "runway", "taxiway"],
      ],
      layout: { visibility: "visible" },
      paint: {
        "fill-color": "rgba(255, 255, 255, 1)",
        "fill-opacity": {
          base: 1,
          stops: [
            [13, 0],
            [14, 1],
          ],
        },
      },
    },
    {
      id: "aeroway-taxiway",
      type: "line",
      metadata: { "mapbox:group": "1444849345966.4436" },
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 12,
      filter: [
        "all",
        ["in", "class", "taxiway"],
        ["==", "$type", "LineString"],
      ],
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-opacity": 1,
        "line-width": {
          base: 1.5,
          stops: [
            [12, 1],
            [17, 10],
          ],
        },
      },
    },
    {
      id: "aeroway-runway",
      type: "line",
      metadata: { "mapbox:group": "1444849345966.4436" },
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 4,
      filter: ["all", ["in", "class", "runway"], ["==", "$type", "LineString"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-opacity": 1,
        "line-width": {
          base: 1.5,
          stops: [
            [11, 4],
            [17, 50],
          ],
        },
      },
    },
    {
      id: "road_trunk_primary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "trunk", "primary"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#fff",
        "line-width": {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 30],
          ],
        },
      },
    },
    {
      id: "road_secondary_tertiary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "secondary", "tertiary"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#fff",
        "line-width": {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 20],
          ],
        },
      },
    },
    {
      id: "road_major_motorway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "motorway"],
        ["!=", "brunnel", "tunnel"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "hsl(0, 0%, 100%)",
        "line-offset": 0,
        "line-width": {
          base: 1.4,
          stops: [
            [8, 1],
            [16, 10],
          ],
        },
      },
    },
    {
      id: "railway-transit",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["all", ["==", "class", "transit"], ["!=", "brunnel", "tunnel"]],
      layout: { visibility: "visible" },
      paint: {
        "line-color": "hsl(34, 12%, 66%)",
        "line-opacity": {
          base: 1,
          stops: [
            [11, 0],
            [16, 1],
          ],
        },
      },
    },
    {
      id: "railway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", "class", "rail", "light_rail", "subway"],
      layout: { visibility: "visible" },
      paint: {
        "line-color": "hsl(34, 12%, 66%)",
        "line-opacity": {
          base: 1,
          stops: [
            [11, 0],
            [16, 1],
          ],
        },
      },
    },
    {
      id: "oneway_icons",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 15,
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "oneway", 1],
        ["!in", "class", ...CYCLE_INFRA_CLASSES],
      ],
      layout: ONEWAY_STYLE_LAYOUT,
      paint: {
        "icon-opacity": 0.5,
        // Below doesn't work as it's not an SDF icon, so we have to make a halo inside the icon file
        // "icon-halo-color": "hsl(0, 0%, 100%)",
        // "icon-halo-width": 2,
      },
    },
    {
      id: "road_proposed_cycleway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "proposedCycleway"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "hsl(300, 50%, 70%)",
        "line-dasharray": [2, 4],
        "line-width": {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 20],
          ],
        },
      },
    },
    {
      id: "road_construction_cycleway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "constructionCycleway"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "hsl(6, 93%, 71%)",
        "line-dasharray": [2, 4],
        "line-width": {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 20],
          ],
        },
      },
    },
    {
      id: "road_safe_speed",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "safeSpeed"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "hsl(31, 29%, 58%)",
        // "line-dasharray": [0, 2],
        "line-width": {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
      },
    },
    {
      id: "road_shared_path",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "sharedPath"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "hsl(211, 61%, 56%)",
        "line-width": {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 20],
          ],
        },
      },
    },
    {
      id: "road_separated_cycleway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "separatedCycleway"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "hsl(141, 54%, 28%)",
        "line-width": {
          base: 1.4,
          stops: [
            [6, 0.8],
            [20, 32],
          ],
        },
      },
    },
    {
      id: "oneway_cycle_infra_icons",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "oneway", 1],
        ["in", "class", ...CYCLE_INFRA_CLASSES],
      ],
      layout: ONEWAY_STYLE_LAYOUT,
    },
    {
      id: "waterway-bridge-case",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "#bbbbbb",
        "line-gap-width": {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
        "line-width": {
          base: 1.6,
          stops: [
            [12, 0.5],
            [20, 10],
          ],
        },
      },
    },
    {
      id: "waterway-bridge",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": WATER_COLOR,
        "line-width": {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
      },
    },
    {
      id: "bridge_minor case",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["==", "class", "minor_road"],
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "#dedede",
        "line-gap-width": {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
        "line-width": {
          base: 1.6,
          stops: [
            [12, 0.5],
            [20, 10],
          ],
        },
      },
    },
    {
      id: "bridge_major case",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"],
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "#dedede",
        "line-gap-width": {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
        "line-width": {
          base: 1.6,
          stops: [
            [12, 0.5],
            [20, 10],
          ],
        },
      },
    },
    {
      id: "bridge_minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["==", "class", "minor_road"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#efefef",
        "line-width": {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
      },
    },
    {
      id: "bridge_major",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#fff",
        "line-width": {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 30],
          ],
        },
      },
    },
    {
      id: "admin_sub",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      filter: ["in", "admin_level", 4, 6, 8],
      layout: { visibility: "visible" },
      paint: {
        "line-color": "hsla(0, 0%, 60%, 0.5)",
        "line-dasharray": [2, 1],
      },
    },
    {
      id: "admin_country_z0-4",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      minzoom: 0,
      maxzoom: 5,
      filter: [
        "all",
        ["<=", "admin_level", 2],
        ["==", "$type", "LineString"],
        ["!has", "claimed_by"],
      ],
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(0, 0%, 60%)",
        "line-width": {
          base: 1.3,
          stops: [
            [3, 0.5],
            [22, 15],
          ],
        },
      },
    },
    {
      id: "admin_country_z5-",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      minzoom: 5,
      filter: ["all", ["<=", "admin_level", 2], ["==", "$type", "LineString"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(0, 0%, 60%)",
        "line-width": {
          base: 1.3,
          stops: [
            [3, 0.5],
            [22, 15],
          ],
        },
      },
    },
    {
      id: "contour_labels",
      type: "symbol",
      source: "contours",
      "source-layer": "contours",
      minzoom: 15.5,
      filter: ["all"],
      layout: {
        "text-field": "{e}",
        "text-font": ["Inter Semi Bold"],
        "text-size": {
          stops: [
            [16, 8],
            [18, 10],
          ],
        },
        "symbol-placement": "line",
        "text-letter-spacing": 0.0375,
        "text-rotation-alignment": "map",
        visibility: "visible",
      },
      paint: {
        "text-color": "hsl(47, 20%, 50%)",
      },
    },
    {
      id: "poi_label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "poi",
      minzoom: 15,
      filter: ["all", ["==", "$type", "Point"], ["==", "rank", 1]],
      layout: {
        "icon-size": 1,
        "text-anchor": "center",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": ["Inter Semi Bold"],
        "text-max-width": 8,
        "text-size": 11,
        visibility: "visible",
      },
      paint: {
        "text-color": "#666",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 1,
      },
    },
    {
      id: "airport-label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "aerodrome_label",
      minzoom: 12,
      filter: ["all", ["has", "iata"]],
      layout: {
        "icon-size": 1,
        "text-anchor": "top",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": ["Inter Semi Bold"],
        "text-max-width": 8,
        "text-offset": [0, 0.5],
        "text-size": 11,
        visibility: "visible",
      },
      paint: {
        "text-color": "#666",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 1,
      },
    },
    {
      id: "road_label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 13,
      filter: ["==", "$type", "LineString"],
      layout: {
        "symbol-placement": "line",
        "text-field": "{name:latin} {name:nonlatin}",
        "text-font": ["Inter Semi Bold"],
        "text-letter-spacing": 0.075,
        "text-rotation-alignment": "map",
        "text-size": {
          base: 1.4,
          stops: [
            [10, 8],
            [20, 14],
          ],
        },
        "text-transform": "uppercase",
        visibility: "visible",
      },
      paint: {
        "text-color": "#000",
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 2,
      },
    },
    {
      id: "place_label_other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 13,
      filter: [
        "all",
        ["==", "$type", "Point"],
        [
          "!in",
          "class",
          "suburb",
          "town",
          "city",
          "state",
          "country",
          "continent",
        ],
      ],
      layout: {
        "text-anchor": "center",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": ["Inter Semi Bold"],
        "text-max-width": 6,
        "text-size": 11,
        visibility: "visible",
      },
      paint: {
        "text-color": "#666",
        "text-halo-blur": 0,
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 1,
      },
    },
    {
      id: "place_label_suburb",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 8,
      maxzoom: SUBURB_NAMES_MAX_ZOOM,
      filter: ["all", ["==", "$type", "Point"], ["==", "class", "suburb"]],
      layout: {
        "text-anchor": "center",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": ["Inter Semi Bold"],
        "text-max-width": 6,
        "text-size": {
          stops: [
            [11, 10],
            [14, 13],
          ],
        },
        visibility: "visible",
      },
      paint: {
        "text-color": "#666",
        "text-halo-blur": {
          stops: [
            [11, 1],
            [14, 0],
          ],
        },
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": {
          stops: [
            [11, 1],
            [14, 2],
          ],
        },
      },
    },
    {
      id: "bicycle_parking",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "poi",
      minzoom: 15.5,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "amenity"],
        ["==", "subclass", "bicycle_parking"],
      ],
      layout: {
        "icon-size": 0.5,
        "icon-rotate": 0,
        "icon-image": "bicycle_parking",
      },
      paint: {},
    },
    {
      id: "pt_station_default",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 9,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "railway"],
        ["==", "subclass", "station"],
        ["!=", "statecode", "1"],
        ["!=", "statecode", "2"],
      ],
      layout: {
        ...PUBLIC_TRANSPORT_STOP_STYLE_LAYOUT,
        "icon-image": [
          "match",
          ["get", "subsubclass"],
          "light_rail",
          "default_light_rail",
          "default_train",
        ],
        "icon-size": {
          stops: [
            // when zoom is 9
            [9, 0.25],
            // when zoom is 15
            [15, 0.67],
          ],
        },
      },
      paint: {
        ...PUBLIC_TRANSPORT_STOP_STYLE_PAINT,
      },
    },
    {
      id: "pt_station_nsw",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 9,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "railway"],
        ["==", "subclass", "station"],
        ["==", "statecode", "1"],
      ],
      layout: {
        ...PUBLIC_TRANSPORT_STOP_STYLE_LAYOUT,
        "icon-image": [
          "match",
          ["get", "subsubclass"],
          "subway",
          "nsw_metro",
          "light_rail",
          "nsw_light_rail",
          "nsw_train",
        ],
        "icon-size": {
          stops: [
            // when zoom is 9
            [9, 0.015],
            // when zoom is 15
            [15, 0.04],
          ],
        },
      },
      paint: {
        ...PUBLIC_TRANSPORT_STOP_STYLE_PAINT,
      },
    },
    {
      id: "pt_station_vic",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 9,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "railway"],
        ["==", "subclass", "station"],
        ["==", "statecode", "2"],
        // Too many tram stops, so don't display for now. Consider VIC-specific rendering in future.
        ["!=", "subsubclass", "light_rail"],
      ],
      layout: {
        ...PUBLIC_TRANSPORT_STOP_STYLE_LAYOUT,
        "icon-image": [
          "match",
          ["get", "subsubclass"],
          "light_rail",
          "vic_tram",
          "vic_train",
        ],
        "icon-size": {
          stops: [
            // when zoom is 9
            [9, 0.021],
            // when zoom is 15
            [15, 0.057],
          ],
        },
      },
      paint: {
        ...PUBLIC_TRANSPORT_STOP_STYLE_PAINT,
      },
    },
    {
      id: "speed_limit_sign",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 15,
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "safeSpeed"],
      ],
      layout: {
        "text-anchor": "center",
        "text-field": "{maxspeed}",
        "text-font": ["Inter Bold"],
        "text-offset": [0, 0],
        visibility: "visible",
        "icon-size": {
          base: 1.55,
          stops: [
            [14, 0.035],
            [20, 0.07],
          ],
        },
        "text-size": {
          stops: [
            [14, 6],
            [20, 12], // size 10 at zoom 15
          ],
        },
        // "symbol-placement": "line-center",
        // "icon-overlap": "always",
        "icon-image": "speed_limit",
        "text-rotation-alignment": "map",
        "icon-rotation-alignment": "map",
      },
      paint: {
        "text-color": "#231f20", // Taken using eyedropper from https://www.nsw.gov.au/driving-boating-and-transport/roads-safety-and-rules/safe-driving/speed-limits-and-cameras/speed-limits
      },
    },
    {
      id: "place_label_town",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: SUBURB_NAMES_MAX_ZOOM,
      filter: ["all", ["==", "$type", "Point"], ["==", "class", "town"]],
      layout: {
        "text-anchor": "center",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": ["Inter Semi Bold"],
        "text-max-width": 6,
        "text-size": {
          stops: [
            [6, 10],
            [12, 14],
          ],
        },
        visibility: "visible",
      },
      paint: {
        "text-color": "hsl(0, 0%, 25%)",
        "text-halo-blur": 0,
        "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
        "text-halo-width": 2,
      },
    },
    {
      id: "place_label_city",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: SUBURB_NAMES_MAX_ZOOM,
      filter: ["all", ["==", "$type", "Point"], ["==", "class", "city"]],
      layout: {
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": ["Inter Semi Bold"],
        "text-max-width": 10,
        "text-size": {
          stops: [
            [3, 12],
            [8, 16],
          ],
        },
      },
      paint: {
        "text-color": "hsl(0, 0%, 0%)",
        "text-halo-blur": 0,
        "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
        "text-halo-width": 2,
      },
    },
    {
      id: "country_label-other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: 12,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "country"],
        ["!has", "iso_a2"],
      ],
      layout: {
        "text-field": "{name:latin}",
        "text-font": ["Inter Semi Bold"],
        "text-max-width": 10,
        "text-size": {
          stops: [
            [3, 12],
            [8, 22],
          ],
        },
        visibility: "visible",
      },
      paint: {
        "text-color": "hsl(0, 0%, 13%)",
        "text-halo-blur": 0,
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 2,
      },
    },
    {
      id: "country_label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: 12,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "country"],
        ["has", "iso_a2"],
      ],
      layout: {
        "text-field": "{name:latin}",
        "text-font": ["Inter Bold"],
        "text-max-width": 10,
        "text-size": {
          stops: [
            [3, 12],
            [8, 22],
          ],
        },
        visibility: "visible",
      },
      paint: {
        "text-color": "hsl(0, 0%, 13%)",
        "text-halo-blur": 0,
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 2,
      },
    },
  ],
  id: "basic",
};
export default mapStyle;
