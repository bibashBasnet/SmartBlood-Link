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

const RequestScreen = ({ navigation }) => {
  const [requestList, setRequestList] = useState([]);
  const { user, setIsForm, setCoordinate } = useContext(Context);
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);

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
      if (Array.isArray(res.data)) setRequestList(res.data);
    } catch (e) {
      alert("RequestScreen: " + e.message);
    }
  }, [API_URL, user?.id]);

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

      <Text style={localStyles.title}>My Request List</Text>

      {/* Request List */}
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
      >
        {requestList.length === 0 ? (
          <View style={localStyles.emptyBox}>
            <Text style={localStyles.emptyText}>No requests found.</Text>
          </View>
        ) : (
          requestList.map((item, i) => (
            <TouchableOpacity key={item._id ?? i} onPress={() => showDetail(i)}>
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
                      Required Unit:{" "}
                      <Text style={localStyles.kvVal}>{item.amount}</Text>
                    </Text>
                    <Text style={localStyles.kv}>
                      Phone No:{" "}
                      <Text style={localStyles.kvVal}>{item.phone}</Text>
                    </Text>
                    <Text style={localStyles.kv}>
                      Email: <Text style={localStyles.kvVal}>{item.email}</Text>
                    </Text>

                    {item.isFresh ? (
                      <Text style={localStyles.kv}>
                        Hospital Name:{" "}
                        <Text style={localStyles.kvVal}>{item.hospital}</Text>
                      </Text>
                    ) : (
                      <TouchableOpacity
                        style={[
                          localStyles.mapbutton,
                          { alignSelf: "center", marginTop: 8 },
                        ]}
                        onPress={() => handlePress(item)}
                      >
                        <Text style={localStyles.mapbuttonText}>Map</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))
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
    backgroundColor: "#f7f6f7", // requested background
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
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
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
  cardTime: {
    fontSize: moderateScale(14),
    color: "#333",
    fontWeight: "600",
  },
  cardPlace: {
    marginTop: 2,
    fontSize: moderateScale(13),
    color: "#666",
  },
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
  statusText: {
    color: "#444",
    fontSize: moderateScale(13),
  },
  statusStrong: {
    color: "#111",
    fontWeight: "700",
  },
  kv: {
    color: "#444",
    marginTop: 6,
    fontSize: moderateScale(13),
  },
  kvVal: {
    color: "#111",
    fontWeight: "600",
  },
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
  mapbutton: {
    backgroundColor: "#e53935",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    width: scale(110),
    height: verticalScale(42),
  },
  mapbuttonText: {
    color: "#ffffff",
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(80),
  },
  emptyText: {
    color: "#666",
    fontSize: moderateScale(14),
  },
});

export default RequestScreen;
