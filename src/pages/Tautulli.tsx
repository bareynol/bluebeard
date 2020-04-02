import React from 'react';
import {serviceAddresses} from 'config';

import { Container} from 'native-base';
import AppHeader from 'components/AppHeader';
import WebViewWrapper from 'components/ui/WebViewWrapper'

export default function Tautulli() {
  return (
    <Container>
      <AppHeader title="Tautulli" />
      <WebViewWrapper
        source={{
          uri: serviceAddresses.tautulli,
        }}
      />
    </Container>
  )
}
