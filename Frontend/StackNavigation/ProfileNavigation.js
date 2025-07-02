import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../Screens/HomeScreen/ProfileScreen';
import UpdateProfileScreen from '../Screens/HomeScreen/UpdateProfileScreen';

const ProfileNavigation = () => {
    const stack = createNativeStackNavigator();
  return (
    <stack.Navigator initialRouteName='ProfileScreen'>
        <stack.Screen component={ProfileScreen} name = "ProfileScreen" options={{headerShown: false}}/>
        <stack.Screen component={UpdateProfileScreen} name = "UpdateProfileScreen" options={{headerShown: false}}/>
    </stack.Navigator>
  )
}

export default ProfileNavigation
