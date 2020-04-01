import React from 'react';
import {serviceAddresses} from 'config';

import { Container } from 'native-base';
import AppHeader from 'components/AppHeader';
import WebView from 'react-native-webview';

import {SONARR_USERNAME, SONARR_PASSWORD} from 'react-native-dotenv';

export default function Sonarr() {
  return (
    <Container>
      <AppHeader title="Sonarr" />
      <WebView
        source={{
          uri: `${serviceAddresses.sonarr}/login?returnUrl=/`,
          method: "POST",
          body: `username=${encodeURIComponent(SONARR_USERNAME)}&password=${encodeURIComponent(SONARR_PASSWORD)}&rememberMe=on`
        }}
      />
    </Container>
  )
}
