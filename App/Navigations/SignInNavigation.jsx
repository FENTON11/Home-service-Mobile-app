import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../Screens/SignInScreen/SignIn';
const Stack = createStackNavigator();
export default function SignInNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
   <Stack.Screen name="SignIn" component={SignIn}/>
   </Stack.Navigator>
  )
}