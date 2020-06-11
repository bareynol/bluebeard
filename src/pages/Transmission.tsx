import React from 'react';
import {serviceAddresses} from 'config';
import { Container, Content, Button, Text} from 'native-base';
import { View, Linking } from 'react-native';

import AppHeader from 'components/AppHeader';
import TorrentInfo from 'components/TorrentInfo';

export default function Transmission() {

  return (
    <Container>
      <AppHeader title="Transmission" />
      <Content padder>
        <View style={{marginVertical: 10}}>
          <Button primary block rounded onPress={() => {
            Linking.openURL(`${serviceAddresses.transmission}`)
          }}>
            <Text>Open Transmission</Text>
          </Button>
        </View>
        
        <TorrentInfo />
      </Content>
    </Container>
  )
}
