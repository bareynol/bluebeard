import React from 'react';
import {serviceAddresses} from 'config';

import { Container } from 'native-base';
import AppHeader from 'components/AppHeader';
import WebView from 'react-native-webview';

import {RADARR_USERNAME, RADARR_PASSWORD} from 'react-native-dotenv';

export default function Radarr() {
  return (
    <Container>
      <AppHeader title="Radarr" />
      <WebView
        source={{
          uri: `${serviceAddresses.radarr}/login?returnUrl=/`,
          method: "POST",
          body: `username=${encodeURIComponent(RADARR_USERNAME)}&password=${encodeURIComponent(RADARR_PASSWORD)}&rememberMe=on`
        }}
      />
    </Container>
  )
}
