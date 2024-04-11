import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import {deleteData} from '../../Utils/apiCalls'
export default function BusinessListItem({setBookingList,showMore, business, booking }) {
  const navigation = useNavigation();
  // const [loading]
  // console.log(booking);

  const deleteBooking = async ()=>{
  try{
    const res = await deleteData(`/booking/delete/${booking._id}`)
    if(res){
      setBookingList(prev => prev.filter(item => item._id !== booking._id))
    }

  }catch(error){
    console.log(error)
  }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push('business-detail', {
          business: business,
        })
      }
    >
      <Image
        source={{ uri: business?.images[0] }}
        style={styles.image}
      />
      <View style={styles.subContainer}>
        <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 15 }}>
          {business?.user?.email|| 'not business email'}
        </Text>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 19 }}>
          {business?.name || 'no name'}
        </Text>
        <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 16 }}>
          <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />
          {business?.address || 'no address'}
        </Text>
        {booking?.date && <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 16 }}>
          {/* <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} /> */}
          {`${booking?.date} : ${booking?.time}`    || 'not speified date'}
        </Text>}

        {booking?.status && (
          <Text
            style={[
              {
                padding: 5,
                borderRadius: 5,
                fontSize: 14,
                alignSelf: 'flex-start',
              },
              booking.status === 'completed'
                ? { backgroundColor: Colors.LIGHT_GREEN, color: Colors.GREEN }
                : booking.bookingStatus === 'pending'
                ? { backgroundColor: Colors.LIGHT_RED, color: Colors.RED }
                : { color: Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT },
            ]}
          >
            {booking.status}
          </Text>
        )}

        {booking?.id && (
          <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 16 }}>
            <AntDesign name="calendar" size={24} color={Colors.PRIMARY} style={{marginRight:15}} />
            {booking.date} at {booking.time}
          </Text>
        )}
    { showMore &&   <TouchableOpacity onPress ={deleteBooking} style={{padding:10,backgroundColor:'tomato', borderRadius:5 }} >
        <Text style={{color:Colors.WHITE,fontSize:18,textTransform:'capitalize'}} >cancel booking</Text>
      </TouchableOpacity>}
      </View>

    </TouchableOpacity>
  );
}

const styles= StyleSheet.create({
    container:{
     padding:10,
     backgroundColor:Colors.WHITE,
     borderRadius:15,
     marginBottom:15,
     display:'flex',
     flexDirection:'row',
     gap:10
    },
    subContainer:{
        display:'flex',
        gap:8
    },
    image:{
        width:100,
        height:100,
        borderRadius:15
    }
})