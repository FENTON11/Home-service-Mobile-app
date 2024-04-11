// BusinessListByCategoryScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import PageHeading from '../../Components/PageHeading';
import { useFetch } from '../../Utils/useFetch';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BusinessListByCategoryScreen() {
  const route = useRoute();
  const { category } = route.params;
  const navigation=useNavigation();
  const[businessList, setBusinessList]=useState();
  const {loading,error,data} =useFetch(`/business/category/${category}`)
  useEffect(() => {
    data && setBusinessList(data.businesses)
    console.log(data,"from list business");
  }, [data]);

  const getBusinessByCategory=()=>{
    GlobalApi.getBusinessListByCategory(category).then(resp=>{
      setBusinessList(resp.businessLists)
    })
  }
  if(error){
    return<Text>something went wrong</Text>
  }
  if(loading){
    return<Text>loading...</Text>
  }

  return (
    <SafeAreaView style={{padding:20, paddingTop:30}}>
     <PageHeading title={category}/>
     {  businessList?.length>0? <FlatList
      data={businessList}
      style={{marginTop:15}}
      renderItem={({item,index})=>(
        <BusinessListItem business={item}/>
      )}
      />:
      <Text style={{fontFamily:'outfit-medium',
    fontSize:20, textAlign:'center',marginTop:'20%'}}>No Business Found </Text>}
    </SafeAreaView>
  );
}

