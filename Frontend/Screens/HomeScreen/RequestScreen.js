import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
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
  RefreshControl,
  Alert,
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

// -------- helpers (JS only; no types) --------
const statusRank = (s) => {
  const k = String(s || "")
    .trim()
    .toLowerCase();
  if (k === "pending") return 0;
  if (k === "accepted" || k === "on the way") return 1;
  if (k === "done" || k === "completed") return 2;
  return 9;
};
const safeParse = (v) => {
  const t = Date.parse(v);
  return Number.isNaN(t) ? 0 : t;
};
const byStatusThenTime = (a, b) => {
  const r = statusRank(a.status) - statusRank(b.status);
  if (r !== 0) return r;
  return safeParse(b.time) - safeParse(a.time); // newest first
};
const statusClass = (s) => {
  const k = String(s || "")
    .trim()
    .toLowerCase();
  if (k === "pending") return "pending";
  if (k === "accepted" || k === "on the way") return "active";
  if (k === "done" || k === "completed") return "done";
  return "pending";
};

const RequestScreen = ({ navigation }) => {
  const [requestList, setRequestList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { user, setIsForm, setCoordinate } = useContext(Context);
  const API_URL = Constants.expoConfig.extra.apiUrl;

  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);

  const getId = (it) => it?.id ?? it?._id;

  const handlePress = (item) => {
    setIsForm(false);
    setCoordinate({ latitude: item.latitude, longitude: item.longitude });
    navigation.navigate("Map", { from: "Request" });
  };

  useEffect(() => {
    setIsForm(false);
  }, [setIsForm]);

  const load = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/requests/getRequest`, {
        params: { id: user.id },
      });
      if (Array.isArray(res.data)) {
        const sorted = [...res.data].sort(byStatusThenTime);
        setRequestList(sorted);
      } else {
        setRequestList([]);
      }
    } catch (e) {
      Alert.alert("RequestScreen", e?.message || "Failed to load");
    }
  }, [API_URL, user?.id]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await load();
        setSelectedId(null);
      })();
    }, [load])
  );

  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState) => {
      const wasBackground = appState.current.match(/inactive|background/);
      appState.current = nextState;
      if (wasBackground && nextState === "active" && isFocused) {
        load();
        setSelectedId(null);
      }
    });
    return () => sub.remove();
  }, [isFocused, load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const showMenu = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const toggleDetail = (item) => {
    const id = getId(item);
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // Keep sorted at render time too
  const listToRender = useMemo(() => {
    return [...requestList].sort(byStatusThenTime);
  }, [requestList]);

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

      <Text style={localStyles.title}>My Request List</Text>

      {/* Request List */}
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {listToRender.length === 0 ? (
          <View style={localStyles.emptyBox}>
            <Text style={localStyles.emptyText}>No requests found.</Text>
          </View>
        ) : (
          listToRender.map((item, i) => {
            const id = getId(item);
            const cls = statusClass(item.status);
            return (
              <TouchableOpacity
                key={id ?? i}
                onPress={() => toggleDetail(item)}
              >
                <View style={localStyles.card}>
                  {/* Header row: time + status chip */}
                  <View style={localStyles.cardHeaderRow}>
                    <Text style={localStyles.cardTime}>{item.time}</Text>
                    <View
                      style={[
                        localStyles.badge,
                        cls === "pending"
                          ? localStyles.badgePending
                          : cls === "done"
                          ? localStyles.badgeDone
                          : localStyles.badgeActive,
                      ]}
                    >
                      <Text style={localStyles.badgeText}>
                        {item.status ?? "Pending"}
                      </Text>
                    </View>
                  </View>

                  {/* Location */}
                  <Text style={localStyles.cardPlace}>{item.location}</Text>

                  {/* Quick facts */}
                  <View style={localStyles.detailsRow}>
                    <View style={localStyles.bloodTypeBox}>
                      <Text style={localStyles.bloodTypeText}>
                        {item.type ?? "--"}
                      </Text>
                    </View>
                  </View>

                  {/* Expanded details */}
                  {selectedId === id && (
                    <View style={{ marginTop: 8 }}>
                      <Text style={localStyles.kv}>
                        Required Unit:{" "}
                        <Text style={localStyles.kvVal}>{item.amount}</Text>
                      </Text>
                      <Text style={localStyles.kv}>
                        Phone No:{" "}
                        <Text style={localStyles.kvVal}>{item.phone}</Text>
                      </Text>
                      <Text style={localStyles.kv}>
                        Email:{" "}
                        <Text style={localStyles.kvVal}>{item.email}</Text>
                      </Text>

                      {item.isFresh ? (
                        <Text style={localStyles.kv}>
                          Hospital Name:{" "}
                          <Text style={localStyles.kvVal}>{item.hospital}</Text>
                        </Text>
                      ) : (
                        <TouchableOpacity
                          style={[
                            localStyles.btn,
                            localStyles.btnPrimary,
                            { marginTop: 8, alignSelf: "flex-start" },
                          ]}
                          onPress={() => handlePress(item)}
                        >
                          <Text style={localStyles.btnTextPrimary}>
                            Open Map
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Floating + Button */}
      <TouchableOpacity
        style={localStyles.fab}
        onPress={() => navigation.navigate("BloodRequestForm")}
      >
        <Image
          source={require("../../assets/plus.png")}
          style={{ width: 30, height: 30, tintColor: "white" }}
        />
      </TouchableOpacity>
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
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cardTime: { fontSize: moderateScale(14), color: "#333", fontWeight: "700" },
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

  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  badgePending: { backgroundColor: "#f0f0f0" },
  badgeActive: { backgroundColor: "#fdecec" },
  badgeDone: { backgroundColor: "#e8f5e9" },
  badgeText: {
    fontSize: moderateScale(12),
    fontWeight: "800",
    color: "#e53935",
  },

  kv: { color: "#444", marginTop: 6, fontSize: moderateScale(13) },
  kvVal: { color: "#111", fontWeight: "700" },

  btn: {
    minWidth: scale(110),
    height: verticalScale(44),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(14),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  btnPrimary: { backgroundColor: "#e53935" },
  btnTextPrimary: {
    color: "#fff",
    fontWeight: "800",
    fontSize: moderateScale(13),
    letterSpacing: 0.3,
  },

  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(80),
  },
  emptyText: { color: "#666", fontSize: moderateScale(14) },

  fab: {
    position: "absolute",
    bottom: verticalScale(40),
    right: scale(30),
    backgroundColor: "#e53935",
    width: scale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default RequestScreen;
