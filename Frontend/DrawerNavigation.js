import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileScreen from './Screens/HomeScreen/ProfileScreen';
import DonateScreen from './Screens/HomeScreen/DonateScreen';
import HistoryScreen from './Screens/HomeScreen/HistoryScreen';
import RequestListScreen from './Screens/HomeScreen/RequestListScreen';
import RequestScreen from './Screens/HomeScreen/RequestScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import LogOut from './Screens/HomeScreen/LogOut';
import { useRoute } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
      <Drawer.Navigator initialRouteName='RequestList' >

        <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='Donate' component={DonateScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='History' component={HistoryScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='RequestList' component={RequestListScreen} options={{headerShown: false}} />
        <Drawer.Screen name='Request' component={RequestScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='Logout' component={LogOut} options={{headerShown: false}}/>
      </Drawer.Navigator>
  )
}

export default DrawerNavigation
