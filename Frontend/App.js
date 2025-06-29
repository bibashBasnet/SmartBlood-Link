import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './StackNavigator';
import { useState } from 'react';
import { Context} from './Context/Context';

export default function App() {

  const [user, setUser] = useState(null);
  const [donate, setDonate] = useState(null);

  const stack = createNativeStackNavigator();

  return (
    <Context.Provider value={{user, setUser, donate, setDonate}}>
      <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
    </Context.Provider>
    
    
  );
}

