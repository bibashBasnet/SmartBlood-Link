import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';

const stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
        <stack.Navigator>
          <stack.Screen name='Main' component={HomeScreen} options={{headerShown: false}}/>
          <stack.Screen name='Registration' component={RegistrationScreen} options={{headerShown: false}}/>
        </stack.Navigator>
  )
}

export default StackNavigator
