<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import maplibre from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";
  import mapStyle from "$lib/mapStyle";
  import * as pmtiles from "pmtiles";
  import type { RegionConfig } from "./regions";
  import { page } from "$app/state";
  // Add pmtiles protocol handling
  const protocol = new pmtiles.Protocol();
  maplibre.addProtocol("pmtiles", protocol.tile);

  interface Props {
    regionConfig: RegionConfig;
  }
  let { regionConfig }: Props = $props();

  let map: maplibre.Map;
  let mapContainer: HTMLDivElement;

  $effect(() => {
    if (map) map.setMaxBounds(regionConfig.maxBounds);
    regionConfig; // Depend on
  });

  $effect(() => {
    // Run when regionConfig changes
    regionConfig;
    // ALSO run when the hash changes
    // This can happen in 3 scenarios:
    // 1. When the user clicks a link with a certain hash or manually replaces the hash
    // 2. When the user loads the page with no hash
    // 3. When the user changes region and Svelte removes the hash
    // 4. When the user re-clicks on the same region and Svelte removes the hash
    // We only want to updates the hash in scenarios 2, 3 & 4, hence the if statement below.
    page.url.hash;

    if (!window.location.hash) {
      // Setting the hash will update the visible hash in the browser AND cause the map to move to the right spot
      window.location.hash =
        localStorage.getItem(`lastHash-${regionConfig.id}`) ||
        `#map=${regionConfig.startZoom}/${regionConfig.startCoord[1]}/${regionConfig.startCoord[0]}`;
    }
  });

  onMount(() => {
    map = new maplibre.Map({
      container: mapContainer,
      style: mapStyle,
      center: regionConfig.startCoord,
      zoom: regionConfig.startZoom,
      maxBounds: regionConfig.maxBounds,
      maxZoom: 20,
      // customAttribution:
      //   "&copy; SydneyBikeMap &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      hash: "map",
      attributionControl: false, // We display attribution in the infobox component
    });

    // Add controls
    map.addControl(new maplibre.NavigationControl({}));
    map.addControl(new maplibre.ScaleControl({}));
    map.addControl(
      new maplibre.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );

    // Save last hash so we can restore it on next page load without hash
    map.on("moveend", () => {
      localStorage.setItem(
        `lastHash-${regionConfig.id}`,
        globalThis.window?.location.hash,
      );
    });
  });

  onDestroy(() => {
    if (map) map.remove();
  });
</script>

<div class="map" id="map" bind:this={mapContainer} />

<style>
  .map {
    position: relative;
    flex-grow: 1;
  }
</style>
