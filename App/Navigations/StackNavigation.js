import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from 'react'
import SignUp from "../Screens/SignUp Screen/SignUp";
import { names } from "../../names/Names";
import SignIn from "../Screens/SignInScreen/SignIn";
import Login from "../Screens/LoginScreen/Login";
import TabNavigation from "./TabNavigation";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import { useAppContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddBusiness from "../Screens/AdminScreen/AddBusiness";
import Header from "../Screens/HomeScreen/Header";
import AddCategory from "../Screens/AdminScreen/AddCategory";
import ManageBusiness from "../Screens/AdminScreen/ManageBusiness";
import UpdateBusiness from "../Screens/AdminScreen/UpdateBusiness";
import ManageCategory from "../Screens/AdminScreen/ManageCategory";
import UpdateCategory from "../Screens/AdminScreen/UpdateCategory";
const Stack = createStackNavigator();
export default function StackNavigation() {
  const {user} = useAppContext();

  // useEffect(()=>{
  //   const user = AsyncStorage.getItem("user")
  //   console.log(user);
  //   const token = AsyncStorage.getItem("token")
  //   setUser({user,token})
  // },[])
  return (
    <Stack.Navigator screenOptions={{
        
    }}>
      {
        !user ? 
        <Stack.Group screenOptions={{headerShown:false}} >
<Stack.Screen name={names.START} component={Login}/>
<Stack.Screen name={names.SINGUP} component={SignUp}/>
<Stack.Screen name={names.SINGIN} component={SignIn}/>
        </Stack.Group>:
        <Stack.Group>
      <Stack.Screen name={names.HOME} options={{headerShown:false}} component={TabNavigation}/>
   <Stack.Screen name={names.ADD} component={AddBusiness}/>
   <Stack.Screen name={names.ADDCATEGORY} component={AddCategory}/>
   <Stack.Screen name={names.MANAGEBUSINESS} component={ManageBusiness}/>
   <Stack.Screen name={names.UPDATEBUSINESS} component={UpdateBusiness}/>
   <Stack.Screen name={names.MANAGE_CATEGORY} component={ManageCategory}/>
   <Stack.Screen name={names.UPDATE_CATEGORY} component={UpdateCategory}/>
        </Stack.Group>


      }
   </Stack.Navigator>
  )
}