import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import DrawerNavigation from './DrawerNavigation';
import LoginScreen from './Screens/LoginScreen';
import LandingScreen from './Screens/LandingScreen';
import RequestDetail from './Components/RequestDetail';

const stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
        <stack.Navigator initialRouteName='LandingPage' >
          <stack.Screen name='Registration' component={RegistrationScreen} options={{headerShown: false}}/>
          <stack.Screen name='Main' component={DrawerNavigation} options={{headerShown: false}}/>
          <stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
          <stack.Screen name='LandingPage' component={LandingScreen} options={{headerShown: false}}/>
          <stack.Screen name='RequestDetail' component={RequestDetail} options={{headerShown: false}}/>
        </stack.Navigator>
  )
}

export default StackNavigator
