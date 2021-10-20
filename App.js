import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HomeStack from './Stacks/HomeStack';
import { StyleSheet, Text, View } from 'react-native';
import SettingScreen from './Screens/SettingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CartStack from './Stacks/CartStack';
import { Icon } from 'react-native-elements'
import LoginStack from './Stacks/LoginStack';
export default function App() {
  const Tabs = createBottomTabNavigator()
  return (
    <NavigationContainer>
      {/* <Tabs.Navigator>
        <Tabs.Screen name="Home"
         component={HomeStack}
         options={{
           tabBarIcon: ()=> <Icon name="home" color='#5F6368' />,
           tabBarActiveTintColor:'#5F6368',
           headerShown:false
          }} />
          <Tabs.Screen name="Cart"
         component={CartStack}
         options={{
          tabBarIcon: ()=> <Icon name="shopping-cart" color='#5F6368' />,
          headerShown:false,
          tabBarActiveTintColor:'#5F6368'
         }} 
         />
        <Tabs.Screen name="Setting"
         component={SettingScreen}
         options={{
          tabBarIcon: ()=> <Icon name="settings" color='#5F6368' />,
          tabBarActiveTintColor:'#5F6368'
         }} 
         />
      </Tabs.Navigator> */}
      <LoginStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
