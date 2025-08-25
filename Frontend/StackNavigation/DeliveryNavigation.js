import React from "react";
import Delivery from "../Screens/HomeScreen/Delivery";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "../Screens/HomeScreen/MapScreen";

const DeliveryNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Delivery">
      <Stack.Screen
        component={Delivery}
        name="Delivery"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DeliveryNavigation;
