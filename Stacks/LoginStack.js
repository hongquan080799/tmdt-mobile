import React from 'react'
import { View } from 'react-native'
import LoginScreen from '../Screens/LoginScreen'
import {store} from '../firebase'
export default function LoginStack() {
    return (
        <View>
            <LoginScreen />
        </View>
    )
}
