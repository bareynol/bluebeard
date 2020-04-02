import React from 'react';
import {serviceAddresses} from 'config';

import { Container} from 'native-base';
import AppHeader from 'components/AppHeader';
import WebViewWrapper from 'components/ui/WebViewWrapper'
import {JACKETT_PASSWORD} from 'react-native-dotenv';

export default function Jackett() {
  return (
    <Container>
      <AppHeader title="Jackett" />
      <WebViewWrapper
        source={{
          uri: `${serviceAddresses.jackett}/UI/Dashboard`,
          method: "POST",
          body: `password=${encodeURIComponent(JACKETT_PASSWORD)}`
        }}
      />
    </Container>
  )
}
