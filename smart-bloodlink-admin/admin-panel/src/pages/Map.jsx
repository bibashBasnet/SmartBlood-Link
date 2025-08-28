import React, { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getRequestCoordinate } from "../api/axios";

export default function Map() {
  const [selectedDataPoint, setSelectedDataPoint] = useState("1");
  const [rawPoints, setRawPoints] = useState([]);
  const [mapReady, setMapReady] = useState(false);

  // NEW: filters
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All"); // 1-12 or "All"

  // refs
  const rawPointsRef = useRef([]);
  useEffect(() => {
    rawPointsRef.current = rawPoints;
  }, [rawPoints]);

  const mapRef = useRef(null);
  const markerLayerRef = useRef(null);
  const overlayRef = useRef(null);

  // --- load & normalize data -------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const path = selectedDataPoint === "1" ? "/map/donate" : "/map/request";
        const req = await getRequestCoordinate(path);
        if (req) {
          setRawPoints(
            req
              .map((p) => ({
                ...p,
                lat: Number(p.latitude),
                lng: Number(p.longitude),
              }))
              .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
          );
          // clear overlays when dataset changes
          overlayRef.current && overlayRef.current.clearLayers();
        }
      } catch (e) {
        console.error(e?.response?.data?.message || e?.message);
      }
    }
    load();
  }, [selectedDataPoint]);

  // --- date helpers (UTC to avoid TZ month shift) ----------------------------
  const getUTCYear = (iso) => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? null : d.getUTCFullYear();
  };
  const getUTCMonth1 = (iso) => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? null : d.getUTCMonth() + 1; // 1..12
  };

  // --- derive available years from data (sorted desc) ------------------------
  const availableYears = useMemo(() => {
    const set = new Set();
    rawPoints.forEach((p) => {
      const y = getUTCYear(p.createdAt);
      if (y) set.add(y);
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [rawPoints]);

  // --- apply filters -> viewPoints ------------------------------------------
  const viewPoints = useMemo(() => {
    return rawPoints.filter((p) => {
      // if createdAt missing or invalid, exclude from filtered view
      const y = getUTCYear(p.createdAt);
      const m = getUTCMonth1(p.createdAt);
      if (!y || !m) return false;

      const yearOk = selectedYear === "All" ? true : y === Number(selectedYear);
      const monthOk =
        selectedMonth === "All" ? true : m === Number(selectedMonth);
      return yearOk && monthOk;
    });
  }, [rawPoints, selectedYear, selectedMonth]);

  // keep a ref so click handler always uses the latest filtered set
  const viewPointsRef = useRef([]);
  useEffect(() => {
    viewPointsRef.current = viewPoints;
  }, [viewPoints]);

  // --- math helpers ----------------------------------------------------------
  const toRad = (d) => (d * Math.PI) / 180;
  function haversineDistance(p1, p2) {
    const R = 6371; // km
    const dLat = toRad(p2.lat - p1.lat);
    const dLng = toRad(p2.lng - p1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(p1.lat)) * Math.cos(toRad(p2.lat)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // simple k-means on lat/lng (kept as-is)
  function kMeans(points, k = 10, maxIterations = 100) {
    if (!points.length) return [];
    let centroids = points.slice(0, Math.min(k, points.length));
    let clusters = [];
    for (let i = 0; i < maxIterations; i++) {
      clusters = Array.from({ length: centroids.length }, () => []);
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
      centroids = clusters.map((cluster, idx) => {
        if (cluster.length === 0) return centroids[idx]; // keep old to avoid NaN
        return {
          lat: cluster.reduce((s, p) => s + p.lat, 0) / cluster.length,
          lng: cluster.reduce((s, p) => s + p.lng, 0) / cluster.length,
        };
      });
    }
    return clusters;
  }

  // --- init map once ---------------------------------------------------------
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

    setTimeout(() => map.invalidateSize(), 0);
    setMapReady(true);

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

      // use FILTERED points
      const nearby = viewPointsRef.current.filter(
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
        const avgRadius = Math.max(
          0.05,
          dists.reduce((s, d) => s + d, 0) / dists.length || 0.05
        ); // >= 50m to avoid div-by-0
        const areaKm2 = Math.PI * avgRadius * avgRadius;
        const density = cluster.length / areaKm2; // pts per km²
        return { centroid, density, count: cluster.length, avgRadius };
      });

      // sort by true density (highest first)
      const sorted = metas.sort((a, b) => b.density - a.density);
      if (sorted.length < 3) {
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

  // --- redraw markers when FILTERED points update ----------------------------
  useEffect(() => {
    if (!mapReady || !markerLayerRef.current) return;
    markerLayerRef.current.clearLayers();

    viewPoints.forEach((p) => {
      L.circleMarker([p.lat, p.lng], {
        radius: 5,
        color: "#222",
        fillColor: "#000",
        fillOpacity: 0.85,
        interactive: false,
      }).addTo(markerLayerRef.current);
    });
  }, [viewPoints, mapReady]);

  // --- UI --------------------------------------------------------------------
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

  const months = [
    ["All", "All"],
    ["1", "Jan"],
    ["2", "Feb"],
    ["3", "Mar"],
    ["4", "Apr"],
    ["5", "May"],
    ["6", "Jun"],
    ["7", "Jul"],
    ["8", "Aug"],
    ["9", "Sep"],
    ["10", "Oct"],
    ["11", "Nov"],
    ["12", "Dec"],
  ];

  return (
    <div style={{ display: "flex", gap: 20, padding: 10 }}>
      <div id="map" style={{ height: "80vh", width: "75%" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 300 }}>
        {/* Legend */}
        <div style={box}>
          <h4 style={{ margin: 0 }}>Density Legend</h4>
          <div><span style={colorBox("red")} />High</div>
          <div><span style={colorBox("orange")} />Medium</div>
          <div><span style={colorBox("blue")} />Low</div>
        </div>

        {/* Dataset selector */}
        <div style={box}>
          <h4 style={{ margin: 0 }}>Location Data</h4>
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

        {/* NEW: Year / Month filters */}
        <div style={box}>
          <h4 style={{ margin: 0 }}>Filter by Date</h4>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12 }}>Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{ width: "100%", padding: 6 }}
              >
                <option value="All">All</option>
                {availableYears.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12 }}>Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{ width: "100%", padding: 6 }}
              >
                {months.map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#333" }}>
            Showing <b>{viewPoints.length}</b> of {rawPoints.length}
          </div>
        </div>
      </div>
    </div>
  );
}
