import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getRequestCoordinate } from "../api/axios";

export default function Map() {
  const [selectedDataPoint, setSelectedDataPoint] = useState("1");
  const [rawPoints, setRawPoints] = useState([]);

  // ref to always hold the latest points
  const rawPointsRef = useRef([]);
  useEffect(() => {
    rawPointsRef.current = rawPoints;
  }, [rawPoints]);

  const mapRef = useRef(null);
  const markerLayerRef = useRef(null);
  const overlayRef = useRef(null);

  // load & normalize data
  useEffect(() => {
    async function load() {
      if (selectedDataPoint === "1") {
        try {
          const req = await getRequestCoordinate("/map/donate");
          if (req) {
            setRawPoints(
              req.map((p) => ({ ...p, lat: p.latitude, lng: p.longitude }))
            );
          }
        } catch (e) {
          console.error(e?.response?.data?.message);
        }
      }
      if (selectedDataPoint === "2") {
        try {
          const req = await getRequestCoordinate("/map/request");
          if (req) {
            setRawPoints(
              req.map((p) => ({ ...p, lat: p.latitude, lng: p.longitude }))
            );
          }
        } catch (e) {
          console.error(e?.response?.data?.message);
        }
      }
    }
    load();
  }, [selectedDataPoint]);

  // haversine distance in km
  function haversineDistance(p1, p2) {
    const R = 6371,
      toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(p2.lat - p1.lat),
      dLng = toRad(p2.lng - p1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(p1.lat)) *
        Math.cos(toRad(p2.lat)) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // simple k-means on lat/lng
  function kMeans(points, k = 10, maxIterations = 100) {
    let centroids = points.slice(0, k),
      clusters = [];
    for (let i = 0; i < maxIterations; i++) {
      clusters = Array.from({ length: k }, () => []);
      points.forEach((p) => {
        let best = 0,
          bestD = Infinity;
        centroids.forEach((c, idx) => {
          const d = haversineDistance(p, c);
          if (d < bestD) {
            bestD = d;
            best = idx;
          }
        });
        clusters[best].push(p);
      });
      centroids = clusters.map((cluster) => ({
        lat: cluster.reduce((s, p) => s + p.lat, 0) / cluster.length,
        lng: cluster.reduce((s, p) => s + p.lng, 0) / cluster.length,
      }));
    }
    return clusters;
  }

  // init map once
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });

    const map = L.map("map").setView([27.7172, 85.324], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    markerLayerRef.current = L.layerGroup().addTo(map);
    overlayRef.current = L.layerGroup().addTo(map);

    let isDragging = false;
    map.on("dragstart", () => (isDragging = true));
    map.on("dragend", () => setTimeout(() => (isDragging = false), 100));

    map.on("click", (e) => {
      if (isDragging) return;
      overlayRef.current.clearLayers();

      const clicked = { lat: e.latlng.lat, lng: e.latlng.lng };
      // draw search circle
      L.circle(clicked, {
        radius: 3000,
        color: "gray",
        fillOpacity: 0.1,
        interactive: false,
      }).addTo(overlayRef.current);

      // use latest points
      const nearby = rawPointsRef.current.filter(
        (p) => haversineDistance(p, clicked) <= 3
      );
      if (nearby.length < 3) {
        L.popup()
          .setLatLng(clicked)
          .setContent("Not enough points within 3 km to cluster.")
          .openOn(map);
        return;
      }

      // cluster & compute true density
      const clusters = kMeans(nearby, 3);
      const bigOnes = clusters.filter((cluster) => cluster.length >= 2);
      const metas = bigOnes.map((cluster) => {
        const centroid = {
          lat: cluster.reduce((s, p) => s + p.lat, 0) / cluster.length,
          lng: cluster.reduce((s, p) => s + p.lng, 0) / cluster.length,
        };
        const dists = cluster.map((p) => haversineDistance(p, centroid));
        const avgRadius = dists.reduce((s, d) => s + d, 0) / dists.length;
        const areaKm2 = Math.PI * avgRadius * avgRadius;
        const density = cluster.length / areaKm2; // pts per km²
        return { centroid, density, count: cluster.length, avgRadius };
      });

      // sort by true density (highest first)
      const sorted = metas.sort((a, b) => b.density - a.density);
      if (sorted < 3) {
        L.popup()
          .setLatLng(clicked)
          .setContent("Not enough points within 3 km to cluster.")
          .openOn(map);
      }
      const labels = ["high", "medium", "low"];
      const colors = { high: "red", medium: "orange", low: "blue" };

      sorted.slice(0, 3).forEach((m, i) => {
        L.circle([m.centroid.lat, m.centroid.lng], {
          color: colors[labels[i]],
          fillColor: colors[labels[i]],
          fillOpacity: 0.4,
          radius: m.avgRadius * 1000 + 100,
          interactive: false,
        })
          .addTo(overlayRef.current)
          .bindPopup(
            `${labels[i].toUpperCase()} DENSITY: ${
              m.count
            } pts / ${m.density.toFixed(1)} pts/km²`
          );
      });
    });

    return () => map.remove();
  }, []);

  // redraw markers when points update
  useEffect(() => {
    if (!markerLayerRef.current) return;
    markerLayerRef.current.clearLayers();
    rawPoints.forEach((p) => {
      L.circleMarker([p.lat, p.lng], {
        radius: 5,
        color: "black",
        fillColor: "#000",
        fillOpacity: 0.8,
        interactive: false,
      }).addTo(markerLayerRef.current);
    });
  }, [rawPoints]);

  // simple legends & selector
  const box = {
    background: "#fff",
    padding: 8,
    borderRadius: 4,
    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
  };
  const colorBox = (c) => ({
    display: "inline-block",
    width: 12,
    height: 12,
    background: c,
    marginRight: 6,
  });

  return (
    <div style={{ display: "flex", gap: 20, padding: 10 }}>
      <div id="map" style={{ height: "80vh", width: "75%" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={box}>
          <h4 style={{ margin: 0 }}>Density Legend</h4>
          <div>
            <span style={colorBox("red")} />
            High
          </div>
          <div>
            <span style={colorBox("orange")} />
            Medium
          </div>
          <div>
            <span style={colorBox("blue")} />
            Low
          </div>
        </div>
        <div style={box}>
          <h4 style={{ margin: 0 }}>Location Data Info</h4>
          <label>
            <input
              type="radio"
              value="1"
              checked={selectedDataPoint === "1"}
              onChange={(e) => {
                setSelectedDataPoint(e.target.value);
                overlayRef.current && overlayRef.current.clearLayers();
              }}
            />{" "}
            Donation Request
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="2"
              checked={selectedDataPoint === "2"}
              onChange={(e) => {
                setSelectedDataPoint(e.target.value);
                overlayRef.current && overlayRef.current.clearLayers();
              }}
            />{" "}
            Blood Request
          </label>
        </div>
      </div>
    </div>
  );
}
