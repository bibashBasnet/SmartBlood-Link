import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Constants from "expo-constants";
import axios from "axios"; // ✅ Add this at the top
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/logo.png";
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
  const mapRef = useRef(null);
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const [zoomLevel, setZoomLevel] = useState(0.05); // smaller = more zoom
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("You");

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
  }, []);

  const fetchNearbyBloodBanks = async (lat, lng) => {
    try {
      const response = await axios.get(`${API_URL}/geoFiltering/nearby`, {
        params: {
          lat,
          lng,
          radius: 10,
        },
      });

      const bankData = response.data;
      bankData.sort((a, b) => a.distance - b.distance);
      setBanks(bankData);
      setBloodBank(bankData[0].name);
      // Fit map to show all banks + user location
      if (mapRef.current && bankData.length > 0) {
        const allCoords = [
          { latitude: lat, longitude: lng }, // user's location
          ...bankData.map((bank) => ({
            latitude: bank.latitude,
            longitude: bank.longitude,
          })),
        ];

        mapRef.current.fitToCoordinates(allCoords, {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        });
      }
    } catch (error) {
      console.error("Error fetching blood banks:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = async (e) => {
    if (!isForm) return;
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoord({ latitude, longitude });
    if (from === "Donate") setCoordinate({ latitude, longitude });
    else if (from === "Request") setRequestCoord({ latitude, longitude });
  };

  const handleSubmit = async () => {
    if (isForm) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      fetchNearbyBloodBanks(coord.latitude, coord.longitude);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
        <Image
          source={require("../../assets/list.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={(e) => {
          handlePress(e);
        }}
        initialRegion={{
          latitude: coord.latitude,
          longitude: coord.longitude,
          latitudeDelta: zoomLevel,
          longitudeDelta: zoomLevel,
        }}
      >
        <Marker coordinate={coord} title={title} pinColor="blue" />

        {!isForm &&
          banks.map((bank, i) => (
            <Marker
              key={bank.id}
              coordinate={{
                latitude: parseFloat(bank.latitude),
                longitude: parseFloat(bank.longitude),
              }}
              pinColor={i == 0 ? "green" : "red"}
              title={bank.name}
              description={`${bank.locationText} (${bank.distance.toFixed(
                2
              )} km)`}
            />
          ))}
      </MapView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f6f7",
    paddingTop: 0,
  },
  map: {
    alignItems: "center",
    flex: 1,
    width: "90%",
    maxHeight: verticalScale(580),
    maxWidth: scale(350),
    marginLeft: scale(20),
    marginTop: verticalScale(70),
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  logo: {
    width: scale(40),
    height: scale(40),
    resizeMode: "contain",
    marginRight: scale(10),
  },
  menuButton: {
    position: "absolute",
    top: verticalScale(40),
    left: scale(20),
    padding: scale(10),
    marginTop: verticalScale(40),
  },
  menuIcon: {
    width: scale(28),
    height: scale(28),
    tintColor: "#e53935",
  },
  organizationName: {
    fontSize: moderateScale(22),
    fontWeight: "bold",
    color: "#e53935",
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
