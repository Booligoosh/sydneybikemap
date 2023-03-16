# References:
# https://jacopofarina.eu/posts/static-maps-part-2-vector-tiles/
# https://blog.kleunen.nl/blog/tilemaker-generate-map

# wget https://download.geofabrik.de/australia-oceania/australia-latest.osm.pbf
# osmium extract --bbox=150.83,-34.06,151.33,-33.68 --set-bounds --strategy=smart australia-latest.osm.pbf  --output sydney-latest.osm.pbf
# tilemaker --input sydney-latest.osm.pbf --output output --config config-openmaptiles.json  --process process-openmaptiles.lua

wget https://download.bbbike.org/osm/bbbike/Sydney/Sydney.osm.pbf
# First you will need to run `docker build . -t tilemaker` in the cloned tilemaker directory somewhere else
sudo docker run --rm -it -v $(pwd)/:/opt/input -v $(pwd)/output/:/opt/output --user "$(id -u):$(id -g)" tilemaker --input /opt/input/Sydney.osm.pbf --output /opt/output --process /opt/input/process.lua --config /opt/input/config.json
tilemaker --input Sydney.osm.pbf.1 --output output --process process.lua --config config.json

npx serve
