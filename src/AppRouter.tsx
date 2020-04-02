import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ServerStats from 'pages/ServerStats';
import Background from 'components/ui/Background';
import SideBar from 'components/SideBar';
import Plex from 'pages/Plex';
import Sonarr from 'pages/Sonarr';
import Radarr from 'pages/Radarr';
import Ombi from 'pages/Ombi';
import Tautulli from 'pages/Tautulli';
import Transmission from 'pages/Transmission';
import Jackett from 'pages/Jackett';
import { Thumbnail } from 'native-base';

const appLogo = require('images/BrianTV.png');
const plexLogo = require('images/plex_logo.png');
const sonarrLogo = require('images/sonarr_logo.png');
const radarrLogo = require('images/radarr_logo.png');
const ombiLogo = require('images/ombi_logo.png');
const transmissionLogo = require('images/transmission_logo.png');
const tautulliLogo = require('images/tautulli_logo.png');
const jackettLogo = require('images/jackett_logo.png');

const Drawer = createDrawerNavigator();

const SCREENS = [
  {name: "Dashboard", component: ServerStats, icon: appLogo,},
  {name: "Ombi", component: Ombi, icon: ombiLogo, options: {serviceName: 'ombi', title: "Ombi (Easy Requests)"}},
  {name: "Sonarr", component: Sonarr, icon: sonarrLogo, options: {serviceName: 'sonarr', title: "Sonarr (TV Series)"}},
  {name: "Radarr", component: Radarr, icon: radarrLogo, options: {serviceName: 'radarr', title: "Radarr (Movies)"}},
  {name: "Transmission", component: Transmission, icon: transmissionLogo, options: {serviceName: 'transmission', title: "Transmission (Torrents)"}},
  {name: "Tautulli", component: Tautulli, icon: tautulliLogo, options: {serviceName: 'tautulli', title: "Tautulli (Plex Stats)"}},
  {name: "Plex", component: Plex, icon: plexLogo, options: {serviceName: 'plex'}},
  {name: "Jackett", component: Jackett, icon: jackettLogo, options: {serviceName: 'jackett'}},
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
        drawerIcon: (drawerIconProps) => <SidebarIcon {...drawerIconProps} source={props.icon} />,

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
