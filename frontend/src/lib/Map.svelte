<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import maplibre from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";
  import mapStyle from "$lib/mapStyle";
  import * as pmtiles from "pmtiles";
  // Add pmtiles protocol handling
  const protocol = new pmtiles.Protocol();
  maplibre.addProtocol("pmtiles", protocol.tile);

  let map: maplibre.Map;
  let mapContainer: HTMLDivElement;

  onMount(() => {
    map = new maplibre.Map({
      container: mapContainer,
      style: mapStyle,
      center: [144.9556, -37.7986], // starting position [lng, lat]
      zoom: 11.2, // starting zoom
      minZoom: 6,
      // maxBounds: [149.536285, -34.927346, 152.571173, -32.231172], // based on coords in bbox.poly
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
      localStorage.setItem("lastHash", window.location.hash);
    });
  });

  onDestroy(() => {
    map.remove();
  });
</script>

<div class="map" id="map" bind:this={mapContainer} />

<style>
  .map {
    position: relative;
    flex-grow: 1;
  }
</style>
