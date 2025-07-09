import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './StackNavigator';
import { useState } from 'react';
import { Context} from './Context/Context';

export default function App() {

  const [user, setUser] = useState(null);
  const [donate, setDonate] = useState(null);
  const [donateForm, setDonateForm] = useState(null);
  const [bloodBank, setBloodBank] = useState(null)
  const [isForm, setIsForm] = useState(null)
  const [coordinate, setCoordinate] = useState({
    latitude: 27.6949,
    longitude: 85.2899,
  });
  const [requestCoord, setRequestCoord] = useState({
    latitude: 27.6949,
    longitude: 85.2899,
  })

  const stack = createNativeStackNavigator();

  return (
    <Context.Provider value={{
      user, setUser, donate, setDonate, bloodBank, setBloodBank, isForm, setIsForm, coordinate, setCoordinate,
      requestCoord, setRequestCoord
    }}>
      <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
    </Context.Provider>
    
    
  );
}

