import React from 'react';
import {serviceAddresses} from 'config';

import { Container } from 'native-base';
import AppHeader from 'components/AppHeader';
import WebViewWrapper from 'components/ui/WebViewWrapper'

import {RADARR_USERNAME, RADARR_PASSWORD} from 'react-native-dotenv';

export default function Radarr() {
  return (
    <Container>
      <AppHeader title="Radarr" />
      <WebViewWrapper
        source={{
          uri: `${serviceAddresses.radarr}/login?returnUrl=/`,
          method: "POST",
          body: `username=${encodeURIComponent(RADARR_USERNAME)}&password=${encodeURIComponent(RADARR_PASSWORD)}&rememberMe=on`
        }}
      />
    </Container>
  )
}
