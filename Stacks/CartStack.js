import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../Screens/CartScreen';
import ConfirmOrderScreen from '../Screens/ConfirmOrderScreen';
import AddressReceiveScreen from '../Screens/AddressReceiveScreen';
export default function CartStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Cart" component= {CartScreen} options={{title:'Cart'}}/>
            <Stack.Screen name="ConfirmOrder" component= {ConfirmOrderScreen} options={{title:'Confirm Order'}}/>
            <Stack.Screen name="AddressReceive" component= {AddressReceiveScreen} options={{title:'Address Receive'}}/>
        </Stack.Navigator>
    )
}
