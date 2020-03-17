import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ServerStats from 'pages/ServerStats';
import Background from 'components/ui/Background';
import SideBar from 'components/SideBar';
import Plex from 'pages/Plex';
import Sonarr from 'pages/Sonarr';
import Ombi from 'pages/Ombi';
import { Thumbnail } from 'native-base';

const appLogo = require('images/BrianTV.png');
const plexLogo = require('images/plex_logo.png');
const sonarrLogo = require('images/sonarr_logo.png');
const ombiLogo = require('images/ombi_logo.png');

const Drawer = createDrawerNavigator();

const SCREENS = [
  {name: "Dashboard", component: ServerStats, icon: appLogo},
  {name: "Plex", component: Plex, icon: plexLogo},
  {name: "Sonarr", component: Sonarr, icon: sonarrLogo},
  {name: "Ombi", component: Ombi, icon: ombiLogo},
]

export default function AppRouter() {
  return (
    <NavigationContainer>
      <Background>
        <Drawer.Navigator
          initialRouteName="ServerStats"
          sceneContainerStyle={{backgroundColor: 'transparent'}}
          drawerContent={props => <SideBar {...props} />}
        >
          {SCREENS.map(screen => (
            getDrawerScreen(screen)
          ))}
        </Drawer.Navigator>
      </Background>
    </NavigationContainer>
  )
}

function getDrawerScreen(props) {
  return (
    <Drawer.Screen
      {...props}
      key={props.name}
      options={{
        ...props.options,
        drawerIcon: (drawerIconProps) => <SidebarIcon {...drawerIconProps} source={props.icon} />
      }}
    />
  )
}

function SidebarIcon(props) {
  return (
    <Thumbnail
      small
      square
      {...props}
      source={props.source}
    />
  )
}
