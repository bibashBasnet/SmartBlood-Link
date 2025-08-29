import React, { useContext, useCallback, useState, useEffect } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  DrawerActions,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";
import { Context } from "../../Context/Context";
import axios from "axios";
import Constants from "expo-constants";

const { width } = Dimensions.get("window");
const API_URL = Constants.expoConfig.extra.apiUrl;

const DonateStatusScreen = ({ navigation }) => {
  const { setIsForm, setCoordinate, user } = useContext(Context);
  const [donate, setDonate] = useState(null);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();
  const drawerStatus = useDrawerStatus(); // 'open' | 'closed'

  const showMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  // ---- Fetcher (Pending only) ----
  const load = useCallback(async () => {
    if (!user?.id) return;
    setIsForm(false);
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/donate/get/${user.id}`);
      const data = res.data;
      const list = Array.isArray(data) ? data : data ? [data] : [];
      const pending = list.find(
        (d) => String(d.status).trim().toLowerCase() === "pending" || "approved"
      );
      setDonate(pending || null);
    } catch (e) {
      console.error("DonateStatusScreen load error:", e?.message || e);
    } finally {
      setLoading(false);
    }
  }, [API_URL, user?.id, setIsForm]);

  // 1) Reload every time the screen gains focus (navigate back here)
  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        if (active) await load();
      })();
      return () => {
        active = false;
      };
    }, [load])
  );

  // 2) Optional: if you want to refresh after closing the drawer
  //    while this screen is already focused:
  React.useEffect(() => {
    if (isFocused && drawerStatus === "closed") {
      // re-fetch when drawer closes and this screen is visible
      load();
    }
  }, [drawerStatus, isFocused, load]);

  useEffect(() => {
    if (!loading && donate && donate.status?.toLowerCase() !== "pending") {
      navigation.replace("DonateScreen");
    }
  }, [loading, donate, navigation]);

  const handlePress = () => {
    if (!donate) return;
    setCoordinate({ latitude: donate.latitude, longitude: donate.longitude });
    navigation.navigate("Map", { from: "Donate" });
  };

  const handlePressCancel = async () => {
    try {
      if (!donate) return;
      // Make sure this matches your controller mapping:
      // If controller is /donate/delete/{createdBy}, use donate.createdBy
      const res = await axios.delete(`${API_URL}/donate/delete/${donate.id}`);
      setDonate(null);
      setCoordinate({ latitude: 27.6949, longitude: 85.2899 });
      alert(res.data);
      navigation.replace("DonateScreen");
    } catch (e) {
      console.error(e.message);
    }
  };

  if (loading) {
    return (
      <View style={localStyles.container}>
        <ActivityIndicator size="large" color="#e53935" />
        <Text style={{ marginTop: 10, color: "#666" }}>Loading request…</Text>
      </View>
    );
  }

  if (!donate) {
    navigation.navigate("DonateScreen");
    return (
      <View style={localStyles.container}>
        <Text style={{ color: "#666", fontSize: 16 }}>
          No pending donation request found.
        </Text>
      </View>
    );
  }

  return (
    <View style={localStyles.container}>
      {/* Header */}
      <View style={localStyles.headerContainer}>
        <Text style={localStyles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      <TouchableOpacity style={localStyles.menuButton} onPress={showMenu}>
        <Image
          source={require("../../assets/list.png")}
          style={localStyles.menuIcon}
        />
      </TouchableOpacity>

      <Text style={localStyles.title}>My Pending Donation Request</Text>

      <ScrollView
        style={localStyles.scroll}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={localStyles.infoText}>Name: {donate.name}</Text>
        <Text style={localStyles.infoText}>Age: {donate.age}</Text>
        <Text style={localStyles.infoText}>Gender: {donate.gender}</Text>
        <Text style={localStyles.infoText}>Address: {donate.address}</Text>
        <Text style={localStyles.infoText}>Email: {donate.email}</Text>
        <Text style={localStyles.infoText}>Phone No: {donate.phone}</Text>
        <Text style={localStyles.infoText}>
          Blood Type: {donate.bloodGroup}
        </Text>
        <Text style={localStyles.infoText}>
          Emergency Contact No: {donate.emergencyContact}
        </Text>
        <Text style={localStyles.infoText}>Weight: {donate.weight}</Text>
        <Text style={localStyles.infoText}>
          Last Donation Date: {donate.lastDonationDate}
        </Text>
        <Text style={localStyles.infoText}>Allergies: {donate.allergies}</Text>
        <Text style={localStyles.infoText}>
          Preferred Time: {donate.preferredDate}
        </Text>
        <Text style={localStyles.infoText}>Status: {donate.status}</Text>
        <Text style={localStyles.infoText}>
          Requested BloodBank: {donate.bloodBankName}
        </Text>

        <TouchableOpacity style={localStyles.button} onPress={handlePress}>
          <Text style={localStyles.buttonText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[localStyles.button, localStyles.cancelButton]}
          onPress={handlePressCancel}
        >
          <Text style={localStyles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#e53935",
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  organizationName: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  menuButton: { position: "absolute", top: 45, left: 20, padding: 8 },
  menuIcon: { width: 24, height: 24, tintColor: "#fff" },
  title: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#e53935",
  },
  scroll: { marginTop: 20, width: "100%" },
  infoText: { fontSize: 14, marginVertical: 4, color: "#333" },
  button: {
    marginTop: 15,
    backgroundColor: "#e53935",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: width * 0.9,
    alignSelf: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e53935",
  },
  cancelButtonText: { color: "#e53935", fontSize: 16, fontWeight: "bold" },
});

export default DonateStatusScreen;
