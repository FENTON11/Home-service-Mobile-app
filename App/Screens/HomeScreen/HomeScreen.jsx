import React,{useState} from 'react';
import { View, ScrollView ,RefreshControl} from 'react-native';
import Header from './Header';
import Slider from './Slider';
import Categories from './Categories';
import BusinessList from './BusinessList';
import { getData } from '../../Utils/apiCalls'
import { Text } from "react-native";
import { useAppContext } from '../../context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const {user} = useAppContext()
  const[businessList,setBusinessList]=useState([])
  const [searchTerm,setSearchTerm] = useState('')
  const [search,setSearch] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async ()=>{
    try{
      const res = await getData('/business');
      if(res){
        setBusinessList(res?.businesses)
      }
    }catch(error){
      console.log(error)
    }
  }
   const handleRefresh = () => {
    setRefreshing(true); 
    fetchData(); 
  };
  
  console.log(user);
  
 
 



  return (
    <SafeAreaView 
     refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#9Bd35A', '#689F38']}
            tintColor="#689F38"
            title="refleshing..."
            titleColor="#00ff00"
          />}
    style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearch ={setSearch}  />
        <View style={{ paddingVertical: 20 }}>
          {/* Slider */}
          <Slider />

          {/* Categories */}
          <Categories />

          {/* Business List */}
          <BusinessList businessList={businessList} setBusinessList={setBusinessList} searchTerm={searchTerm} setSearchTerm={setSearchTerm} search={search} setSearch ={setSearch} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
