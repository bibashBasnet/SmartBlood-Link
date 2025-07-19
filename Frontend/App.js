import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from "./StackNavigator";
import { useEffect, useState } from "react";
import { Context } from "./Context/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("userInfo");
      console.log("Get token = " + token);
      if (token && user) {
        setUser(JSON.parse(user));
      }
    };
    loadUser();
  }, []);

  const [user, setUser] = useState(null);
  const [donate, setDonate] = useState(null);
  const [donateForm, setDonateForm] = useState(null);
  const [bloodBank, setBloodBank] = useState(null);
  const [isForm, setIsForm] = useState(null);
  const [selectedFreshId, setSelectedFreshId] = useState("1");
  const [selectedDeliveryId, setSelectedDeliveryId] = useState("0");
  const [coordinate, setCoordinate] = useState({
    latitude: 27.6949,
    longitude: 85.2899,
  });
  const [requestCoord, setRequestCoord] = useState({
    latitude: 27.6949,
    longitude: 85.2899,
  });

  const stack = createNativeStackNavigator();

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        donate,
        setDonate,
        bloodBank,
        setBloodBank,
        isForm,
        setIsForm,
        coordinate,
        setCoordinate,
        requestCoord,
        setRequestCoord,
        selectedFreshId,
        setSelectedFreshId,
        selectedDeliveryId,
        setSelectedDeliveryId,
      }}
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Context.Provider>
  );
}
