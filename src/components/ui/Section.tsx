import React from 'react';
import { View, Text } from 'react-native';

export default function Section({label, children}) {
  return (
    <View style={{marginHorizontal: 10, marginTop: 30}}>
      <Text style={{fontSize: 20, color: 'white', marginBottom: 10}}>{label}</Text>
      {children}
    </View>
  )
}
