import React, { useCallback, useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from "react-native";
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";
import axios from "axios";
import { Context } from "../../Context/Context";

const { width } = Dimensions.get("window");

const RequestListScreen = ({ navigation }) => {
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const { setIsForm, user } = useContext(Context);

  const [requestList, setRequestList] = useState([]);
  const [displayList, setDisplayList] = useState([]); // full list
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [acceptedFilterId, setAcceptedFilterId] = useState(null); // show-only accepted

  const getId = (it) => it?.id ?? it?._id;

  const visibleList = acceptedFilterId
    ? requestList.filter((r) => getId(r) === acceptedFilterId)
    : displayList;

  useFocusEffect(
    useCallback(() => {
      setIsForm(false);
    }, [setIsForm])
  );

  const load = useCallback(async () => {
    try {
      if (!user?.address) return;
      const parts = user.address.split(",");
      const locationParam = parts[1]?.trim() || "";
      const res = await axios.get(
        `${API_URL}/requests/getRequestList/${locationParam}`
      );
      if (Array.isArray(res.data)) {
        setRequestList(res.data);
        setDisplayList(res.data);
      }
    } catch (e) {
      Alert.alert("RequestList Error", e.message);
    }
  }, [API_URL, user?.address]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await load();
      })();
    }, [load])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const showDetail = (i) => {
    setSelectedIndex((prev) => (prev === i ? null : i));
  };

  const handleAccept = async (item) => {
    try {
      const id = getId(item);
      await axios.patch(`${API_URL}/requests/update/${id}`, {
        status: "Accepted",
        acceptedBy: user.id,
      });
      setAcceptedFilterId(id);
      await load();
    } catch (err) {
      Alert.alert("Update failed", err.message);
    }
  };

  const handleCancel = async (item) => {
    try {
      const id = getId(item);
      await axios.patch(`${API_URL}/requests/update/${id}`, {
        status: "Pending",
        acceptedBy: null,
      });
      setAcceptedFilterId(null);
      await load();
    } catch (err) {
      Alert.alert("Cancel failed", err.message);
    }
  };

  const showMenu = () => navigation.dispatch(DrawerActions.openDrawer());

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

      <Text style={localStyles.pageTitle}>Blood Request List</Text>

      <View style={{ flex: 1, width: "100%" }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {visibleList.map((item, i) => {
            const id = getId(item);
            const isAcceptedByMe =
              item?.status === "Accepted" && item?.acceptedBy === user.id;

            return (
              <TouchableOpacity key={`${id ?? i}`} onPress={() => showDetail(i)}>
                <View style={localStyles.card}>
                  <View style={localStyles.cardHeaderRow}>
                    <Text style={localStyles.cardName}>{item.name}</Text>
                    <View
                      style={[
                        localStyles.badge,
                        isAcceptedByMe
                          ? localStyles.badgeAccepted
                          : localStyles.badgePending,
                      ]}
                    >
                      <Text style={localStyles.badgeText}>
                        {item?.status ?? "Pending"}
                      </Text>
                    </View>
                  </View>

                  <Text style={localStyles.cardSub}>{item.time}</Text>

                  <View style={localStyles.detailsRow}>
                    <View style={localStyles.bloodTypeBox}>
                      <Text style={localStyles.bloodTypeText}>{item.type}</Text>
                    </View>
                    <Text style={localStyles.placeText}>{item.location}</Text>
                  </View>

                  {selectedIndex === i && (
                    <View style={{ marginTop: 12 }}>
                      <Text style={localStyles.kv}>
                        Phone: <Text style={localStyles.kvVal}>{item.phone}</Text>
                      </Text>
                      <Text style={localStyles.kv}>
                        Email: <Text style={localStyles.kvVal}>{item.email}</Text>
                      </Text>
                      <Text style={localStyles.kv}>
                        Hospital:{" "}
                        <Text style={localStyles.kvVal}>{item.hospital}</Text>
                      </Text>

                      <View style={localStyles.btnRow}>
                        {isAcceptedByMe ? (
                          <TouchableOpacity
                            style={[localStyles.btn, localStyles.btnOutline]}
                            onPress={() => handleCancel(item)}
                          >
                            <Text style={[localStyles.btnTextOutline]}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={[localStyles.btn, localStyles.btnPrimary]}
                            onPress={() => handleAccept(item)}
                          >
                            <Text style={localStyles.btnTextPrimary}>
                              Accept
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {acceptedFilterId && (
            <View style={{ alignItems: "center", paddingTop: 6 }}>
              <TouchableOpacity onPress={() => setAcceptedFilterId(null)}>
                <Text style={localStyles.linkText}>Show all requests</Text>
              </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  pageTitle: {
    marginTop: 14,
    marginBottom: 6,
    fontSize: 20,
    fontWeight: "bold",
    color: "#e53935",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    // subtle depth
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    // brand accent
    borderLeftWidth: 4,
    borderLeftColor: "#e53935",
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    maxWidth: width * 0.58,
  },
  cardSub: {
    marginTop: 2,
    color: "#666",
    fontSize: 13,
  },
  detailsRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bloodTypeBox: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#fdecec",
  },
  bloodTypeText: {
    color: "#e53935",
    fontWeight: "700",
    fontSize: 12,
  },
  placeText: {
    color: "#444",
    fontSize: 14,
    flexShrink: 1,
  },
  kv: {
    color: "#444",
    marginBottom: 4,
  },
  kvVal: {
    color: "#111",
    fontWeight: "600",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },
  btn: {
    minWidth: 110,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: {
    backgroundColor: "#e53935",
  },
  btnTextPrimary: {
    color: "#fff",
    fontWeight: "700",
  },
  btnOutline: {
    borderWidth: 2,
    borderColor: "#e53935",
    backgroundColor: "#fff",
  },
  btnTextOutline: {
    color: "#e53935",
    fontWeight: "700",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeAccepted: {
    backgroundColor: "#fdecec",
  },
  badgePending: {
    backgroundColor: "#f0f0f0",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#e53935",
  },
  linkText: {
    color: "#e53935",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});

export default RequestListScreen;
