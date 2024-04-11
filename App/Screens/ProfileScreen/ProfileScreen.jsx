import { View, Text ,Image, FlatList, Platform, KeyboardAvoidingView, TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import {IP_ADDRESS} from "@env"
import {Ionicons} from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import { useUser,useClerk } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'
import { useAppContext } from '../../context/AppContext'
import axios from 'axios';
import { names} from '../../../names/Names'

export default function ProfileScreen() {
  const {user:loggedInUser, logout,setUser:globalUser} = useAppContext()
  const navigation = useNavigation()
  const noavatar= require("../../../assets/images/noavatar.jpeg")
  const handleLogout = ()=>{
    logout();
    navigation.navigate(names.SINGIN)
  }
  const [user,setuser] = useState({name:loggedInUser?.name,email:loggedInUser?.email,password:"",confirmpassword:"",profilePic:loggedInUser?.profilePic || ""});
  const [disabled,setdisabled] = useState(true)
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    console.log("picking");
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    
    if (!result.canceled) {
      setuser(prev => ({...prev,profilePic:result.assets[0].uri}))
      // setImage(result.assets[0].uri);
    }
    }
  

  const [loading,setLoading] = useState(false)
  const handlechange = (name,value) =>{
    setuser(prev => ({...prev,[name]:value}))
  }
    const handleSignUp =  async() => {
      try {
        console.log("signing up");
        setLoading(true)
        const res = await axios.patch(`http://${IP_ADDRESS}:5000/api/v1/home-service/users/update/${loggedInUser?._id}`,user);
        console.log(res);
        if(res){
          const {user:newUser} = res.data
          console.log(newUser)
         setuser(newUser) 
         globalUser(newUser)
          // navigation?.navigate(names.SINGIN)
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
      if(!user.name || !user.email || (user.password && user.password?.length < 8 )|| (user.confirmpassword && user.confirmpassword?.length < 8) || user.password !== user.confirmpassword){
        setdisabled(true);
      }else{
        
        setdisabled(false);
      }
    },[user])
  

  return (
    <ScrollView >
    <View style={{ flex:1}} >
    <View style={{padding:20, paddingTop:30, backgroundColor:Colors.PRIMARY,position:'relative'}}>
      <TouchableOpacity onPress={handleLogout} style={{position:'absolute',top:40,right:30,zIndex:10000}} >
      <AntDesign name="logout" size={24} color="white" />
      </TouchableOpacity>
      <Text style={{fontSize:30, fontFamily:'outfit-bold',color:Colors.WHITE}}>Profile</Text>

       <View style={{
         display:'flex',
         justifyContent:'center',
         alignItems:'center',
         padding:20,
         
        }}>
        {/* <Image source={{uri:user?.profilePic}}
        style={{width:90,height:90,borderRadius:99}}
      /> */}
        {
          user?.profilePic ?
          <TouchableOpacity onPress={pickImage} >
          <Image source={{uri:user?.profilePic}} style={{width:90,height:90,borderRadius:99}}/>
        </TouchableOpacity>:
        <TouchableOpacity onPress={pickImage}>
        <Image source={noavatar} style={{width:90,height:90,borderRadius:99}}/>
        </TouchableOpacity>
      }
        <Text style={{fontSize:26, marginTop:8,fontFamily:'outfit-medium',
      color:Colors.WHITE}}>{user?.name}</Text>
      <Text style={{fontSize:18, marginTop:8,fontFamily:'outfit-medium',
      color:Colors.WHITE}}>{user?.email}</Text>
       </View>
    </View>
    {/* <View style={{paddingTop:60}}> */}
      {/* <FlatList
      data={profileMenu}
      renderItem={({item, index})=>(
        <TouchableOpacity style={{display:'flex',flexDirection:'row',
        alignItems:'center',gap:10, marginBottom:40,
        paddingHorizontal:80
      }} onPress={()=>handleMenuItemPress(item.name)}>
      <Ionicons name={item.icon} size={35} color={Colors.PRIMARY}/>
      <Text style={{fontFamily:'outfit',fontSize:20}}>{item.name}</Text>
      </TouchableOpacity>
      )}
    /> */}
    {/* </View> */}
    <KeyboardAvoidingView  
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style ={{flex:1}} >
    <View style={styles.container}>

      <Text style={styles.title}>Update profile</Text>
      <TextInput onChangeText= {text => handlechange("name",text)} value={user.name} style={styles.input} placeholder="Full Name" />
      <TextInput onChangeText= {text => handlechange("email",text)} value={user.email} style={styles.input} placeholder="Email or Username" />
      <TextInput   onChangeText= {text => handlechange("password",text)} value={user.password} style={styles.input} placeholder="change Password" secureTextEntry={true} />
      <TextInput onChangeText= {text => handlechange("confirmpassword",text)} value={user.confirmpassword} style={styles.input} placeholder="Confirm new Password" secureTextEntry={true} />
      <TouchableOpacity disabled = {disabled} style={[styles.button,disabled && styles.disabledbutton]} onPress={handleSignUp}>
        {
          loading ?
          <>
          <Text style={styles.buttonText}>loading...</Text>
          </>:
          <>
          <Text style={styles.buttonText}>Update</Text>
          </>
        }
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate(names.SINGIN)}>
        <Text style={styles.switchButton}>Already have an account? Sign In</Text>
      </TouchableOpacity> */}
    </View>
    </KeyboardAvoidingView>
    </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop:10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#007bff',
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
    color: '#007bff',
  },
});