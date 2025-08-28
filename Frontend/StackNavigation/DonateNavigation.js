import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DonateStatusScreen from "../Screens/HomeScreen/DonateStatusScreen";
import DonateScreen from "../Screens/HomeScreen/DonateScreen";
import MapScreen from "../Screens/HomeScreen/MapScreen";
import Constants from "expo-constants";
import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { ActivityIndicator, View } from "react-native";
import axios from "axios";

const Stack = createNativeStackNavigator();

const DonateNavigation = () => {
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const { setDonate, user, setCoordinate } = useContext(Context);
  const [initRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  const norm = (s) =>
    String(s || "")
      .trim()
      .toLowerCase();
  const toTs = (v) => {
    const t = Date.parse(v);
    return Number.isNaN(t) ? 0 : t;
  };

  useEffect(() => {
    let mounted = true;

    const fetchDonate = async () => {
      try {
        if (!user?.id) {
          if (mounted) setInitialRoute("DonateScreen");
          return;
        }

        const res = await axios.get(`${API_URL}/donate/get/${user.id}`);
        const payload = res?.data;
        const list = Array.isArray(payload)
          ? payload
          : payload
          ? [payload]
          : [];

        const pendingOrApproved = list
          .filter(
            (d) => norm(d.status) === "pending" || norm(d.status) === "approved"
          )
          .sort(
            (a, b) =>
              (toTs(b.updatedAt) || toTs(b.time)) -
              (toTs(a.updatedAt) || toTs(a.time))
          )[0];

        if (!mounted) return;

        if (pendingOrApproved) {
          setDonate(pendingOrApproved);
          if (pendingOrApproved.latitude && pendingOrApproved.longitude) {
            setCoordinate({
              latitude: pendingOrApproved.latitude,
              longitude: pendingOrApproved.longitude,
            });
          }
          setInitialRoute("DonateStatusScreen");
        } else {
          setInitialRoute("DonateScreen");
        }
      } catch (e) {
        console.error("🚨 Fetch error:", e?.message || e);
        if (mounted) setInitialRoute("DonateScreen");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDonate();
    return () => {
      mounted = false;
    };
  }, [API_URL, user?.id, setDonate, setCoordinate]);

  if (loading || !initRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#c62828" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      key={`${initRoute}-${user?.id || "anon"}`}
      initialRouteName={initRoute}
    >
      <Stack.Screen
        name="DonateStatusScreen"
        component={DonateStatusScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Stack.Screen
        name="DonateScreen"
        component={DonateScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
};

export default DonateNavigation;
