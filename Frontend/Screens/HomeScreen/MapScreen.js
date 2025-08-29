// MapScreen.tsx (WebView + Leaflet version)
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import Constants from "expo-constants";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DrawerActions,
  useRoute,
  CommonActions,
} from "@react-navigation/native";
import { Context } from "../../Context/Context";
import { scale, verticalScale, moderateScale } from "../../utils/responsive";

export default function MapScreen({ navigation }) {
  const route = useRoute();
  const from = route.params?.from;

  const {
    bloodBank,
    setBloodBank,
    isForm,
    coordinate,
    setCoordinate,
    requestCoord,
    setRequestCoord,
  } = useContext(Context);
  const webViewRef = useRef(null);
  const API_URL = Constants.expoConfig.extra.apiUrl;

  // keep your state names/semantics the same
  const [zoomLevel, setZoomLevel] = useState(14); // not used by Leaflet but kept to preserve API
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("You");
  const formZoom = 12;

  const [coord, setCoord] = useState({
    latitude: coordinate.latitude,
    longitude: coordinate.longitude,
  });

  useEffect(() => {
    if (from === "delivery") {
      setTitle("Delivery Location");
    }
    if (coord.latitude && coord.longitude) {
      fetchNearbyBloodBanks(coord.latitude, coord.longitude);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNearbyBloodBanks = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/geoFiltering/nearby`, {
        params: {
          lat,
          lng,
          radius: 10,
        },
      });

      const bankData = response.data || [];
      bankData.sort((a, b) => a.distance - b.distance);
      setBanks(bankData);
      if (bankData.length > 0) setBloodBank(bankData[0].name);

      // Tell the web map to render markers and fit bounds
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          if (window.__leafletReady && window.__setData) {
            window.__setData(${JSON.stringify({
              coord,
              banks: bankData,
              isForm,
              title,
              formZoom,
            })});
          }
          true;
        `);
      }
    } catch (error) {
      console.error("Error fetching blood banks:", error?.message || error);
      Alert.alert("Network Error", "Failed to load nearby blood banks.");
    } finally {
      setLoading(false);
    }
  };

  // keep function name; now triggered by WebView click bridge
  const handlePress = async (e) => {
    if (!isForm) return;
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoord({ latitude, longitude });

    // push back into global state like before
    if (from === "Donate") setCoordinate({ latitude, longitude });
    else if (from === "Request") setRequestCoord({ latitude, longitude });

    // also reflect on the map immediately
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        if (window.__leafletReady && window.__setUserMarker) {
          window.__setUserMarker(${latitude}, ${longitude}, ${JSON.stringify(
        title
      )});
        }
        true;
      `);
    }
  };

  const handleSubmit = async () => {
    if (isForm) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        Alert.alert("Permission Denied", "Enable location to continue.");
        return;
      }
      await fetchNearbyBloodBanks(coord.latitude, coord.longitude);

      if (from === "Donate") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "DonateScreen" }],
          })
        );
      }
      if (from === "Request") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "BloodRequestForm" }],
          })
        );
      }
    }
    if (!isForm) {
      if (from === "Donate") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "DonateStatusScreen" }],
          })
        );
      }
      if (from === "Request") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "RequestScreen" }],
          })
        );
      }
      if (from === "delivery") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Delivery" }],
          })
        );
      }
    }
  };

  const onWebMessage = (event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      switch (msg.type) {
        case "ready": {
          // initial hydrate
          webViewRef.current?.injectJavaScript(`
            if (window.__leafletReady && window.__setData) {
              window.__setData(${JSON.stringify({
                coord,
                banks,
                isForm,
                title,
                zoomLevel,
                formZoom,
              })});
            }
            true;
          `);
          break;
        }
        case "mapClicked": {
          // simulate RN MapView onPress signature so handlePress stays the same
          handlePress({
            nativeEvent: {
              coordinate: {
                latitude: msg.latitude,
                longitude: msg.longitude,
              },
            },
          });
          break;
        }
        default:
          break;
      }
    } catch (err) {
      console.warn("webview message parse error", err);
    }
  };

  if (loading || !coord.latitude || !coord.longitude) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Fetching location & nearby blood banks...</Text>
      </View>
    );
  }

  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const mapHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Smart BloodLink Map</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    html, body { margin:0; padding:0; height:100%; }
    #map { height:100%; width:100%; }
    .leaflet-control-attribution { display:block; font-size:10px; }
    .bank-popup { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto; font-size:12px; }
    .bank-popup .name { font-weight:600; margin-bottom:4px; }
    .bank-popup .dist { color:#666; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    let map, youMarker, bankMarkers = [];

    // Utility: make a colored SVG pin
    function makePinIcon(color = "#007AFF", size = 40) {
      const svg = \`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 64" width="\${size*0.75}" height="\${size}">
          <path fill="\${color}" d="M24 0C12 0 2.5 9.4 2.5 21c0 12.9 14.5 30.7 20.3 36.9 0.7 0.7 1.7 0.7 2.4 0C31 51.7 45.5 33.9 45.5 21 45.5 9.4 36 0 24 0z"/>
          <circle cx="24" cy="22" r="7" fill="white"/>
        </svg>
      \`;
      const url = "data:image/svg+xml;base64," + btoa(svg);
      const w = size*0.75, h = size;
      return L.icon({
        iconUrl: url,
        iconSize: [w,h],
        iconAnchor: [w/2,h],
        popupAnchor: [0, -h+10]
      });
    }

    // Predefined icons
    const ICONS = {
      user: makePinIcon("#007AFF"),   // blue
      nearest: makePinIcon("#34C759"),// green
      bank: makePinIcon("#FF3B30")    // red
    };

    function init() {
      map = L.map('map').setView([27.7089, 85.3206], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        detectRetina: true
      }).addTo(map);

      map.on('click', (e) => {
        window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'mapClicked',
          latitude: e.latlng.lat,
          longitude: e.latlng.lng
        }));
      });

      window.__leafletReady = true;
      window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ready' }));
    }

    function clearBanks() {
      bankMarkers.forEach(m => map.removeLayer(m));
      bankMarkers = [];
    }

    function fitAll(coords) {
      if (!coords || !coords.length) return;
      const bounds = L.latLngBounds(coords.map(c => [c.latitude, c.longitude]));
      map.fitBounds(bounds, { padding: [60,60] });
    }

    window.__setData = function(payload) {
      const { coord, banks: bankList,isForm, title, zoomLevel, formZoom } = payload || {};
      if (coord && coord.latitude && coord.longitude) {
        window.__setUserMarker(coord.latitude, coord.longitude, title);
      }
      clearBanks();

      if (isForm) {
        if (coord && Number.isFinite(coord.latitude) && Number.isFinite(coord.longitude)) {
          const z = Number.isFinite(formZoom) ? formZoom : 17; // fallback zoom if not provided
          map.setView([coord.latitude, coord.longitude], z);
        }
        return; 
      }
      if (!isForm && Array.isArray(bankList)) {
        bankList.forEach((b,i) => {
          const lat = parseFloat(b.latitude);
          const lng = parseFloat(b.longitude);
          if (!isNaN(lat) && !isNaN(lng)) {
            const icon = (i===0) ? ICONS.nearest : ICONS.bank;
            const marker = L.marker([lat,lng], { icon }).addTo(map);
            const dist = (typeof b.distance === 'number') ? b.distance.toFixed(2) : '?';
            const desc = b.locationText || '';
            marker.bindPopup(
              '<div class="bank-popup">'+
              '<div class="name">'+(b.name||'Blood Bank')+'</div>'+
              '<div>'+desc+'</div>'+
              '<div class="dist">Distance: '+dist+' km</div>'+
              '</div>'
            );
            bankMarkers.push(marker);
          }
        });
      }
      const all = [];
      if (coord) all.push({ latitude: coord.latitude, longitude: coord.longitude });
      if (!isForm && Array.isArray(bankList)) {
        bankList.forEach(b=>{
          const lat = parseFloat(b.latitude), lng = parseFloat(b.longitude);
          if (!isNaN(lat)&&!isNaN(lng)) all.push({latitude:lat,longitude:lng});
        });
      }
      if (all.length) fitAll(all);
    };

    window.__setUserMarker = function(lat, lng, label) {
      if (youMarker) { map.removeLayer(youMarker); }
      youMarker = L.marker([lat, lng], { icon: ICONS.user, title: label||'You' }).addTo(map);
      youMarker.bindPopup((label || 'You'));
    };

    document.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>
`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
        <Image
          source={require("../../assets/list.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: mapHTML }}
        onMessage={onWebMessage}
        javaScriptEnabled
        domStorageEnabled
        geolocationEnabled
        setSupportMultipleWindows={false}
        style={styles.map}
        onLoadEnd={() => {
          // After first load, push initial data (redundant-safe with 'ready' handshake)
          if (webViewRef.current) {
            webViewRef.current.injectJavaScript(`
              if (window.__leafletReady && window.__setData) {
                window.__setData(${JSON.stringify({
                  coord,
                  banks,
                  isForm,
                  title,
                })});
              }
              true;
            `);
          }
        }}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f6f7", // White background
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  map: {
    alignItems: "center",
    flex: 1,
    width: "95%",
    maxHeight: verticalScale(580),
    maxWidth: scale(350),
    marginLeft: scale(10),
    marginTop: verticalScale(70),
  },
  menuButton: {
    position: "absolute",
    top: "12%",
    left: 20,
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  headerContainer: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#e53935",
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  organizationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
    padding: scale(10),
  },
  card: {
    backgroundColor: "#fff",
    padding: scale(12),
    marginVertical: verticalScale(6),
    borderRadius: moderateScale(8),
    elevation: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: moderateScale(16),
  },

  logo: {
    width: scale(40),
    height: scale(40),
    resizeMode: "contain",
    marginRight: scale(10),
  },
  submitButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(25),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
    shadowColor: "#b71c1c",
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(5),
    elevation: 5,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: moderateScale(18),
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: scale(1),
  },
});
