import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import DrawerNavigation from './DrawerNavigation';
import DonateScreen from './Screens/HomeScreen/DonateScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name='Registration' component={RegistrationScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Main' component={DrawerNavigation} options={{headerShown: false}}/>
          
          <Stack.Screen name="DonateScreen" component={DonateScreen} /> 

        </Stack.Navigator>
  )
}

export default StackNavigator;
