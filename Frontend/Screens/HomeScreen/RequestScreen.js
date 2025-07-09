import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import logo from "../../assets/logo.png";
import { styles } from "../../Styles";
import axios from "axios";
import Constants from "expo-constants";
import { Context } from "../../Context/Context";
import { ScrollView } from "react-native-gesture-handler";

const RequestScreen = ({ navigation }) => {
  const [requestList, setRequestList] = useState([]);
  const { user, setIsForm } = useContext(Context);
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePress = () => {
    setIsForm(false);
    navigation.navigate("Map", { from: "Request" });
  };
  useEffect(() => {
    setIsForm(false);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/requests/getRequest`, {
        params: { id: user.id },
      })
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setRequestList(res.data);
        }
      })
      .catch((e) => {
        alert("RequestScreen: " + e.message);
      });
  }, []);

  const showMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const showDetail = (i) => {
    setSelectedIndex(selectedIndex === i ? null : i);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.logo} />
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
                  {item.isFresh && (
                    <Text style={styles.name}>
                      Hospital Name: {item.hospital}
                    </Text>
                  )}
                  {!item.isFresh && (
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handlePress}
                    >
                      <Text style={styles.submitButtonText}>Map</Text>
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
    bottom: 60,
    right: 30,
    backgroundColor: "#e53935",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default RequestScreen;
