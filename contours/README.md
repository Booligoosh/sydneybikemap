# Steps to generate the elevation contour tiles

Unfortunately this process can't be done automatically in a GitHub action due to the data source size, but it doesn't matter too much as the data basically never changes. Here are the steps needed to generate & upload the contour files.

### Requirements

You will need at least 6GB of free space (all the intermediate and final files come to a total of 5.93GB). How long it will take depends on your computer specs, but allow at least 15 minutes.

## 1. Download data

1. Go to [Elvis](https://elevation.fsdf.org.au/)
2. Click "Order data"
3. Click "Draw" and draw a box in the Sydney CBD (the exact area doesn't matter)
4. Click "Search"
5. Scroll down to "Geoscience Australia > 5 Metre" and click "Select all next to it". This extract covers an area from Colo Heights to Wollongong.
6. Leave the coordinate system & output format as default, then enter your industry & email
7. Click "Order 1 dataset"
8. You should get an email in around 10 minutes with a download link. The email should have the following at the top:

```
You requested 5m DEM GeoTIFF (Geo-referenced Tagged Image File Format) data within the area bounded by POLYGON((150.15911082880518 -34.49796310936177,151.6266506991253 -34.49796310936177,151.6266506991253 -33.22968114271113,150.15911082880518 -33.22968114271113,150.15911082880518 -34.49796310936177)) (in GCS WGS84) with coordinate system Geocentric Datum of Australia 1994, Latitude-Longitude; Degrees [EPSG #4283].
```

9. Click on the download link in the email (below the image) and download it to this folder (`contours/`).
10. Extract the data from zip file using the following command:

```bash
unzip 5m_DEM_152151.zip 5m_DEM.tif
```

11. We're done! We should now have a file called `5m_DEM.tif` sitting in the contours folder. The file is around 1.3GB.

Now run the commands below from the contours folder…

## 2. Generate contours

Requires [gdal](https://gdal.org/)

```bash
gdal_contour 5m_DEM.tif -a ele -i 5 -f geojson contours.geojson
```

## 3. Generate mbtiles

Requires [tippecanoe](https://github.com/mapbox/tippecanoe)

```bash
tippecanoe --no-feature-limit --no-tile-size-limit --exclude-all --minimum-zoom=1 --maximum-zoom=14 --no-tile-compression  -y ele -l contours --force --output="contours.mbtiles" contours.geojson
```

## 4. Convert to pmtiles

Requires [go-pmtiles](https://github.com/protomaps/go-pmtiles)

```bash
pmtiles convert contours.mbtiles contours.pmtiles
```

## 5. Upload

Upload `contours.pmtiles` into the root of the Cloudflare R2 bucket via the Cloudflare website. The file is around 95MB, so it's under the 300MB limit for files uploaded from the web UI.

The pmtiles file format allows retrieval of individual tiles using HTTP Range Requests, meaning it's fine to have it sitting in static object storage — the frontend calculates which part of the file to retrieve. For more info, see [protomaps.com](https://protomaps.com/).
