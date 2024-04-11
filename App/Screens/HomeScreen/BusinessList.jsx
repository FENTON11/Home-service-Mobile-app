import { View, Text, FlatList, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import BusinessListItemSmall from './BusinessListItemSmall'
import { useFetch } from '../../Utils/useFetch'
import { getData } from '../../Utils/apiCalls'
export default function BusinessList({setSearch,search,searchTerm,setSearchTerm,businessList,setBusinessList}) {
  const {data,loading,error} = useFetch("/business");
  useEffect(()=>{
    data && setBusinessList(data.businesses)
  },[data])

  useEffect(()=>{

    if(search){
      searchBusinesses()
      console.log('search now...',searchTerm)
    }
  },[search])

  const searchBusinesses = async ()=>{
    try{
      const res = await getData(`/business/search?searchTerm=${searchTerm}`)
      if(res){
        res && setBusinessList(res?.businesses)
        setSearch(false)
        console.log('new response',res)
      }
    }catch(error){
      console.log(error)
    }
  }

if(loading){
  return <Text>loading</Text>
}
if(error){
  return <Text>something went wrong</Text>
}
    // useEffect(()=>{
    //     getBusinessList();
    // },[])
    const getBusinessList = () => {
        GlobalApi.getBusinessList().then(resp => {
            // console.log(resp);
            setBusinessList(resp.businessLists); // Update the state with the correct property
        });
    };
    
  return (
    <View style={{marginTop:20}}>
    <Heading text={'Latest Business'}isViewAll={true}/>
    <FlatList
    data={businessList}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    renderItem={({item,index})=>(
         <View style={{marginRight:10}}>
        <BusinessListItemSmall business={item}/>
         </View>
    )}
    keyExtractor={(item, index) => index.toString()}
    />
  
    
    </View>
  )
}