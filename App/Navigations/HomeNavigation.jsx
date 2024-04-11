import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BusinessListByCategoryScreen from '../Screens/BusinessListByCategoryScreen/BusinessListByCategoryScreen';
import BusinessDetailScreen from '../Screens/BusinessDetailScreen/BusinessDetailScreen';
import { names } from '../../names/Names';


const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name={names.HOME} component={HomeScreen}/>
        <Stack.Screen name='business-list'
        component={BusinessListByCategoryScreen}/>
        <Stack.Screen name='business-detail' component={BusinessDetailScreen}/>
    </Stack.Navigator>
  )
}