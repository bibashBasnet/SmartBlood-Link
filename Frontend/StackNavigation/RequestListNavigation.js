import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RequestListScreen from "../Screens/HomeScreen/RequestListScreen";
import BloodRequestForm from "../Screens/HomeScreen/BloodRequestForm";

const RequestListNavigation = () => {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator initialRouteName="RequestListScreen">
            <Stack.Screen component={RequestListScreen} name="RequestListScreen" options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default RequestListNavigation
