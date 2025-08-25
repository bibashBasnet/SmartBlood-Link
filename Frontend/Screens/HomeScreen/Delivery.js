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
} from "react-native";
import {
  DrawerActions,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import { styles } from "../../Styles";
import axios from "axios";
import Constants from "expo-constants";
import { Context } from "../../Context/Context";
import { moderateScale, scale, verticalScale } from "../../utils/responsive";

const ACCEPTED_STATUS = "On The Way";

const Delivery = ({ navigation }) => {
  const [requestList, setRequestList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // NEW: track the single accepted item to filter the list after Accept
  const [acceptedFilterId, setAcceptedFilterId] = useState(null);

  const { user, setIsForm, setCoordinate } = useContext(Context);
  const API_URL = Constants.expoConfig.extra.apiUrl;

  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);
  const mountedRef = useRef(true);

  const handlePress = (item) => {
    setIsForm(false);
    setCoordinate({ latitude: item.latitude, longitude: item.longitude });
    navigation.navigate("Map", { from: "delivery" });
  };

  // Accept -> set filter to only this order + update backend
  const getId = (it) => it?.id ?? it?._id;

  const handleAccept = async (item) => {
    try {
      const requestId = getId(item);
      const deliveryId = item._deliveryId;
      if (!requestId) throw new Error("No request id on item");
      if (!deliveryId) throw new Error("No delivery id for this request");

      // Instantly filter UI to *only* this order
      setAcceptedFilterId(requestId);

      // 1) Update delivery → set driver_id
      await axios.patch(`${API_URL}/delivery/${deliveryId}`, {
        driver_id: user.id,
      });

      // 2) Update request → set accepted status + acceptedBy
      await axios.patch(`${API_URL}/requests/update/${requestId}`, {
        status: "On The Way",
        acceptedBy: user.id,
      });

      await load(); // refresh (still filtered to this order)
    } catch (err) {
      Alert.alert("Update failed", err?.message || String(err));
    }
  };

  const handleCancel = async (item) => {
    try {
      const requestId = getId(item);
      const deliveryId = item._deliveryId;
      if (!requestId) throw new Error("No request id on item");

      // 1) Clear driver on delivery (if we know it)
      if (deliveryId) {
        await axios.patch(`${API_URL}/delivery/${deliveryId}`, {
          driver_id: "",
        });
      }

      // 2) Revert request back to pending
      await axios.patch(`${API_URL}/requests/update/${requestId}`, {
        status: "Accepted",
        acceptedBy: "",
      });

      // Show all orders again
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

  // ---- Centralized fetch
  const load = useCallback(async () => {
    let isActive = true;

    try {
      // 1) Fetch deliveries
      const { data: deliveries } = await axios.get(`${API_URL}/delivery`);
      if (!Array.isArray(deliveries) || deliveries.length === 0) {
        if (isActive) setRequestList([]);
        return;
      }

      // 2) Fetch each linked request in parallel
      const results = await Promise.allSettled(
        deliveries.map((d) => axios.get(`${API_URL}/requests/${d.request_id}`))
      );

      // 3) Normalize and attach the deliveryId to each request row
      const allRequests = results
        .map((res, idx) => {
          if (res.status !== "fulfilled") return null;
          let data = res.value?.data;
          if (Array.isArray(data)) data = data[0] ?? null;
          if (!data) return null;
          return {
            ...data,
            _deliveryId: deliveries[idx]?.id, // 👈 link to delivery
            _deliveryDriverId: deliveries[idx]?.driver_id,
          };
        })
        .filter(Boolean);

      // 4) If user accepted one, show only that; else show all
      const finalList = acceptedFilterId
        ? allRequests.filter((r) => (r.id ?? r._id) === acceptedFilterId)
        : allRequests;

      // 5) Sort latest first
      finalList.sort((a, b) => new Date(b.time) - new Date(a.time));

      if (isActive) setRequestList(finalList);
    } catch (e) {
      if (isActive) alert("RequestScreen: " + (e?.message || "Failed to load"));
    }

    return () => {
      isActive = false;
    };
  }, [API_URL, acceptedFilterId]);

  // Refetch on focus
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  // Refetch when app returns to foreground while focused
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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
        <Image
          source={require("../../assets/list.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      <Text style={[styles.historyTitle, { marginTop: 50 }]}>
        Delivery Orders
      </Text>

      {/* Request List */}
      <ScrollView style={{ maxHeight: 600 }}>
        {requestList.map((item, i) => (
          <TouchableOpacity
            key={getId(item) ?? i}
            onPress={() => showDetail(i)}
          >
            <View style={styles.card}>
              <Text style={styles.name}>{item.time}</Text>
              <Text style={styles.date}>{item.location}</Text>
              <View style={styles.detailsRow}>
                <View style={styles.bloodTypeBox}>
                  <Text style={styles.bloodTypeText}>{item.type}</Text>
                </View>
                <Text style={styles.name}>Status: {item.status}</Text>
              </View>

              {selectedIndex === i && (
                <>
                  <Text style={styles.name}>Phone No: {item.phone}</Text>
                  <Text style={styles.name}>Email: {item.email}</Text>
                  <Text style={styles.name}>Required Unit: {item.amount}</Text>

                  <TouchableOpacity
                    style={localStyles.mapbutton}
                    onPress={() => handlePress(item)}
                  >
                    <Text style={localStyles.mapbuttonText}>Map</Text>
                  </TouchableOpacity>

                  {/* Accept when no filter; Cancel when filtered to this order */}
                  {acceptedFilterId && getId(item) === acceptedFilterId ? (
                    <TouchableOpacity
                      style={localStyles.mapbutton}
                      onPress={() => handleCancel(item)}
                    >
                      <Text style={localStyles.mapbuttonText}>Cancel</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={localStyles.mapbutton}
                      onPress={() => handleAccept(item)}
                    >
                      <Text style={localStyles.mapbuttonText}>Accept</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {requestList.length === 0 && (
          <View style={{ padding: 16 }}>
            <Text style={{ textAlign: "center" }}>
              {acceptedFilterId
                ? "This order is no longer available."
                : "No deliveries found."}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  mapbutton: {
    backgroundColor: "#e53935",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    width: scale(100),
    height: verticalScale(40),
    marginTop: verticalScale(5),
  },
  cancelButton: {
    backgroundColor: "#616161",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    width: scale(100),
    height: verticalScale(40),
    marginTop: verticalScale(5),
  },
  mapbuttonText: {
    color: "#ffffff",
    fontSize: moderateScale(10),
    fontWeight: "bold",
    alignItems: "center",
  },
});

export default Delivery;
