import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigator from './StackNavigator';
import ProfileScreen from './Screens/HomeScreen/ProfileScreen';
import DonateScreen from './Screens/HomeScreen/DonateScreen';
import HistoryScreen from './Screens/HomeScreen/HistoryScreen';
import RequestListScreen from './Screens/HomeScreen/RequestListScreen';
import RequestScreen from './Screens/HomeScreen/RequestScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
      <Drawer.Navigator>

        <Drawer.Screen name='Home' component={StackNavigator} options={{headerShown: false}}/>
        <Drawer.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='Donate' component={DonateScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='History' component={HistoryScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='RequestList' component={RequestListScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='Request' component={RequestScreen} options={{headerShown: false}}/>

      </Drawer.Navigator>
  )
}

export default DrawerNavigation
