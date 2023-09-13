# SydneyBikeMap Tiles

To generate tiles locally:

First, change `settings.filemetadata.tiles` in config.json to the localhost URL you're going to
host the tiles at (eg. `http://127.0.0.1:8080/{z}/{x}/{y}.pbf` if
using `npx http-server --cors` as below).

Note: This is not for the frontend to find them.

## Install dependencies

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

## Processing

Download the OSM dump for NSW, clip the bounding box and then create the tiles (specified by the
`process.lua` config):

```bash
wget https://download.openstreetmap.fr/extracts/oceania/australia/new_south_wales.osm.pbf
osmconvert new_south_wales.osm.pbf -o=data.osm.pbf --complete-ways -B=bbox.poly
tilemaker --input data.osm.pbf --output output --process process.lua --config config.json
```

If above download fails with HTTP 502 use
https://download.geofabrik.de/australia-oceania/australia-latest.osm.pbf

# Serve the tiles

You can use any webserver to serve the tiles from `tiles/output`.

Eg:

```
npx http-server output/ --cors
```

# Setting tile path in frontend

- Download the current metadata file to the public folder, so the dev server will host it:

```bash
cd frontend/public/
wget https://tiles.sydneybikemap.ethan.link/metadata.json
```

- Change the `tiles` value the `metadata.json` to
  `"tiles": ["http://localhost:8080/{z}/{x}/{y}.pbf"],` (or similar)

- Edit `frontend/src/lib/mapStyle.ts` and change the path to `/metadata.json`:

```diff
diff --git a/frontend/src/lib/mapStyle.ts b/frontend/src/lib/mapStyle.ts
index f0919df..c270bb7 100644
--- a/frontend/src/lib/mapStyle.ts
+++ b/frontend/src/lib/mapStyle.ts
@@ -76,7 +76,8 @@ const mapStyle: StyleSpecification = {
   sources: {
     openmaptiles: {
       type: "vector",
-      url: "https://tiles.sydneybikemap.ethan.link/metadata.json",
+      url: "/metadata.json",
     },
```

You should now be able to run your frontend dev server and load your local tiles. Double check
your devtools network panel to ensure the requests are coming from your machine,

# Tile generation devloop

If you're making lots of chnages to the `process.lua`, this might be helpful to quickly generate
new tiles:

```
rm -rf output && tilemaker --input data.osm.pbf --output output --process process.lua --config config.json && npx http-server outout/ --cors
```

## References:

- https://jacopofarina.eu/posts/static-maps-part-2-vector-tiles/
- https://blog.kleunen.nl/blog/tilemaker-generate-map
