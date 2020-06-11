import React, { useRef } from 'react';
import {serviceAddresses} from 'config';

import { Container} from 'native-base';
import AppHeader from 'components/AppHeader';
import WebViewWrapper from 'components/ui/WebViewWrapper'
import WebviewRefreshButton from 'components/ui/WebviewRefreshButton';

export default function Tautulli() {
  const webviewRef = useRef(null);
  return (
    <Container>
      <AppHeader title="Tautulli" icons={<WebviewRefreshButton webviewRef={webviewRef} />} />
      <WebViewWrapper
        ref={webviewRef}
        source={{
          uri: serviceAddresses.tautulli,
        }}
      />
    </Container>
  )
}
