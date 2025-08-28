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
  Alert,
  RefreshControl,
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

// ...imports unchanged...

const ACCEPTED_STATUS = "On The Way";

const Delivery = ({ navigation }) => {
  const [requestList, setRequestList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [acceptedFilterId, setAcceptedFilterId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { user, setIsForm, setCoordinate } = useContext(Context);
  const API_URL = Constants.expoConfig.extra.apiUrl;

  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);
  const mountedRef = useRef(true);

  const getId = (it) => it?.id ?? it?._id;

  const handlePress = (item) => {
    setIsForm(false);
    setCoordinate({ latitude: item.latitude, longitude: item.longitude });
    navigation.navigate("Map", { from: "delivery" });
  };

  const handleAccept = async (item) => {
    try {
      const requestId = getId(item);
      const deliveryId = item._deliveryId;
      if (!requestId) throw new Error("No request id on item");
      if (!deliveryId) throw new Error("No delivery id for this request");

      setAcceptedFilterId(requestId);

      // 1) link driver to delivery
      await axios.patch(`${API_URL}/delivery/${deliveryId}`, {
        driver_id: user.id,
      });

      // 2) update request status
      await axios.patch(`${API_URL}/requests/update/${requestId}`, {
        status: ACCEPTED_STATUS,
        acceptedBy: user.id,
      });

      await load();
    } catch (err) {
      Alert.alert("Update failed", err?.message || String(err));
    }
  };

  const handleDone = async (item) => {
    try {
      const requestId = getId(item);
      if (!requestId) throw new Error("No request id on item");

      await axios.patch(`${API_URL}/requests/update/${requestId}`, {
        status: "Done",
      });

      setRequestList((prev) => prev.filter((r) => getId(r) !== requestId));
      setAcceptedFilterId(null);
      await load();
    } catch (err) {
      Alert.alert("Update failed", err?.message || String(err));
    }
  };

  const handleCancel = async (item) => {
    try {
      const requestId = getId(item);
      const deliveryId = item._deliveryId;
      if (!requestId) throw new Error("No request id on item");

      if (deliveryId) {
        await axios.patch(`${API_URL}/delivery/${deliveryId}`, {
          driver_id: "",
        });
      }

      // 🔁 revert to Pending
      await axios.patch(`${API_URL}/requests/update/${requestId}`, {
        status: "Pending",
        acceptedBy: "",
      });

      setAcceptedFilterId(null);
      await load();
    } catch (err) {
      Alert.alert("Cancel failed", err?.message || String(err));
    }
  };

  useEffect(() => {
    setIsForm(false);
    return () => {
      mountedRef.current = false;
    };
  }, [setIsForm]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);
  const load = useCallback(async () => {
    let isActive = true;
    try {
      const { data: deliveries } = await axios.get(`${API_URL}/delivery`);
      if (!Array.isArray(deliveries) || deliveries.length === 0) {
        if (isActive) setRequestList([]);
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

          const deliveryRow = deliveries[idx] || {};
          const deliveryId = deliveryRow.id ?? deliveryRow._id; // 👈 robust id

          return {
            ...data,
            _deliveryId: deliveryId,
            _deliveryDriverId: deliveryRow?.driver_id,
          };
        })
        .filter(Boolean);

      const activeRequests = allRequests.filter(
        (r) => String(r.status || "").toLowerCase() !== "done"
      );

      const finalList = acceptedFilterId
        ? activeRequests.filter((r) => (r.id ?? r._id) === acceptedFilterId)
        : activeRequests;

      finalList.sort((a, b) => new Date(b.time) - new Date(a.time));
      if (isActive) setRequestList(finalList);
    } catch (e) {
      if (isActive) alert("Delivery: " + (e?.message || "Failed to load"));
    }
    return () => {
      isActive = false;
    };
  }, [API_URL, acceptedFilterId]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

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
  const showDetail = (i) => setSelectedIndex((prev) => (prev === i ? null : i));

  return (
    <SafeAreaView style={localStyles.container}>
      {/* Header with embedded menu button */}
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

      <Text style={localStyles.title}>Delivery Orders</Text>

      {/* Request List */}
      <View style={{ flex: 1, width: "100%" }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {requestList.map((item, i) => (
            <TouchableOpacity
              key={getId(item) ?? i}
              onPress={() => showDetail(i)}
            >
              <View style={localStyles.card}>
                <Text style={localStyles.cardTime}>{item.time}</Text>
                <Text style={localStyles.cardPlace}>{item.location}</Text>

                <View style={localStyles.detailsRow}>
                  <View style={localStyles.bloodTypeBox}>
                    <Text style={localStyles.bloodTypeText}>{item.type}</Text>
                  </View>
                  <Text style={localStyles.statusText}>
                    Status:{" "}
                    <Text style={localStyles.statusStrong}>{item.status}</Text>
                  </Text>
                </View>

                {selectedIndex === i && (
                  <>
                    <Text style={localStyles.kv}>
                      Phone No:{" "}
                      <Text style={localStyles.kvVal}>{item.phone}</Text>
                    </Text>
                    <Text style={localStyles.kv}>
                      Email: <Text style={localStyles.kvVal}>{item.email}</Text>
                    </Text>
                    <Text style={localStyles.kv}>
                      Required Unit:{" "}
                      <Text style={localStyles.kvVal}>{item.amount}</Text>
                    </Text>

                    <TouchableOpacity
                      style={[
                        localStyles.mapbutton,
                        { alignSelf: "center", marginTop: 6 },
                      ]}
                      onPress={() => handlePress(item)}
                    >
                      <Text style={localStyles.mapbuttonText}>Map</Text>
                    </TouchableOpacity>

                    {acceptedFilterId && getId(item) === acceptedFilterId ? (
                      <View style={localStyles.btnRow}>
                        <TouchableOpacity
                          style={[localStyles.btn, localStyles.btnOutline]}
                          onPress={() => handleCancel(item)}
                        >
                          <Text style={localStyles.btnTextOutline}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[localStyles.btn, localStyles.btnPrimary]}
                          onPress={() => handleDone(item)}
                        >
                          <Text style={localStyles.btnTextPrimary}>Done</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={[localStyles.btn, localStyles.btnPrimary]}
                        onPress={() => handleAccept(item)}
                      >
                        <Text style={localStyles.btnTextPrimary}>Accept</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {requestList.length === 0 && (
            <View style={{ padding: 16 }}>
              <Text style={{ textAlign: "center", color: "#666" }}>
                {acceptedFilterId
                  ? "This order is no longer available."
                  : "No deliveries found."}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
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
  cardTime: { fontSize: moderateScale(14), color: "#333", fontWeight: "600" },
  cardPlace: { marginTop: 2, fontSize: moderateScale(13), color: "#666" },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  bloodTypeBox: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: 6,
    backgroundColor: "#fdecec",
  },
  bloodTypeText: {
    color: "#e53935",
    fontWeight: "700",
    fontSize: moderateScale(12),
  },
  statusText: { color: "#444", fontSize: moderateScale(13) },
  statusStrong: { color: "#111", fontWeight: "700" },
  kv: { color: "#444", marginTop: 6, fontSize: moderateScale(13) },
  kvVal: { color: "#111", fontWeight: "600" },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 12,
  },
  btn: {
    flexGrow: 1,
    minWidth: scale(110),
    height: verticalScale(44),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(14),

    // light shadow for iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    // elevation for Android
    elevation: 2,
  },
  btnPrimary: {
    backgroundColor: "#e53935",
    borderWidth: 0,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e53935",
  },
  btnTextPrimary: {
    color: "#fff",
    fontWeight: "800",
    fontSize: moderateScale(13),
    letterSpacing: 0.3,
  },
  btnTextOutline: {
    color: "#e53935",
    fontWeight: "800",
    fontSize: moderateScale(13),
    letterSpacing: 0.3,
  },
  mapbutton: {
    alignSelf: "stretch",
    marginTop: 8,
  },
});

export default Delivery;
