import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './StackNavigator';
 

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}

