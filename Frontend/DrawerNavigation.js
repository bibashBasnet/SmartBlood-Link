import { createDrawerNavigator } from '@react-navigation/drawer';
import HistoryScreen from './Screens/HomeScreen/HistoryScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import LogOut from './Screens/HomeScreen/LogOut';
import DonateNavigation from './StackNavigation/DonateNavigation';
import ProfileNavigation from './StackNavigation/ProfileNavigation';
import RequestListNavigation from './StackNavigation/RequestListNavigation';
import RequestNavigation from './StackNavigation/RequestNavigation'
import MapScreen from './Screens/HomeScreen/MapScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Delivery from './Screens/HomeScreen/Delivery';
import DeliveryHistory from './Screens/HomeScreen/DeliveryHistory';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  
  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    const checkUserType = async () => {
      const userString = await AsyncStorage.getItem("userInfo")
      if(userString){
        user = JSON.parse(userString)
          if(parseInt(user.userType) === 1)
            setIsUser(false)
      }
    }
    checkUserType();
  },[isUser])
  return (
      <Drawer.Navigator initialRouteName='Home' >

        <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='Profile' component={ProfileNavigation} options={{headerShown: false}}/>
        <Drawer.Screen name='Donate' component={DonateNavigation} options={{headerShown: false}}/>
        <Drawer.Screen name='History' component={HistoryScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='RequestList' component={RequestListNavigation} options={{headerShown: false}} />
        <Drawer.Screen name='Request' component={RequestNavigation} options={{headerShown: false}}/>
        {!isUser && (
          <>
            <Drawer.Screen name='Delivery' component={Delivery} options={{headerShown: false}}/>
            <Drawer.Screen name='DeliveryStatus' component={DeliveryHistory} options={{headerShown: false}}/>
          </>  
        )}
        <Drawer.Screen name='Logout' component={LogOut} options={{headerShown: false}}/>
      </Drawer.Navigator>
  )
}

export default DrawerNavigation;