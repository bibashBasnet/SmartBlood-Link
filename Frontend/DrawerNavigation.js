import { createDrawerNavigator } from '@react-navigation/drawer';
import HistoryScreen from './Screens/HomeScreen/HistoryScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import LogOut from './Screens/HomeScreen/LogOut';
import DonateNavigation from './StackNavigation/DonateNavigation';
import ProfileNavigation from './StackNavigation/ProfileNavigation';
import RequestListNavigation from './StackNavigation/RequestListNavigation';
// Import the actual screen components instead of non-existent navigation
import RequestScreen from './Screens/HomeScreen/RequestScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Donate"
        component={DonateNavigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="RequestList"
        component={RequestListNavigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Request"
        component={RequestScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogOut}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;