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
  AppState, // 👈 add
} from "react-native";
import {
  DrawerActions,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native"; // 👈 add
import { styles } from "../../Styles";
import axios from "axios";
import Constants from "expo-constants";
import { Context } from "../../Context/Context";
import { moderateScale, scale, verticalScale } from "../../utils/responsive";

const RequestScreen = ({ navigation }) => {
  const [requestList, setRequestList] = useState([]);
  const { user, setIsForm, setCoordinate, coordinate } = useContext(Context);
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isFocused = useIsFocused(); // 👈 track if this screen is focused
  const appState = useRef(AppState.currentState); // 👈 track app foreground/background

  const handlePress = (item) => {
    setIsForm(false);
    setCoordinate({ latitude: item.latitude, longitude: item.longitude });
    navigation.navigate("Map", { from: "Request" });
  };

  useEffect(() => {
    setIsForm(false);
  }, [setIsForm]);

  // ---- Centralized fetch
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

  // ---- Refetch whenever this screen gains focus (navigate back to it)
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  // ---- Refetch when app returns to foreground while this screen is focused
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

  const showDetail = (i) => {
    setSelectedIndex((prev) => (prev === i ? null : i));
  };

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
        My Request List
      </Text>

      {/* Request List */}
      <ScrollView style={{ maxHeight: 600 }}>
        {requestList.map((item, i) => (
          <TouchableOpacity key={i} onPress={() => showDetail(i)}>
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
                  <Text style={styles.name}>Required Unit: {item.amount}</Text>
                  <Text style={styles.name}>Phone No: {item.phone}</Text>
                  <Text style={styles.name}>Email: {item.email}</Text>
                  <Text style={styles.name}>Required Unit: {item.amount}</Text>
                  {item.isFresh ? (
                    <Text style={styles.name}>
                      Hospital Name: {item.hospital}
                    </Text>
                  ) : (
                    <TouchableOpacity
                      style={localStyles.mapbutton}
                      onPress={() => handlePress(item)}
                    >
                      <Text style={localStyles.mapbuttonText}>Map</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </TouchableOpacity>
        ))}
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
    width: scale(100),
    height: verticalScale(40),
  },
  mapbuttonText: {
    color: "#ffffff",
    fontSize: moderateScale(10),
    fontWeight: "bold",
    alignItems: "center",
  },
});

export default RequestScreen;
