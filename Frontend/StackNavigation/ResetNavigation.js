import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestScreen from "../Screens/HomeScreen/RequestScreen";
import ForgetPassword from "../Screens/HomeScreen/ForgetPassword";
import OTPScreen from "../Screens/HomeScreen/OTPScreen";
import ResetScreen from "../Screens/HomeScreen/ResetScreen";

const ResetNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="forget">
      <Stack.Screen
        component={ForgetPassword}
        name="forget"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={OTPScreen}
        name="otp"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="reset"
        component={ResetScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ResetNavigation;
