import React from 'react';
import { Container, Content, Text } from 'native-base';
import { View, Button } from 'react-native';

import AppHeader from 'components/AppHeader';
import CurrentDownloads from 'components/CurrentDownloads';

export default function Transmission() {

  return (
    <Container>
      <AppHeader title="Transmission" />
      <Content padder>
        <View style={{marginVertical: 40}}>
          <Button title="Open Transmission" onPress={() => {}} />
        </View>
        
        <CurrentDownloads />
      </Content>
    </Container>
  )
}
