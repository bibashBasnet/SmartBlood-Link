import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  AppState,
} from "react-native";
import {
  DrawerActions,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import { Context } from "../../Context/Context";
import { moderateScale, scale, verticalScale } from "../../utils/responsive";

const DeliveryHistory = ({ navigation }) => {
  const [requestList, setRequestList] = useState([]);
  const { user } = useContext(Context);
  const API_URL = Constants.expoConfig.extra.apiUrl;

  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);

  const getId = (it) => it?.id ?? it?._id;

  // ---- Centralized fetch
  const load = useCallback(async () => {
    try {
      const { data: deliveries } = await axios.get(
        `${API_URL}/delivery/driver/${user.id}`
      );
      if (!Array.isArray(deliveries) || deliveries.length === 0) {
        setRequestList([]);
        return;
      }

      const results = await Promise.allSettled(
        deliveries.map((d) => axios.get(`${API_URL}/requests/${d.request_id}`))
      );

      const allRequests = results
        .map((res, idx) => {
          if (res.status !== "fulfilled") return null;
          let data = res.value?.data;
          if (Array.isArray(data)) data = data[0] ?? null;
          if (!data) return null;
          return {
            ...data,
            _deliveryId: deliveries[idx]?.id,
            _deliveryDriverId: deliveries[idx]?.driver_id,
          };
        })
        .filter(Boolean);

      // only completed ones
      const completed = allRequests.filter(
        (r) => String(r.status || "").toLowerCase() === "done"
      );

      // newest first
      completed.sort((a, b) => new Date(b.time) - new Date(a.time));
      setRequestList(completed);
    } catch (e) {
      alert("DeliveryHistory: " + (e?.message || "Failed to load"));
    }
  }, [API_URL, user?.id]);

  // Refetch on focus
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  // Refetch when app returns to foreground
  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState) => {
      const wasBackground = appState.current.match(/inactive|background/);
      appState.current = nextState;
      if (wasBackground && nextState === "active" && isFocused) {
        load();
      }
    });
    return () => sub.remove();
  }, [isFocused, load]);

  const showMenu = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <SafeAreaView style={localStyles.container}>
      {/* Header */}
      <View style={localStyles.headerContainer}>
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
        <Text style={localStyles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      <Text style={localStyles.title}>Delivery History</Text>

      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
      >
        {requestList.length === 0 ? (
          <View style={localStyles.emptyBox}>
            <Text style={localStyles.emptyText}>
              No completed deliveries yet.
            </Text>
          </View>
        ) : (
          requestList.map((item, i) => (
            <View key={getId(item) ?? i} style={localStyles.card}>
              <Text style={localStyles.cardLine}>
                Request ID: <Text style={localStyles.cardStrong}>{getId(item)}</Text>
              </Text>
              <Text style={localStyles.cardLine}>Time: {item.time}</Text>
              <Text style={localStyles.cardLine}>Location: {item.location}</Text>
              <Text style={localStyles.cardLine}>
                Status: <Text style={{ color: "#e53935" }}>{item.status}</Text>
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f6f7",
    alignItems: "center",
    paddingVertical: 30,
  },
  headerContainer: {
    position: "relative",
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#e53935",
    borderRadius: 8,
    marginTop: 10,
    width: "94%",
  },
  menuButton: {
    position: "absolute",
    left: 12,
    top: "100%",
    transform: [{ translateY: -12 }],
    zIndex: 2,
  },
  menuIcon: { width: 24, height: 24, tintColor: "#fff" },
  organizationName: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    marginTop: 14,
    marginBottom: 6,
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "#e53935",
    textAlign: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: verticalScale(12),
    marginBottom: verticalScale(10),
    borderLeftWidth: 4,
    borderLeftColor: "#e53935",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLine: { fontSize: moderateScale(13), color: "#444", marginBottom: 4 },
  cardStrong: { fontWeight: "700", color: "#111" },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(80),
  },
  emptyText: { color: "#666", fontSize: moderateScale(14) },
});

export default DeliveryHistory;
