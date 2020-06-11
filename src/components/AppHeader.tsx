import React from 'react';
import { Header, Left, Thumbnail, Icon, Title, Body, Right, Button } from 'native-base';

import { useNavigation } from '@react-navigation/native';


const appLogo = require('images/BrianTV.png');

export default function AppHeader({title, icons, useBackButton=false}: AppHeaderProps) {
  const navigation = useNavigation();
  return (
    <Header style={{paddingTop: 0}}>
      <Left style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        {!useBackButton ? (
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu" type="MaterialIcons" />
          </Button>
        ) : (
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" type="MaterialIcons" />
          </Button>
        )}
      </Left>
      <Body style={{flexDirection: 'row'}}>
        <Title>{title}</Title>
      </Body>
      <Right style={{alignItems: 'center'}}>
        <Thumbnail source={appLogo} small square />
        {icons}
      </Right>
    </Header>
  )
}

export interface AppHeaderProps {
  title: string;
  icons?: any;
  useBackButton?: boolean;
}