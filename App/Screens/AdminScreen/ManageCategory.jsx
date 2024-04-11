import { View, Text ,StyleSheet, FlatList, TouchableOpacity, Image,ScrollView, ToastAndroid} from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Colors from '../../Utils/Colors'
import BusinessListItemSmall from '../HomeScreen/BusinessListItemSmall'
import { names } from '../../../names/Names'
import { useFetch } from '../../Utils/useFetch'
import { deleteData } from '../../Utils/apiCalls'
import { useAppContext } from '../../context/AppContext'
export default function ManageCategory({navigation}) {
  const {token} = useAppContext();
    const[businessList,setBusinessList]=useState([])
    const {data,loading,error} = useFetch("/categories");
    useEffect(()=>{
      data && setBusinessList(data.categories)
    },[data])
    useEffect(()=>{
        // getBusinessList();
    },[])

  if(loading){
    return <Text>loading</Text>
  }
  if(error){
    return <Text>something went wrong</Text>
  }
    const getBusinessList = () => {
        GlobalApi.getBusinessList().then(resp => {
        setBusinessList(resp.businessLists); 
        console.log(resp.businessLists);
        });
    };

    const handleDelete= async (id)=>{
      try {
        const res = await deleteData(`/categories/${id}`,token)
        console.log(res);
        ToastAndroid.show("delete succefully",ToastAndroid.LONG)
        setBusinessList(prev=> prev.filter(item=>item._id !==id))
      } catch (error) {
        console.log(error);
        ToastAndroid.show("something went wrong",ToastAndroid.LONG)
      }
    }

    
  return (
    <ScrollView style={styles.container}>
      <FlatList
      data={businessList}
      renderItem={({item, index})=>{
        const {name,icon,_id:id}= item
   return (<View key={index} style={styles.businessView}>
           
            <View>
            
      <Image
        source={{ uri: icon}}
        style={styles.image}
      />
  
            </View>

            <View>

    <Text style={{fontSize:17, fontFamily:'outfit-medium'}}>{name}</Text>
            </View>
           <View style={styles.icon}>
        <TouchableOpacity onPress={()=>navigation.navigate(names.UPDATE_CATEGORY,{title:name,icon,id}) }>
            <Image source={require('../../../assets/images/edit.png')} style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleDelete(item._id)}>
            <Image source={require('../../../assets/images/delete.png')} style={styles.icon}/>
        </TouchableOpacity>
       </View>
            </View>
        )
      }}
       keyExtractor={(item, index) => index.toString()}
      />
       
    </ScrollView>
  )
}
const styles= StyleSheet.create({
    container:{
       flex:1 
    },
    businessView:{
        flexDirection:"row",
        width:'90%',
        alignSelf:'center',
        backgroundColor:Colors.WHITE,
        elevation:4,
        marginTop:10,
        borderRadius:5,
       justifyContent:"space-between",
        marginBottom:10,
        padding:10
        
    },
    icon:{
        width:24,
        height:24,
        gap:50
    },
    image:{
     height:120,
     width:150,
     objectFit:"contain"
    }

    
})