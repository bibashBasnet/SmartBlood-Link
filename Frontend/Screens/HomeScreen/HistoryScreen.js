import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import Constants from "expo-constants";
import { Context } from "../../Context/Context";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const HistoryScreen = ({ navigation }) => {
  const { user } = useContext(Context);
  const API_URL = Constants.expoConfig.extra.apiUrl;

  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const showMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/donationHistory/get`, {
          params: { id: user.id },
        });
        if (mounted && Array.isArray(res.data)) setHistoryList(res.data);
      } catch (e) {
        alert("History List " + (e?.message || "Failed to load"));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [API_URL, user?.id]);

  return (
    <SafeAreaView style={localStyles.container}>
      {/* Header with visible menu button */}
      <View style={localStyles.headerContainer}>
        <Text style={localStyles.organizationName}>Smart BloodLink Nepal</Text>
      </View>
      <TouchableOpacity
        style={localStyles.menuButton}
        onPress={showMenu}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Image
          source={require("../../assets/list.png")}
          style={localStyles.menuIcon}
        />
      </TouchableOpacity>

      <Text style={localStyles.title}>My Donation History</Text>

      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={localStyles.centerBox}>
            <ActivityIndicator size="large" color="#e53935" />
            <Text style={localStyles.muted}>Loading history…</Text>
          </View>
        ) : historyList.length === 0 ? (
          <View style={localStyles.centerBox}>
            <Text style={localStyles.muted}>No donation history found.</Text>
          </View>
        ) : (
          <ScrollView
            style={localStyles.scroll}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {historyList.map((item, i) => (
              <View key={i} style={localStyles.card}>
                <Text style={localStyles.cardTitle}>
                  Location:{" "}
                  <Text style={localStyles.cardTitleStrong}>
                    {item.location}
                  </Text>
                </Text>
                <Text style={localStyles.cardLine}>Time: {item.time}</Text>
                <Text style={localStyles.cardLine}>Status: {item.status}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f6f7", // requested background
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  headerContainer: {
    position: "relative",
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#e53935", // red header
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  menuButton: {
    position: "absolute",
    top: 45,
    left: 20,
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  organizationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#e53935",
  },
  scroll: {
    marginTop: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    width: "100%",
    // subtle shadow/elevation
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    // red accent bar
    borderLeftWidth: 4,
    borderLeftColor: "#e53935",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cardTitleStrong: {
    color: "#e53935",
    fontWeight: "700",
  },
  cardLine: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  centerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  muted: {
    marginTop: 8,
    color: "#666",
  },
});

export default HistoryScreen;
