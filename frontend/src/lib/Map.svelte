<script>
  import { onMount, onDestroy } from "svelte";
  import {
    Map,
    GeolocateControl,
    NavigationControl,
    ScaleControl,
  } from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";

  let map;
  let mapContainer;

  onMount(() => {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

    map = new Map({
      container: mapContainer,
      style: window.location.origin + "/style.json", // stylesheet location
      center: [151.2, -33.8], // starting position [lng, lat]
      zoom: 9, // starting zoom
      maxBounds: [150.83, -34.05999990000001, 151.33, -33.679999900000009], // copied from metadata.json
      customAttribution:
        "&copy; Sydney Bike Map &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
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
    width: 100%;
    height: 100vh;
  }
</style>
