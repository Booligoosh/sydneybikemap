# SydneyBikeMap Tiles

To generate tiles locally:

# Install dependencies

## Installing `osmconvert`

### Ubuntu

```
sudo apt-get update
sudo apt-get install osmctools
```

### macOS

Install [Homebrew](https://brew.sh/)

```
brew install osmfilter
```

## Installing `tilemaker`

See https://github.com/systemed/tilemaker/blob/master/docs/INSTALL.md

Note: on macOS you may need to:

- manually run `brew link protobuf` if you get an error running
  `make: protoc: No such file or directory`.

- Change the man path from `/usr/share/man` to the `Makefile` to something else due to
  System Integrity Protection if you get
  `install: chmod 755 /usr/share/man/man1/: Operation not permitted`.

Eg:

```diff
diff --git a/Makefile b/Makefile
index af63dcf..d749e69 100644
--- a/Makefile
+++ b/Makefile
@@ -76,7 +76,7 @@ endif

 prefix = /usr/local

-MANPREFIX := /usr/share/man
+MANPREFIX := /usr/local/tilemaker/man
```

## Installing `pmtiles`

See https://github.com/protomaps/go-pmtiles#installation

# Processing

Download the OSM dump for NSW, clip the bounding box, create the tiles (specified by the `process.lua` config), then convert to pmtiles:

```bash
wget https://download.openstreetmap.fr/extracts/oceania/australia/new_south_wales.osm.pbf

osmconvert new_south_wales.osm.pbf -o=data.osm.pbf --complete-ways -B=bbox.poly

tilemaker --input data.osm.pbf --output output/map.mbtiles --process process.lua --config config.json

pmtiles convert output/map.mbtiles output/map.pmtiles
```

If above download fails with HTTP 502 use
https://download.geofabrik.de/australia-oceania/australia-latest.osm.pbf

# Serve the tiles

You can use any webserver to serve the tiles from `tiles/output`. However, [`serve`](https://www.npmjs.com/package/serve) is recommended and a `serve.json` configuration has been provided.

Eg:

```bash
# Make sure you run this from the tiles/ folder
npx serve -l 3005
```

# Setting tile path in frontend

- Edit `frontend/src/lib/mapStyle.ts` and change the path to point to your local tile server:

```diff
    openmaptiles: {
      type: "vector",
-     url: "pmtiles://https://pmtiles.sydneybikemap.ethan.link/map.pmtiles",
+     url: "pmtiles://http://localhost:3005/map.pmtiles",
    },
```

You should now be able to run your frontend dev server and load your local tiles. Double check
your devtools network panel to ensure the requests are coming from your machine.

# Tile generation devloop

If you're making lots of changes to the `process.lua`, this might be helpful to quickly generate
new tiles:

```bash
tilemaker --input data.osm.pbf --output output/map.mbtiles --process process.lua --config config.json && pmtiles convert output/map.mbtiles output/map.pmtiles && npx serve -l 3005
```

## References:

- https://jacopofarina.eu/posts/static-maps-part-2-vector-tiles/
- https://blog.kleunen.nl/blog/tilemaker-generate-map
