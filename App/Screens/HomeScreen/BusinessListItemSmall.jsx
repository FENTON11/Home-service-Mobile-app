import { View, Text,Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function BusinessListItemSmall({business,edit}) {
  const navigation=useNavigation()
  // console.log(business?.category,'business small')
  console.log(business,"The bsiness list items")
  return (
    <TouchableOpacity style={styles.imageContainer}onPress={()=>navigation.push('business-detail',{
      business:business
    })}>
      <Image
       source={{ uri: business?.images[0]}}
       style={styles.image}
      />
    {/* {business.images.map((image, index) => (
      <Image
        key={index}
        source={{ uri: image.url }}
        style={styles.image}
      />
    ))} */}
    <View style={styles.infoContainer}>
  
    <Text style={{fontSize:17, fontFamily:'outfit-medium'}}>{business?.name}</Text>
    <Text style={{fontSize:13, fontFamily:'outfit',color:Colors.GRAY}}>{business?.user?.email || 'not specified'}</Text>
    <Text style={{
      fontSize:10, 
      fontFamily:'outfit',
      padding:3,
      color:Colors.PRIMARY,
      backgroundColor:Colors.PRIMARY_LIGHT,
      borderRadius:3,
      alignSelf:'flex-start',
      paddingHorizontal:7
}}>{business?.category?.name}</Text>
    </View>
    {
      edit && <View>
        <Text>icon</Text>
      </View>
    }
  </TouchableOpacity>
 
  
  )
}
const styles = StyleSheet.create({
    imageContainer:{
     padding:10,
     backgroundColor:Colors.WHITE,
     borderRadius:10,
     height:120,
    },
    infoContainer:{
    padding:7,
    display:'flex',
    gap:3
    },
    image:{
     width:160,
     height:100,
     borderRadius: 10
    }
})