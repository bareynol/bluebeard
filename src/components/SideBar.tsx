import React from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
import { Image, ImageBackground } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Background from 'components/ui/Background';
import LinearGradient from 'react-native-linear-gradient';

const logo = require('images/BrianTV.png');

export default function SideBar(props) {
  return (
    <LinearGradient colors={['#0c1121', '#09163c', '#203064']} style={{height: '100%', flex: 1}}>
      <DrawerContentScrollView {...props}>
        <Image
          square
          style={{height: 200, width: '50%', alignSelf: 'center'}}
          source={logo}
          resizeMode="contain"
        />
        <DrawerItemList {...props} activeTintColor="#298fff" inactiveTintColor="#007aff" />
      </DrawerContentScrollView>
    </LinearGradient>
  )
}
