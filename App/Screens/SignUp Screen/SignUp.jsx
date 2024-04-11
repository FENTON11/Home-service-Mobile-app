import { View, Text,StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { useAppContext } from '../../context/AppContext';
import { names } from '../../../names/Names';
import {IP_ADDRESS} from "@env"
import Colors from '../../Utils/Colors';
export default function SignUp({navigation}) {
  const [user,setuser] = useState({name:"",email:"",password:"",confirmpassword:""});
  const [disabled,setdisabled] = useState(true)
  const [loading,setLoading] = useState(false)
  const handlechange = (name,value) =>{
    setuser(prev => ({...prev,[name]:value}))
  }
    const handleSignUp =  async() => {
      try {
        console.log("signing up");
        setLoading(true)
        const res = await axios.post(`http://${IP_ADDRESS}:5000/api/v1/home-service/users/register`,user);
        console.log(res)
        if(res){
         setuser({name:"",email:"",password:"",confirmpassword:""})
         
          navigation?.navigate(names.SINGIN)
        }
        // console.log(res);
      } catch (error) {
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
      if(!user.name || !user.email || user.password?.length < 8 || user.confirmpassword?.length < 8 || user.password !== user.confirmpassword){
        setdisabled(true);
      }else{
        
        setdisabled(false);
      }
    },[user])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput onChangeText= {text => handlechange("name",text)} value={user.name} style={styles.input} placeholder="Full Name" />
      <TextInput onChangeText= {text => handlechange("email",text)} value={user.email} style={styles.input} placeholder="Email or Username" />
      <TextInput   onChangeText= {text => handlechange("password",text)} value={user.password} style={styles.input} placeholder="Password" secureTextEntry={true} />
      <TextInput onChangeText= {text => handlechange("confirmpassword",text)} value={user.confirmpassword} style={styles.input} placeholder="Confirm Password" secureTextEntry={true} />
      <TouchableOpacity disabled = {disabled} style={[styles.button,disabled && styles.disabledbutton]} onPress={handleSignUp}>
        {
          loading ?
          <>
          <Text style={styles.buttonText}>loading...</Text>
          </>:
          <>
          <Text style={styles.buttonText}>Sign Up</Text>
          </>
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(names.SINGIN)}>
        <Text style={styles.switchButton}>Already have an account? Sign In</Text>
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
      color:Colors.PRIMARY,
    },
  });