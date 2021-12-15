import React,{useEffect, useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../Stacks/HomeStack'
import { Icon } from 'react-native-elements';
import CartStack from '../Stacks/CartStack'
import SettingScreen from '../Screens/SettingScreen'
import HomeScreen from '../Screens/HomeScreen';
import PersonalStack from '../Stacks/PersonalStack';
import HeaderRight from '../Components/HeaderRight';
import LoginScreen from '../Screens/LoginScreen'
import { UserContext } from '../context/UserContext';
import LoginStack from '../Stacks/LoginStack';
import ChatScreen from '../Screens/ChatScreen';
export default function HomeTab() {
    const [state,setState] = useContext(UserContext)
    const Tabs = createBottomTabNavigator()
    return (
      <Tabs.Navigator>
        <Tabs.Screen name="Home"
         component={HomeScreen}
         options={{
           tabBarIcon: ()=> <Icon name="home" color='#5F6368' />,
           tabBarActiveTintColor:'#5F6368',
           headerShown:false
          }} />
          <Tabs.Screen name="Category"
            component={HomeScreen}
            options={{
            tabBarIcon: ()=> <Icon name="category" color='#5F6368' />,
            tabBarActiveTintColor:'#5F6368',
            headerShown:false
            }} />
          <Tabs.Screen name="Chat"
            component={ChatScreen}
            options={{
            tabBarIcon: ()=> <Icon name="chat" color='#5F6368' />,
            tabBarActiveTintColor:'#5F6368'
            }} />
          {/* <Tabs.Screen name="Cart"
         component={CartStack}
         options={{
          tabBarIcon: ()=> <Icon name="shopping-cart" color='#5F6368' />,
          headerShown:false,
          tabBarStyle:{display:'none'}
         }} 
         /> */}
        {/* <Tabs.Screen name="Personal"
         component={PersonalScreen}
         options={{
          tabBarIcon: ()=> <Icon name="account-circle" color='#5F6368' />,
          tabBarActiveTintColor:'#5F6368',
          headerTransparent:true,
          headerRight:()=> <HeaderRight style={{isBackground:false}} />,
          headerTitle:''
         }} 
         /> */}
         {state?.user != null ?
         <Tabs.Screen name="Personal"
         component={PersonalStack}
         options={{
          tabBarIcon: ()=> <Icon name="account-circle" color='#5F6368' />,
          tabBarActiveTintColor:'#5F6368',
          headerShown:false
         }} 
         />:<Tabs.Screen name="Personal"
         
         component={LoginStack}
         options={{
          tabBarIcon: ()=> <Icon name="account-circle" color='#5F6368' />,
          tabBarActiveTintColor:'#5F6368',
          headerShown:false
         }} 
         />}
         
      </Tabs.Navigator>
    )
}
