import React, { useRef } from 'react';
import {serviceAddresses} from 'config';

import { Container } from 'native-base';
import AppHeader from 'components/AppHeader';
import WebViewWrapper from 'components/ui/WebViewWrapper'

import {RADARR_USERNAME, RADARR_PASSWORD} from 'react-native-dotenv';
import WebviewRefreshButton from 'components/ui/WebviewRefreshButton';

export default function Radarr() {
  const webviewRef = useRef(null);
  return (
    <Container>
      <AppHeader title="Radarr" icons={<WebviewRefreshButton webviewRef={webviewRef} />} />
      <WebViewWrapper
        ref={webviewRef}
        source={{
          uri: `${serviceAddresses.radarr}/login?returnUrl=/`,
          method: "POST",
          body: `username=${encodeURIComponent(RADARR_USERNAME)}&password=${encodeURIComponent(RADARR_PASSWORD)}&rememberMe=on`
        }}
      />
    </Container>
  )
}
