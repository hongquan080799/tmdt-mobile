import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import {View} from 'react-native'
import DetailProductScreen from '../Screens/DetailProductScreen';
import HomeScreen from '../Screens/HomeScreen';
export default function HomeStack() {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component= {HomeScreen}/>
            <Stack.Screen name="Detail" component = {DetailProductScreen} />
        </Stack.Navigator>
    )
}
