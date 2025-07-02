import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RequestListScreen from "../Screens/HomeScreen/RequestListScreen";

const RequestListNavigation = () => {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator initialRouteName="RequestListScreen">
            <Stack.Screen component={RequestListScreen} name="RequestListScreen"/>
        </Stack.Navigator>
    )
}

export default RequestListNavigation
