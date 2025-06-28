import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import DrawerNavigation from './DrawerNavigation';
import StackNavigator from './StackNavigator';
import { useState } from 'react';
import { UserContext } from './Context/UserContext';

export default function App() {

  const [user, setUser] = useState(null);

  const stack = createNativeStackNavigator();
  return (
    <UserContext.Provider value={{user, setUser}}>
      <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
    </UserContext.Provider>
    
    
  );
}

