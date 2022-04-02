import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5kcmV3Z2p1biIsImEiOiJjbDFlMGloamMwZmtzM2NtdWJ1aWxmanl1In0.WZjXE1rRH_wMpe5SY6KSwg";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-79.347015);
  const [lat, setLat] = useState(43.65107);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  return <div ref={mapContainer} className="map-container" />;
}

export default Map;
