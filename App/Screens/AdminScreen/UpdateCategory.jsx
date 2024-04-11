import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import Colors from '../../Utils/Colors';
import * as ImagePicker from 'expo-image-picker';
import { postData, updateData } from '../../Utils/apiCalls';
import { useAppContext } from '../../context/AppContext';

export default function UpdateCategory({route}) {
    const {token} = useAppContext()
    const {title,icon,id} = route.params
  const [category, setCategory] = useState({ name:title, image:icon });
  const [loading, setLoading] = useState(false);

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled) {
        console.log(result);
        setCategory(prevState => ({ ...prevState, image: result.assets[0].uri }));
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      setLoading(true); // Set loading state to true while processing
      // console.log(business);
      const res = await postData("/categories",{...category,icon:category.image});
      console.log(res);
      ToastAndroid.show('category created succefully', ToastAndroid.LONG);
      setCategory({ name: '', image: '' })
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('something went wrong', ToastAndroid.LONG);
    } finally {
      setLoading(false); // Reset loading state after processing
    }
    // Implement category addition functionality here
  };

  const handleChange = (name, value) => {
    setCategory(prevState => ({ ...prevState, [name]: value }));
  };
  const handleUpdate = async () =>{
    try {
      setLoading(true);
      const res = await updateData(`/categories/${id}`,category,token)
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Category</Text>
      </View>
      <TextInput
        placeholder='Enter Category Name'
        style={styles.inputStyle}
        value={category.name}
        onChangeText={text => handleChange('name', text)}
      />
      <TouchableOpacity style={styles.pickBtn} onPress={handleImagePicker}>
        {category.image ? (
          <Image style={styles.image} source={{ uri: category.image }} />
        ) : (
          <Image style={styles.image} source={require("../../../assets/images/add.png")} />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadBtn} onPress={handleUpdate}>
        <Text style={styles.uploadBtnText}> {loading ? "loading...":"update Category"} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    height: 60,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    paddingHorizontal: 15,
    marginTop: 30,
    alignSelf: 'center',
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  pickBtn: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderColor: Colors.PRIMARY,
    // borderWidth: 1,
  },
  uploadBtn: {
    backgroundColor: Colors.PRIMARY,
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtnText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
