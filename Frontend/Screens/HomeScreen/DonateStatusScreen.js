import React, { useContext, useEffect } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Context } from "../../Context/Context";
import axios from "axios";
import Constants from "expo-constants";

const { width } = Dimensions.get("window");
const API_URL = Constants.expoConfig.extra.apiUrl;

const DonateStatusScreen = ({ navigation }) => {
  const { donate, setIsForm, setDonate, setCoordinate } = useContext(Context);

  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  useEffect(() => {
    setIsForm(false);
  }, []);

  const handlePress = () => {
    setCoordinate({
      latitude: donate.latitude,
      longitude: donate.longitude,
    });
    navigation.navigate("Map", { from: "Donate" });
  };

  const handlePressCancel = async () => {
    try {
      const res = await axios.delete(`${API_URL}/donate/delete`, {
        params: { createdBy: donate.createdBy },
      });
      if (res) {
        setDonate(null);
        setCoordinate({ latitude: 27.6949, longitude: 85.2899 });
        alert(res.data);
        navigation.replace("DonateScreen");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={localStyles.container}>
      {/* Header */}
      <View style={localStyles.headerContainer}>
        <Text style={localStyles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      <TouchableOpacity style={localStyles.menuButton} onPress={showMenu}>
        <Image
          source={require("../../assets/list.png")}
          style={localStyles.menuIcon}
        />
      </TouchableOpacity>

      <Text style={localStyles.title}>My Donation Request</Text>

      <ScrollView
        style={localStyles.scroll}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View>
          <Text style={localStyles.infoText}>Name: {donate?.name}</Text>
          <Text style={localStyles.infoText}>Age: {donate?.age}</Text>
          <Text style={localStyles.infoText}>Gender: {donate?.gender}</Text>
          <Text style={localStyles.infoText}>Address: {donate?.address}</Text>
          <Text style={localStyles.infoText}>Email: {donate?.email}</Text>
          <Text style={localStyles.infoText}>Phone No: {donate?.phone}</Text>
          <Text style={localStyles.infoText}>
            Blood Type: {donate?.bloodGroup}
          </Text>
          <Text style={localStyles.infoText}>
            Emergency Contact No: {donate?.emergencyContact}
          </Text>
        </View>

        <View>
          <Text style={localStyles.infoText}>Weight: {donate?.weight}</Text>
          <Text style={localStyles.infoText}>
            Last Donation Date: {donate?.lastDonationDate}
          </Text>
          <Text style={localStyles.infoText}>
            Allergies: {donate?.allergies}
          </Text>
        </View>

        <Text style={localStyles.infoText}>
          Preferred Time: {donate?.preferredDate}
        </Text>
        <Text style={localStyles.infoText}>Status: {donate?.status}</Text>
        <Text style={localStyles.infoText}>
          Requested BloodBank: {donate?.bloodBankName}
        </Text>

        {/* Buttons */}
        <TouchableOpacity style={localStyles.button} onPress={handlePress}>
          <Text style={localStyles.buttonText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[localStyles.button, localStyles.cancelButton]}
          onPress={handlePressCancel}
        >
          <Text style={localStyles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // White background
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  headerContainer: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#e53935", // Red header
    borderRadius: 8,
    marginTop: 10,
  },
  organizationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // White text
  },
  menuButton: {
    position: "absolute",
    top: 45,
    left: 20,
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  title: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#e53935",
  },
  scroll: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    marginVertical: 4,
    color: "#333",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#e53935", // Red button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: width * 0.9, // Responsive width
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#fff", // White button
    borderWidth: 2,
    borderColor: "#e53935",
  },
  cancelButtonText: {
    color: "#e53935", // Red text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DonateStatusScreen;
