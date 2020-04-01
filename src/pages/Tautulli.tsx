import React from 'react';
import {serviceAddresses} from 'config';

import { Container} from 'native-base';
import AppHeader from 'components/AppHeader';
import WebView from 'react-native-webview';

export default function Tautulli() {
  return (
    <Container>
      <AppHeader title="Tautulli" />
      <WebView
        source={{
          uri: serviceAddresses.tautulli,
        }}
      />
    </Container>
  )
}
