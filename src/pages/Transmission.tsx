import React from 'react';
import {serviceAddresses} from 'config';
import { Container, Content} from 'native-base';
import { View, Button, Linking } from 'react-native';

import AppHeader from 'components/AppHeader';
import CurrentDownloads from 'components/CurrentDownloads';

export default function Transmission() {

  return (
    <Container>
      <AppHeader title="Transmission" />
      <Content padder>
        <View style={{marginVertical: 40}}>
          <Button title="Open Transmission" onPress={() => {
            Linking.openURL(`${serviceAddresses.transmission}`)
          }} />
        </View>
        
        <CurrentDownloads />
      </Content>
    </Container>
  )
}
