import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, Text,Image, TouchableOpacity,StyleSheet, ScrollView, Modal, Linking } from 'react-native'
import{Ionicons} from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';
// import{Ionicons} from '@expo/vector-icons';


export default function BusinessDetailScreen() {
    const param=useRoute().params;
    const [business, setBusiness]=useState(param.business);
    // console.log(business);
    const navigation=useNavigation();
    const[isReadMore, setIsReadMore]=useState(false);
    const [showModal,setShowModal]=useState(false)
    useEffect(()=>{
      
    },[])
    const onMessageBtnClick=()=>{
      Linking.openURL('mailto:'+business?.email+"?subject= I am looking for your service&body=Hi There, ")
    }
  return business&& (
   <ScrollView style={{height:'91%'}}> 
    <View>
        <TouchableOpacity style={styles.backBtnContainer}
        onPress={()=>navigation.goBack()}>
      <Ionicons name='arrow-back-outline' size={30} color="black"></Ionicons>
      </TouchableOpacity>
      <Image source={{uri:business?.images[0]}}
        style={{width:'100%',height:300}}
      />
      <View style={styles.infoContainer}>
        <Text style={{fontFamily:'outfit-bold',
        fontSize:25 }}>{business?.name}</Text>
        <View style={styles.subContainer}>
        <Text style={{fontFamily:'outfit-medium',
        color:Colors.PRIMARY,fontSize:20}}>
        {business?.user?.email} </Text>
        <Text style={{color:Colors.PRIMARY,backgroundColor:Colors.PRIMARY_LIGHT
        ,padding:5,borderRadius:5,fontSize:14}}>{business?.category}</Text>
        </View>
        <Text style={{fontSize:17,fontFamily:'outfit',color:Colors.GRAY}}>
        <Ionicons name="location-sharp" size={25} color={Colors.PRIMARY}  />
            {business?.address}</Text>
            {/*Horizontal line */}
            <View style={{borderWidth:0.4,marginTop:20,marginBottom:20}}></View>
         
            {/* About Me Section */}
          <BusinessAboutMe business={business}/>

           {/*Horizontal line */}
           <View style={{borderWidth:0.4,marginTop:20,marginBottom:20}}></View>
           <BusinessPhotos business={business}/>
      </View>
    
    <View style={{
        display:'flex',
        flexDirection:'row',
        margin:8,
        gap:8
    }}>
        <TouchableOpacity style={styles.messagebtn}
        onPress={()=>onMessageBtnClick()}
        >
        <Text style={{
            textAlign:'center',
            fontFamily:'outfit-medium',
            color:Colors.PRIMARY,
            fontSize:18
        }}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingbtn}
        onPress={()=>setShowModal(true)}>
        <Text style={{
            textAlign:'center',
            fontFamily:'outfit-medium',
            color:Colors.WHITE,
            fontSize:18
        }}>Book</Text>
        </TouchableOpacity>
    </View>
     <Modal
     animationType='slide'
     visible={showModal}
     >
   <BookingModal 
   businessId={business._id}
   hideModal={()=>setShowModal(false)}/>
     </Modal>

     
    </View>
    </ScrollView>
   
    
    
  )
}
const styles = StyleSheet.create({
    backBtnContainer:{
     position:'absolute',
     zIndex:10,
     padding:20
    },
    infoContainer:{
        padding:20,
        display:'flex',
        gap:7
    },
    subContainer:{
        display:'flex',
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    },
    messagebtn:{
     padding:15,
     backgroundColor:Colors.WHITE,
     borderWidth:1,
     borderColor:Colors.PRIMARY,
     borderRadius:99,
     flex:1
    },
    bookingbtn:{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        flex:1
    }
})