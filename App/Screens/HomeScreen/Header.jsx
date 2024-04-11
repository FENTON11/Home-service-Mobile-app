import { View, Image,StyleSheet ,Text, TextInput,TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
// import url from  "../../../assets/"
export default function Header({setSearchTerm,setSearch,searchTerm}) {
  const noavatar= require("../../../assets/images/noavatar.jpeg")
    const {user, isLoading}=useAppContext();
    const url = user?.profilepic || noavatar
    const handleSearch =()=>{
      // searchTerm?.length !==0 && setSearch(true)
       setSearch(true)
    }
  return  (
<View style={styles.container}> 
{/*Profile Section*/}
  <View style={styles.profileMainContainer}>
    <View style={styles.profileContainer}>
      {
        user?.profilepic ?
        <Image source={{uri:user?.profilepic}} style={styles.userImage}/>:
        <Image source={noavatar} style={styles.userImage}/>
      }
        <View>
        <Text style={{color:Colors.WHITE,fontFamily:'outfit-medium'}}>Welcome,
        </Text>
        {
          user?.name ? 
          <Text style={{color:Colors.WHITE,
          fontSize:20,fontFamily:'outfit'}}>{user?.name}</Text>:
          <Text style={{color:Colors.WHITE,
          fontSize:20,fontFamily:'outfit'}}>Guest</Text>
        }

        </View>
    </View>
    <FontAwesome name="bookmark-o" size={27} color="white" />
    </View>
    {/* Search Bar Section */}
    <View style={styles.searchBarContainer}> 
        <TextInput onChangeText={text => setSearchTerm(text)} value ={searchTerm} placeholder='Search'
        style={styles.textInput}/>
        <TouchableOpacity onPress ={handleSearch} >
        <FontAwesome name="search" 
        style={styles.searchbtn}
        size={24} color={Colors.PRIMARY} />
          </TouchableOpacity>
    </View>
</View>
  )
}
const styles = StyleSheet.create({
    container:{
    padding:20,
    paddingTop:40,
    backgroundColor:Colors.PRIMARY,
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25
    },
    profileMainContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    profileContainer:{
     display:'flex',
     flexDirection:'row',
     alignItems:'center',
     gap:10
    },
    textInput:{
     padding:7,
     paddingHorizontal:16,
     backgroundColor:Colors.WHITE,
     borderRadius:8,
     width:'85%',
     fontSize:16,
     fontFamily:'outfit'
    },
    searchBarContainer:{
     marginTop:15,
     display:'flex',
     flexDirection:'row',
     gap: 10,
     marginBottom:10
    },
    searchbtn:{
      backgroundColor: Colors.WHITE,
      padding:10,
      borderRadius:8
    },
 userImage:{
    width:45,
    height:45,
    borderRadius:99
   }
})