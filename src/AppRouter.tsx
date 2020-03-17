import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ServerStats from 'pages/ServerStats';
import Background from 'components/ui/Background';
import SideBar from 'components/SideBar';
import Plex from 'pages/Plex';
import Sonarr from 'pages/Sonarr';
import Ombi from 'pages/Ombi';

const Drawer = createDrawerNavigator();

export default function AppRouter() {
  return (
    <NavigationContainer>
      <Background>
        <Drawer.Navigator
          initialRouteName="ServerStats"
          sceneContainerStyle={{backgroundColor: 'transparent'}}
          drawerContent={props => <SideBar {...props} />}
        >
          <Drawer.Screen name="Dashboard" component={ServerStats} />
          <Drawer.Screen name="Plex" component={Plex} />
          <Drawer.Screen name="Sonarr" component={Sonarr} />
          <Drawer.Screen name="Ombi" component={Ombi} />
        </Drawer.Navigator>
      </Background>
    </NavigationContainer>
  )
}
