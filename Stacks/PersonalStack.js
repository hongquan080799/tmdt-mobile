import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PersonalScreen from '../Screens/PersonalScreen';
import UserInfoScreen from '../Screens/UserInfoScreen';
import HeaderRight from '../Components/HeaderRight';
export default function PersonalStack() {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator >
            <Stack.Screen component={PersonalScreen} name="personal" options={{
                 headerTransparent:true,
                 headerRight:()=> <HeaderRight style={{isBackground:false}} />,
                 headerTitle:''
            }}/>
            <Stack.Screen component ={UserInfoScreen} name="userInfo" options={{headerShown:true, title:'User Infomation'}}  />
        </Stack.Navigator>
    )
}
