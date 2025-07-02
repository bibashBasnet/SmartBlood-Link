import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import DrawerNavigation from './DrawerNavigation';
import DonateScreen from './Screens/HomeScreen/DonateScreen';
import LoginScreen from './Screens/LoginScreen';
import LandingScreen from './Screens/LandingScreen';
import DonateNavigation from './StackNavigation/DonateNavigation';


const stack = createNativeStackNavigator();

const stackNavigator = () => {
  return (

        <stack.Navigator initialRouteName='Login' >
          <stack.Screen name='Registration' component={RegistrationScreen} options={{headerShown: false}}/>
          <stack.Screen name='Main' component={DrawerNavigation} options={{headerShown: false}}/>
          <stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
          <stack.Screen name='LandingPage' component={LandingScreen} options={{headerShown: false}}/>
          <stack.Screen name='donate' component={DonateNavigation} options={{headerShown:false}}/>
        </stack.Navigator>

  )
}

export default stackNavigator;
