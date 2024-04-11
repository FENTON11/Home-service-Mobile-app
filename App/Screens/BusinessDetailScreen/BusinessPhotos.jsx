import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import Heading from '../../Components/Heading';

export default function BusinessPhotos({ business }) {
  return (
    <View>
      <Heading text={'Photos'} />
      <FlatList
        data={business.images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} 
          style={{ width: '50%', height: 120,borderRadius:15,objectFit:"contain" }} />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
      />
    </View>
  );
}
