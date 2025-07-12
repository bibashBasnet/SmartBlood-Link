import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DonateStatusScreen from '../Screens/HomeScreen/DonateStatusScreen';
import DonateScreen from '../Screens/HomeScreen/DonateScreen'
import MapScreen from '../Screens/HomeScreen/MapScreen';
import Constants from 'expo-constants'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import { ActivityIndicator, View } from 'react-native';
import axios from 'axios';

const DonateNavigation = () => {

  const API_URL = Constants.expoConfig.extra.apiUrl
  const {setDonate, user, donate, setCoordinate} = useContext(Context)
  const stack = createNativeStackNavigator();
  const[initRoute, setInitialRoute] = useState(null)
  const[loading, setLoading] = useState(true)

useEffect(() => {
  const fetchDonate = async () => {
    try {
      const res = await axios.get(`${API_URL}/donate/get`, {
        params: { createdBy: user.id }
      });
      console.log("Response data = ", JSON.stringify(res.data, null, 2))

      if (res.data) {
        setDonate(res.data);
        setCoordinate({latitude: res.data.latitude, longitude: res.data.longitude})
        setInitialRoute("DonateStatusScreen");
      } else {
        setInitialRoute("DonateScreen");
      }
    } catch (e) {
      console.error("🚨 Fetch error:", e?.message || e);
      setInitialRoute("DonateScreen");
    } finally {
      setLoading(false);
    }
  };

  if (user?.id) {
    fetchDonate();
  }
}, [user?.id]);

  
  if (loading || !initRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#c62828" />
      </View>
    );
  }

  return (
    <stack.Navigator initialRouteName={initRoute}>
      <stack.Screen name="DonateStatusScreen" component={DonateStatusScreen} options={{headerShown: false}}/>
        <stack.Screen name="DonateScreen" component={DonateScreen} options={{headerShown: false}}/>
        <stack.Screen name="Map" component={MapScreen} options={{headerShown: false}}/>
    </stack.Navigator>
  )
}

export default DonateNavigation
