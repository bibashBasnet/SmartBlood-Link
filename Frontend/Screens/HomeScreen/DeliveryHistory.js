import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../Styles";

const DeliveryHistory = ({navigation}) => {
  const showMenu = () => navigation.dispatch(DrawerActions.toggleDrawer());
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
        My Delivery History
      </Text>
    </SafeAreaView>
  );
};

export default DeliveryHistory;
