import React from 'react';
import { Container, Content, Text } from 'native-base';
import { View } from 'react-native';
import AppHeader from 'components/AppHeader';

export default function Plex() {
  return (
    <Container>
      <AppHeader title="Plex" />
    </Container>
  )
}
