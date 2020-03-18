import React from 'react';
import { Container, Content, Text } from 'native-base';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import {serviceAddresses} from 'config';
import AppHeader from 'components/AppHeader';
// import CustomHeaderWebView from 'components/CustomHeaderWebView';

export default function Transmission() {
  console.log({serviceAddresses})
  return (
    <Container>
      <AppHeader title="Transmission" />
      {/* <CustomHeaderWebView
        source={{
          uri: serviceAddresses.transmission,
          headers: {"Authorization": "Basic YnJpYW46VGVzdGluZyQk"},
        }}
      /> */}
    </Container>
  )
}
