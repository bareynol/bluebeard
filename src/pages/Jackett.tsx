import React, { useRef } from 'react';
import {serviceAddresses} from 'config';

import { Container} from 'native-base';
import AppHeader from 'components/AppHeader';
import WebViewWrapper from 'components/ui/WebViewWrapper'
import {JACKETT_PASSWORD} from 'react-native-dotenv';
import WebviewRefreshButton from 'components/ui/WebviewRefreshButton';

export default function Jackett() {
  const webviewRef = useRef(null);
  return (
    <Container>
      <AppHeader title="Jackett" icons={<WebviewRefreshButton webviewRef={webviewRef} />} />
      <WebViewWrapper
        ref={webviewRef}
        source={{
          uri: `${serviceAddresses.jackett}/UI/Dashboard`,
          method: "POST",
          body: `password=${encodeURIComponent(JACKETT_PASSWORD)}`
        }}
      />
    </Container>
  )
}
