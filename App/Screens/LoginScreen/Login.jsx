import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
// import * as WebBrowser from "expo-web-browser";
import { useAppContext } from '../../context/AppContext';
import { names } from '../../../names/Names';
// WebBrowser.maybeCompleteAuthSession();
export default function Login({navigation}){
  // const {loginWithGoogle}= useAppContext();
  // const onPress = React.useCallback(async () => {
  //   try {
  //     const { createdSessionId, signIn, signUp, setActive } =
  //       await startOAuthFlow();
 
  //     if (createdSessionId) {
  //       setActive({ session: createdSessionId });
  //     } else {
  //       // Use signIn or signUp for next steps such as MFA
  //     }
      
  //   } catch (err) {
  //     console.error("OAuth error", err);
  //   }
  //}, []);
  
  return (
    <ScrollView>
    <View style={{alignItems: 'center'}}>
     <Image source={require("./../../../assets/images/login.png")}
        style={styles.loginImage}
     
     />
      <View style={styles.subContainer}>
        <Text style={{fontSize:27, color:Colors.WHITE,
            textAlign:'center'}}>
            Let's Find 
            <Text style={{fontWeight:'bold'}}> Professional Cleaning and repair
             </Text>Services
        </Text>
        <Text style={{fontSize:17, color:Colors.WHITE,
        textAlign:'center', marginTop:20}}>Best App to find Services near you
        which deliver you a professional service</Text>
        <TouchableOpacity style={styles.button} 
        onPress={()=> navigation.navigate(names.SINGIN)}>
            <Text style={{textAlign:'center', 
            fontSize: 17,
             color:Colors.PRIMARY}}>Let's Get Started</Text>
        </TouchableOpacity>
        </View>
        
    </View>
    </ScrollView>
   
   
  )
 }
const styles = StyleSheet.create({
    loginImage:{
        width: 230,
        height:450,
        marginTop: 70,
        borderWidth: 4,
        borderColor:Colors.BLACK,
        borderRadius: 15

    },
    subContainer:{
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        height:'70%',
        marginTop:-20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding:20
    },
     button:{
        padding: 15,
        backgroundColor:Colors.WHITE,
        borderRadius:99,
        marginTop: 40

        }
    
})