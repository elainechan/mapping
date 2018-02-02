#!/bin/bash

# Type this in shell first:
# chmod +x [script-name].sh

# Install GDAL
brew install gdal
# Convert shp to geojson
ogr2ogr -f GeoJSON nyc-bike-routes-raw.geojson ./nyc-bike-routes/nyc_bike_routes_20170707.shp
# Install Tippecanoe
brew install tippecanoe
# Convert geojson to mbtiles
tippecanoe -o nyc-bike-routes.mbtiles nyc-bike-routes-raw.geojson