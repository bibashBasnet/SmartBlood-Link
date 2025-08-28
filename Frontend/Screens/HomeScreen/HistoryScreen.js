import React, { useContext, useCallback, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  DrawerActions,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";
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
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();
  const drawerStatus = useDrawerStatus(); // 'open' | 'closed'

  const showMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/donate/get/${user.id}`);
      const data = Array.isArray(res.data) ? res.data : [];
      const doneList = data.filter(
        (item) =>
          String(item?.status || "")
            .trim()
            .toLowerCase() === "done"
      );
      doneList.sort((a, b) => {
        const ta = Date.parse(a?.updatedAt) || 0;
        const tb = Date.parse(b?.updatedAt) || 0;
        return tb - ta; // newest first
      });
      setHistoryList(doneList);
    } catch (e) {
      alert("History List " + (e?.message || "Failed to load"));
    } finally {
      setLoading(false);
    }
  }, [API_URL, user?.id]);

  // Reload every time the screen gains focus
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

  // Optional: reload when drawer closes while this screen is visible
  React.useEffect(() => {
    if (isFocused && drawerStatus === "closed") {
      load();
    }
  }, [drawerStatus, isFocused, load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  return (
    <SafeAreaView style={localStyles.container}>
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
            <Text style={localStyles.muted}>No completed donations yet.</Text>
          </View>
        ) : (
          <ScrollView
            style={localStyles.scroll}
            contentContainerStyle={{ paddingBottom: 24 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {historyList.map((item, i) => (
              <View key={item._id ?? i} style={localStyles.card}>
                <Text style={localStyles.cardTitle}>
                  Location:{item.bloodBankName}
                  <Text style={localStyles.cardTitleStrong}>
                    {item.location}
                  </Text>
                </Text>
                <Text style={localStyles.cardLine}>Time: {new Date(item.updatedAt).toLocaleString()}</Text>
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
    backgroundColor: "#f7f6f7",
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  headerContainer: {
    position: "relative",
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#e53935",
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  menuButton: { position: "absolute", top: 45, left: 20, padding: 8 },
  menuIcon: { width: 24, height: 24, tintColor: "#fff" },
  organizationName: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  title: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#e53935",
  },
  scroll: { marginTop: 6 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#e53935",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cardTitleStrong: { color: "#e53935", fontWeight: "700" },
  cardLine: { fontSize: 14, color: "#555", marginBottom: 2 },
  centerBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  muted: { marginTop: 8, color: "#666" },
});

export default HistoryScreen;
