import { View, Text,StyleSheet, TextInput, TouchableOpacity, ToastAndroid} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import { names } from '../../../names/Names';
import {IP_ADDRESS} from "@env"
import Colors from '../../Utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SignIn({navigation}) {
 console.log(IP_ADDRESS);
  const {user:loggedInUser} = useAppContext()
  const {setUser:login} = useAppContext();
  const [user,setuser] = useState({email:"",password:""});
  const [disabled,setdisabled] = useState(true)
  const [loading,setLoading] = useState(false)
  const storeData = async ({user,token}) => {
    try {
      await AsyncStorage.setItem('user',JSON.stringify(user));
      await AsyncStorage.setItem("token",JSON.stringify(token));
    } catch (e) {
      console.log(e);
      // saving error
    }
  };
  const handlechange = (name,value) =>{
    setuser(prev => ({...prev,[name]:value}))
  }
    const handleSignUp =  async() => {
      try {
        console.log("signing in");
        setLoading(true)
        const res = await axios.post(`http://${IP_ADDRESS}:5000/api/v1/home-service/users/login`,user);
        if(res){
          // console.log(res);
          const {user,token} = res.data;
          // console.log(user,token);
          await storeData({user,token})
          login({token,user})
          // navigation?.navigate(names.HOME)

          // setuser({name:"",email:"",password:"",confirmpassword:""})
          // navigation?.navigate(names.SINGIN)
        }
        // console.log(res);
      } catch (error) {
        console.log(error);
        const message = error?.response?.data?.message || "something went wrong"
        ToastAndroid.showWithGravity(message,ToastAndroid.LONG,ToastAndroid.TOP)
        // console.log(error);
      }
      finally{
        setLoading(false)
      }
        // Add your sign-up logic here
    }
    useEffect(()=>{
      if(!user.email || user.password?.length < 8){
        setdisabled(true);
      }else{
        
        setdisabled(false);
      }
    },[user])
    useEffect(()=>{
      if(loggedInUser){
        navigation.navigate(names.HOME)
      }
    },[loggedInUser])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput onChangeText= {text => handlechange("email",text)} value={user.email} style={styles.input} placeholder="Email or Username" />
      <TextInput   onChangeText= {text => handlechange("password",text)} value={user.password} style={styles.input} placeholder="Password" secureTextEntry={true} />
      <TouchableOpacity disabled = {disabled} style={[styles.button,disabled && styles.disabledbutton]} onPress={handleSignUp}>
        {
          loading ?
          <>
          <Text style={styles.buttonText}>loading...</Text>
          </>:
          <>
          <Text style={styles.buttonText}>Sign In</Text>
          </>
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(names.SINGUP)}>
        <Text style={styles.switchButton}>Dont have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor:Colors.PRIMARY,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      width: '80%',
    },
    button: {
      backgroundColor:Colors.PRIMARY,
      paddingVertical: 10,
      cursor:"pointer",
      borderRadius: 5,
      alignItems: 'center',
      width: '80%',
    },
    disabledbutton:{
      backgroundColor:"gray",
      cursor:"not-allowed"
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    switchButton: {
      marginTop: 10,
      color:Colors.PRIMARY ,
    },
  });