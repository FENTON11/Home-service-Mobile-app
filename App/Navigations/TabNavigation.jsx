import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import HomeNavigation from './HomeNavigation';
import BookingNavigation from './BookingNavigation';
import ProfileNavigation from './ProfileNavigation';
import AdminScreen from '../Screens/AdminScreen/AdminScreen';
;
import { names } from '../../names/Names';
import { useAppContext } from '../context/AppContext';

const Tab = createBottomTabNavigator();

export default function TabNavigation({navigation}) {
  const { user } = useAppContext();
  // Check if the user's email matches fencurt99@gmail.com
  // const isAdmin = user?.primaryEmailAddress === 'fencurt99@gmail.com';
  useEffect(()=>{
    
    if(!user){

      navigation.navigate(names.SINGIN)
      return
    }
  },[user])
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}>
        
          <Tab.Screen
            name={names.HOME}
            component={HomeNavigation}
            options={{
              tabBarLabel: ({ color }) => (
                <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                  Home
                </Text>
              ),
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="booking"
            component={BookingNavigation}
            options={{
              tabBarLabel: ({ color }) => (
                <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                  Book
                </Text>
              ),
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="bookmark" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="profile"
            component={ProfileNavigation}
            options={{
              tabBarLabel: ({ color }) => (
                <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                  Profile
                </Text>
              ),
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user-circle" size={size} color={color} />
              ),
            }}
          />
{    user?.role === "admin" &&  <Tab.Screen
          name="admin"
          component={AdminScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                Admin
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cog" size={size} color={color} />
            ),
          }}
        />}
    </Tab.Navigator>
  );
}
