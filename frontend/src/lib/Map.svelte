<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import maplibre from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";
  import mapStyle from "./mapStyle";
  import trainIcon from "../assets/map-icons/train.png";
  import metroIcon from "../assets/map-icons/metro.png";
  import lightRailIcon from "../assets/map-icons/lightrail.png";
  import speedLimitIcon from "../assets/map-icons/speedlimit.png";
  import * as pmtiles from "pmtiles";
  // Add pmtiles protocol handling
  const protocol = new pmtiles.Protocol();
  maplibre.addProtocol("pmtiles", protocol.tile);

  let map;
  let mapContainer;

  onMount(() => {
    map = new maplibre.Map({
      container: mapContainer,
      style: mapStyle,
      center: [151.0409, -33.8455], // starting position [lng, lat]
      zoom: 9.15, // starting zoom
      maxBounds: [149.536285, -34.927346, 152.571173, -32.231172], // based on coords in bbox.poly
      maxZoom: 20,
      // customAttribution:
      //   "&copy; SydneyBikeMap &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      hash: "map",
    });

    // Load images
    // TODO: Make a sprite sheet instead
    map.loadImage(trainIcon, (error, image) => {
      if (error) throw error;
      map.addImage("train_icon", image, { sdf: false });
    });
    map.loadImage(metroIcon, (error, image) => {
      if (error) throw error;
      map.addImage("metro_icon", image, { sdf: false });
    });
    map.loadImage(lightRailIcon, (error, image) => {
      if (error) throw error;
      map.addImage("light_rail_icon", image, { sdf: false });
    });
    map.loadImage(speedLimitIcon, (error, image) => {
      if (error) throw error;
      map.addImage("speed_limit_icon", image, { sdf: false });
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
