import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AdminScreen from '../Screens/AdminScreen/AdminScreen';
import AddBusiness from '../Screens/AdminScreen/AddBusiness';
const Stack = createStackNavigator();

export default function AdminNavigation(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
          <Stack.Screen name='admin' component={AdminScreen}/>   
          </Stack.Navigator>
    )
}
