import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailProductScreen from './Screens/DetailProductScreen';
import LoginStack from './Stacks/LoginStack'
import HomeTab from './Tabs/HomeTab';
import { Icon } from 'react-native-elements';
import {TouchableOpacity} from 'react-native'
import GoBack from './Components/GoBack';
import CartStack from './Stacks/CartStack';
import HeaderRight from './Components/HeaderRight';
import {UserProvider} from './context/UserContext'
export default function App() {

  const Stack = createNativeStackNavigator()
  return (
    <UserProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" component={HomeTab} />
        <Stack.Screen name="login" component={LoginStack} />
        <Stack.Screen name="cart" component={CartStack} />
        <Stack.Screen name="detail" component={DetailProductScreen} 
        options={{
          headerLeft:GoBack,
          headerTransparent:true,
          headerTintColor:'white',
          headerShown:true,
          headerTitle:'',
          headerRight: HeaderRight
        }}
          />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
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
