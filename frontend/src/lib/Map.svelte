<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    Map,
    GeolocateControl,
    NavigationControl,
    ScaleControl,
  } from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";
  import mapStyle from "./mapStyle";

  let map;
  let mapContainer;

  onMount(() => {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

    map = new Map({
      container: mapContainer,
      style: mapStyle,
      center: [151.0409, -33.8455], // starting position [lng, lat]
      zoom: 9.15, // starting zoom
      maxBounds: [149.536285, -34.927346, 152.571173, -32.231172], // based on coords in bbox.poly
      maxZoom: 20,
      // customAttribution:
      //   "&copy; SydneyBikeMap &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      hash: true,
    });

    // Add controls
    map.addControl(new NavigationControl({}));
    map.addControl(new ScaleControl({}));
    map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
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
