import { NavigationContainer } from '@react-navigation/native';
// import TabNavigation from './App/Navigations/TabNavigation';
import { useFonts } from 'expo-font';
import { AppContextProvider, useAppContext } from './App/context/AppContext';
import StackNavigation from './App/Navigations/StackNavigation';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GoogleOAuthProvider } from '@react-oauth/google';
export default function App() {
  const {setUser} = useAppContext()
  const getData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let token = await AsyncStorage.getItem('token');
      user = JSON.parse(user)
      token = JSON.parse(token)
      return {token,user}
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  useEffect(()=>{
     getData().then(res=>{
      const {user,token} = res
      setUser({token,user})
      // console.log(user,token);

    })

  },[])
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });
  return (
    // <GoogleOAuthProvider>
    <AppContextProvider>
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
    </AppContextProvider>
    // </GoogleOAuthProvider>
  
  );
}

