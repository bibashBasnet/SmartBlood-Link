import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RequestScreen from '../Screens/HomeScreen/RequestScreen'

const RequestNavigation = () => {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator initialRouteName="RequestScreen">
            <Stack.Screen component={RequestScreen} name="RequestScreen" options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default RequestNavigation
