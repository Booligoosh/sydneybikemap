export interface RegionConfig {
  id: string;
  name: string;
  maxBounds: [number, number, number, number];
  /** starting position [lng, lat] */
  startCoord: [number, number];
  /** starting zoom */
  startZoom: number;
  headTags: {
    title: string;
    description: string;
    ogSiteName: string;
    ogImage: string;
  };
}

export const REGIONS: RegionConfig[] = [
  {
    id: "sydney",
    name: "Sydney",
    startCoord: [151.0409, -33.8455],
    maxBounds: [149.536285, -34.927346, 152.571173, -32.231172],
    startZoom: 10.5,
    headTags: {
      title: "Sydney Bike Map — Map of cycle paths in Sydney",
      description:
        "🚲️ Your guide to Sydney’s cycle network — See safe routes to ride in Sydney including separated cycleways, shared paths, cycleways under construction, planned cycleways and more.",
      ogSiteName: "SydneyBikeMap",
      ogImage: "https://bikemap.carto.au/og-image.png",
    },
  },
  {
    id: "melbourne",
    name: "Melbourne",
    startCoord: [144.9616, -37.7452],
    maxBounds: [142.8513, -39.2154, 146.8921, -36.1339],
    startZoom: 10.5,
    headTags: {
      title: "Melbourne Bike Map — Map of cycle paths in Melbourne",
      description:
        "🚲️ Your guide to Melbourne’s cycle network — See safe routes to ride in Melbourne including separated cycleways, shared paths, cycleways under construction, planned cycleways and more.",
      ogSiteName: "MelbourneBikeMap",
      ogImage: "https://bikemap.carto.au/og-image.png", // TODO: Separate og-image
    },
  },
];
