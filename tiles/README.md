# SydneyBikeMap Tiles

## To generate tiles locally:

First, change `settings.filemetadata.tiles` in config.json to the localhost URL you're going to host the tiles at.

Then run:

```bash
wget https://download.openstreetmap.fr/extracts/oceania/australia/new_south_wales.osm.pbf
osmconvert new_south_wales.osm.pbf -o=data.osm.pbf --complete-ways -B=bbox.poly
tilemaker --input data.osm.pbf --output output --process process.lua --config config.json
```

## References:

- https://jacopofarina.eu/posts/static-maps-part-2-vector-tiles/
- https://blog.kleunen.nl/blog/tilemaker-generate-map
