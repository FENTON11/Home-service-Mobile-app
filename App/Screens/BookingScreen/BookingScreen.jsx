import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'
import GlobalApi from '../../Utils/GlobalApi'
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem'
import { useAppContext } from '../../context/AppContext'
import {useFetch} from '../../Utils/useFetch'
export default function BookingScreen() {
  const {user}=useAppContext();
  const [bookingList,setBookingList]=useState([])
  const {loading,error,data} = useFetch('/booking')
  useEffect(()=>{
    data && setBookingList(data.bookings)
    // console.log(data,'data')
  },[data])

  useEffect(()=>{
    console.log(bookingList,'booking list')
  },[bookingList])
  const getUserBookings=()=>{
    // setLoading(true)
    GlobalApi.getUserBookings(user.email).then(resp=>{
      if(resp){
        console.log(resp, 'main booking page')
        setBookingList(resp.bookings);
        // setLoading(false)

      }

    })
  }
  if(loading){
    return <Text>loading...</Text>
  }
  if(error){
    return <Text>something went wrong</Text>
  }
  return (
    <View style={{padding:20}}>
    <Text style={{fontFamily:'outfit',fontSize:26}}>My Bookings</Text>
    <View>
     <FlatList
      data={bookingList}
      // onRefresh={()=>getUserBookings()}
      // refreshing={loading}
      renderItem={({item,index})=> (
       <BusinessListItem 
       showMore
       setBookingList ={setBookingList}
       business={item?.business}
       booking={item}
       />
      )}
      />
    </View>
    </View>
  )
}