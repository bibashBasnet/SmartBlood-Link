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
} from "react-native";
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import { styles } from "../../Styles";
import Constants from "expo-constants";
import axios from "axios";
import { Context } from "../../Context/Context";

const RequestListScreen = ({ navigation }) => {
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const { setIsForm, user } = useContext(Context);

  const [requestList, setRequestList] = useState([]);
  const [displayList, setDisplayList] = useState([]); // keeps the "full" list for normal mode
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // NEW: when set, we only show this accepted request
  const [acceptedFilterId, setAcceptedFilterId] = useState(null);

  const getId = (it) => it?.id ?? it?._id;

  // derive what's visible: either the accepted one or the normal list
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

  // ACCEPT -> set server fields, then show only that request (filter by id)
  const handleAccept = async (item) => {
    try {
      const id = getId(item);
      await axios.patch(`${API_URL}/requests/update/${id}`, {
        status: "Accepted",
        acceptedBy: user.id, // or whatever you store (email/_id)
      });
      setAcceptedFilterId(id); // show only this one
      await load(); // refresh data from server
    } catch (err) {
      Alert.alert("Update failed", err.message);
    }
  };

  // CANCEL -> revert status & acceptedBy, clear filter so full list shows
  const handleCancel = async (item) => {
    try {
      const id = getId(item);
      await axios.patch(`${API_URL}/requests/update/${id}`, {
        status: "Pending",
        acceptedBy: null,
      });
      setAcceptedFilterId(null); // back to full list
      await load();
    } catch (err) {
      Alert.alert("Cancel failed", err.message);
    }
  };

  const showMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <SafeAreaView style={styles.container}>
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
        Blood Request List
      </Text>

      <View style={{ flex: 1, marginHorizontal: 10, maxHeight: 670 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {visibleList.map((item, i) => {
            const id = getId(item);
            const isAcceptedByMe =
              item?.status === "Accepted" && item?.acceptedBy === user.id;

            return (
              <TouchableOpacity
                key={`${id ?? i}`}
                onPress={() => showDetail(i)}
              >
                <View style={styles.card}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.date}>{item.time}</Text>
                  <View style={styles.detailsRow}>
                    <View style={styles.bloodTypeBox}>
                      <Text style={styles.bloodTypeText}>{item.type}</Text>
                    </View>
                    <Text style={styles.place}>{item.location}</Text>
                  </View>

                  {selectedIndex === i && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={styles.historyListLabel}>
                        Phone No:{" "}
                        <Text style={styles.historyListValue}>
                          {item.phone}
                        </Text>
                      </Text>
                      <Text style={styles.historyListLabel}>
                        Email:{" "}
                        <Text style={styles.historyListValue}>
                          {item.email}
                        </Text>
                      </Text>
                      <Text style={styles.historyListLabel}>
                        Hospital Name:{" "}
                        <Text style={styles.historyListValue}>
                          {item.hospital}
                        </Text>
                      </Text>

                      <View style={styles.historyListButtonContainer}>
                        {isAcceptedByMe ? (
                          <TouchableOpacity
                            style={[
                              styles.historyListButton,
                              /* optionally a different style for cancel */
                              styles.historyListAcceptButton,
                            ]}
                            onPress={() => handleCancel(item)}
                          >
                            <Text style={styles.historyListButtonText}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={[
                              styles.historyListButton,
                              styles.historyListAcceptButton,
                            ]}
                            onPress={() => handleAccept(item)}
                          >
                            <Text style={styles.historyListButtonText}>
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
        </ScrollView>

        {/* Optional: quick way to exit the filter without canceling */}
        {acceptedFilterId && (
          <View style={{ alignItems: "center", paddingVertical: 8 }}>
            <TouchableOpacity onPress={() => setAcceptedFilterId(null)}>
              <Text style={{ textDecorationLine: "underline" }}>
                Show all requests
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default RequestListScreen;
