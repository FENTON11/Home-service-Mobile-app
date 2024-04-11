import React,{useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,Image, ToastAndroid } from 'react-native';
import Colors from '../../Utils/Colors';
import * as ImagePicker from 'expo-image-picker';
import { updateData } from '../../Utils/apiCalls';
import { useAppContext } from '../../context/AppContext';
const UpdateBusiness = ({route}) => {
  const {token} = useAppContext();
    const {name,address,contactPerson:contact,category,email,image,about,businessID}= route.params
  const [business,setBusiness] = useState({name,contact,email,address,about,images:image,category});
  const [disabled,setdisabled] = useState(true)
  const [loading,setLoading] = useState(false)
  const noavatar= require("../../../assets/images/add.png")
  const url = noavatar;
  const handlechange = (name,value) =>{
    setBusiness(prev => ({...prev,[name]:value}))
  }
  const handleSubmit = async () =>{
    try {
      setLoading(true);
      const res = await updateData(`/business/${businessID}`,business,token)
      console.log(res);
      ToastAndroid.show("updated succefully",ToastAndroid.LONG)
    } catch (error) {
      console.log(error);
      ToastAndroid.show("something went wrong",ToastAndroid.LONG)
    }
    finally{
      setLoading(false);
    }
  }
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
      setBusiness(prev => ({...prev,images:result.assets[0].uri}))
      // setImage(result.assets[0].uri);
    }
    }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Update Business</Text>
      </View>
      <View>
         <TouchableOpacity style={styles.imgContainer}  onPress={pickImage} >
          {
            business?.images ?
            <Image style = {styles.image} source={{uri:business.images}} />:
          <Image style = {styles.image} source={url} />
          }
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <TextInput onChangeText={text => handlechange('name',text) } value={business.name} style={styles.inputStyle} placeholder='Enter Business Name' />
        <TextInput onChangeText={text => handlechange('contact',text) } value={business.contact} style={styles.inputStyle} placeholder='Enter Contact Person' />
        <TextInput onChangeText={text => handlechange('address',text) } value={business.address} style={styles.inputStyle} placeholder='Enter Address' />
        <TextInput
          style={[styles.inputStyle, styles.textArea]}
          multiline={true}
          numberOfLines={6}
          onChangeText={text => handlechange('about',text) } 
          value={business.about}
          placeholder="Enter your text here..."
        />
        <TextInput onChangeText={text => handlechange('email',text) }  value={business.email} style={styles.inputStyle} placeholder='Enter Email' />
        <TextInput onChangeText={text => handlechange('category',text) }  value={business.category} style={styles.inputStyle} placeholder='Enter Category Name' />

        <TouchableOpacity style={styles.uploadBtn} onPress={handleSubmit} >
          {
            loading ?
            <Text style={styles.uploadBtnText}>loading...</Text>:
          <Text style={styles.uploadBtnText}>Update Business</Text>
          }
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width:140,
    // maxWidth:'100%',
    height:140,
    borderRadius:50,
    objectFit:'contain'
  },
  header: {
    height: 60,
    minHeight:60,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  imgContainer:{
    // backgroundColor:'red',
    height:150,
    alignItems:'center',
   
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  formContainer: {
    padding: 20,
  },
  inputStyle: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickBtn: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadBtn: {
    backgroundColor: Colors.PRIMARY,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtnText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateBusiness;
