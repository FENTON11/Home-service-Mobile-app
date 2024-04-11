import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from 'react'
import AdminScreen from "../Screens/AdminScreen/AdminScreen";
import { names } from "../../names/Names";
import AddBusiness from "../Screens/AdminScreen/AddBusiness";
import ManageBusiness from "../Screens/AdminScreen/ManageBusiness";
const Stack = createStackNavigator();
export default function StackNavigation() {
  // const {setUser} = useAppContext();

  // useEffect(()=>{
  //   const user = AsyncStorage.getItem("user")
  //   console.log(user);
  //   const token = AsyncStorage.getItem("token")
  //   setUser({user,token})
  // },[])
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
   <Stack.Screen name={names.ADD} component={AddBusiness}/>
   <Stack.Screen name={names.MANAGEBUSINESS} component={ManageBusiness}/>
   </Stack.Navigator>
   
  )
}