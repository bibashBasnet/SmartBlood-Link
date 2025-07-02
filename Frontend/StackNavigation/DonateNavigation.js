import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DonateStatusScreen from '../Screens/HomeScreen/DonateStatusScreen';
import DonateScreen from '../Screens/HomeScreen/DonateScreen'

const DonateNavigation = () => {

  const stack = createNativeStackNavigator();

  return (
    <stack.Navigator initialRouteName='DonateScreen'>
      <stack.Screen name="DonateStatusScreen" component={DonateStatusScreen} options={{headerShown: false}}/>
        <stack.Screen name="DonateScreen" component={DonateScreen} options={{headerShown: false}}/>
    </stack.Navigator>
  )
}

export default DonateNavigation
