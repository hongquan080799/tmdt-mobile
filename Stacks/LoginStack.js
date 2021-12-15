import React from 'react'
import { View } from 'react-native'
import LoginScreen from '../Screens/LoginScreen'
import { createStackNavigator } from '@react-navigation/stack'
import RegisterScreen from '../Screens/RegisterScreen'
export default function LoginStack() {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen component={LoginScreen} name="login" screenOptions={{headerShown:false}}/>
            <Stack.Screen component={RegisterScreen} name="register" options={{ title: 'Register' }} />
        </Stack.Navigator>
    )
}
