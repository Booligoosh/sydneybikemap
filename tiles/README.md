# SydneyBikeMap Tiles

## To generate tiles locally:

```bash
wget https://download.bbbike.org/osm/bbbike/Sydney/Sydney.osm.pbf
tilemaker --input Sydney.osm.pbf --output output --process process.lua --config config.json
```

## References:

- https://jacopofarina.eu/posts/static-maps-part-2-vector-tiles/
- https://blog.kleunen.nl/blog/tilemaker-generate-map
