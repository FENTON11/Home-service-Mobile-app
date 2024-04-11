import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../Screens/LoginScreen/Login';
const Stack = createStackNavigator();
export default function LoginNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name='login' component={Login}/>
        
    </Stack.Navigator>
  )
}