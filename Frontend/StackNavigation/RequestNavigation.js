import { createNativeStackNavigator } from "@react-navigation/native-stack"

const RequestNavigation = () => {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator initialRouteName="RequestScreen">
            <Stack.Screen component={RequestScreen} name="RequestScreen"/>
        </Stack.Navigator>
    )
}

export default RequestNavigation
