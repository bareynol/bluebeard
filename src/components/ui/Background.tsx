import React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const bgArt = require('images/bg_art.png');

export default function Background(props: any) {
  return (
    <LinearGradient colors={['#203064', '#09163c', '#0c1121']} style={{flex: 1}}>
      <ImageBackground
        source={bgArt}
        resizeMode="cover"
        style={{width: '100%', height: '100%'}}
        imageStyle={{width: "100%", height: '100%', tintColor: '#ffffff', opacity: 0.25}}
        blurRadius={4}
      >
        {props.children}
      </ImageBackground>
    </LinearGradient>
  )
}
