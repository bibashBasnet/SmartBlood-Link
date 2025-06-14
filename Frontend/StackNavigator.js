import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import DrawerNavigation from './DrawerNavigation';

const stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
        <stack.Navigator initialRouteName='Main'>
          <stack.Screen name='Registration' component={RegistrationScreen} options={{headerShown: false}}/>
          <stack.Screen name='Main' component={DrawerNavigation} options={{headerShown: false}}/>
        </stack.Navigator>
  )
}

export default StackNavigator
