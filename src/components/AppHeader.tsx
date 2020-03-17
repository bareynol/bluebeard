import React from 'react';
import { Header, Left, Thumbnail, Icon, Title, Body, Right, Button } from 'native-base';

import { useNavigation } from '@react-navigation/native';


const appLogo = require('images/BrianTV.png');

export default function AppHeader({title}) {
  const navigation = useNavigation();
  return (
    <Header>
      <Left style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 60}}>
        <Button transparent onPress={() => navigation.openDrawer()}>
          <Icon name="menu" type="MaterialIcons" />
        </Button>
        <Thumbnail source={appLogo} small square style={{marginLeft: 10}} />
      </Left>
      <Body style={{flexDirection: 'row'}}>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  )
}
