import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import DrawerNavigation from './DrawerNavigation';
import LoginScreen from './Screens/LoginScreen';
import LandingScreen from './Screens/LandingScreen';
import DonateNavigation from './StackNavigation/DonateNavigation';
import BloodRequestForm from './Screens/HomeScreen/BloodRequestForm';
import { useContext, useState } from 'react';
import { Context } from './Context/Context';

const Stack = createNativeStackNavigator();

const stackNavigator = () => {
  const {user} = useContext(Context)
  console.log(JSON.stringify(user, null, 2))
  return (
    <Stack.Navigator initialRouteName={user? "Main": "LandingPage"}>
      <Stack.Screen name='Registration' component={RegistrationScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Main' component={DrawerNavigation} options={{headerShown: false}}/>
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="BloodRequestForm" component={BloodRequestForm} options={{ headerShown: false }}/>
      <Stack.Screen name='LandingPage' component={LandingScreen} options={{headerShown: false}}/>
      <Stack.Screen name='donate' component={DonateNavigation} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default stackNavigator;