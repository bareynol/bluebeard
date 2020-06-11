import React from 'react';
import AppHeader from 'components/AppHeader';
import { Container, List, ListItem, Text } from 'native-base';
import { Linking } from 'react-native';
import ThemeSetting from 'pages/Settings/ThemeSetting';

export default function Settings(props) {
  return (
    <Container>
      <AppHeader title="Settings" />
      <List>
        <ListItem
          noIndent
          onPress={() => {
            Linking.openURL('https://bareynol.gitlab.io/public_site/privacy.html')
          }}
        >
          <Text>Privacy Policy</Text>
        </ListItem>
        <ThemeSetting />
      </List>
    </Container>
    
  )
}
