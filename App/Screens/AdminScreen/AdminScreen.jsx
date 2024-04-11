import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AdminStackNavigation from "../../Navigations/AdminStackNavigation"
import Colors from '../../Utils/Colors'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { names } from '../../../names/Names'


export default function AdminScreen({navigation}) {
  return (
    <View>
     <Text style={styles.heading} >Welcome To Dashboard</Text>
     <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate(names.MANAGEBUSINESS)}>
        <AntDesign style={styles.icon} name={"edit"}/>
        <Text style={styles.btnText}>Manage Businesses </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate(names.MANAGE_CATEGORY)} style={styles.btn}>
        <AntDesign style={styles.icon} name={"edit"}/>
        <Text style={styles.btnText}>Manage Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate(names.ADD)}>
        <MaterialIcons style={styles.icon} name={"add-box"}/>
        <Text style={styles.btnText}>Add Business</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}onPress={()=> navigation.navigate(names.ADDCATEGORY)}>
        <MaterialIcons style={styles.icon} name={"add-box"}/>
        <Text style={styles.btnText}>Add Category</Text>
      </TouchableOpacity>
     </View>
    </View>
  )
}
const styles= StyleSheet.create({
  heading:{
  backgroundColor:Colors.PRIMARY,
  color:Colors.WHITE,
  textAlign:"center",
  padding:10,
  fontSize:20,
  borderBottomLeftRadius:5,
  borderBottomRightRadius:5,
  fontWeight:"bold"

  },
  btnContainer:{
   margin:20

  },
  btn:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:Colors.PRIMARY,
    padding:20,
    borderRadius:10,
    marginBottom:25
    },
    icon:{
    fontSize:25,
    marginRight:10,
    marginLeft:10
    },
  btnText:{
    textAlign:"center",
    fontSize:18,
    fontWeight:"bold",
    color:Colors.GREEN
  }
})