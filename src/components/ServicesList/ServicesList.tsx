import React from 'react';
import { Card, List, ListItem, Left, Thumbnail, Text, Body, Right, CardItem } from 'native-base';
import moment from 'moment';
import { useSelector } from 'react-redux';
import ServiceItem from './ServiceItem';
import { View, ActivityIndicator } from 'react-native';

const plexLogo = require('images/plex_logo.png');
const sonarrLogo = require('images/sonarr_logo.png');
const radarrLogo = require('images/radarr_logo.png');
const transmissionLogo = require('images/transmission_logo.png');
const jackettLogo = require('images/jackett_logo.png');
const ombiLogo = require('images/ombi_logo.png');
const tautulliLogo = require('images/tautulli_logo.png');

export default function ServicesList() {
  const services = useSelector(state => state.serverStats.stats?.services);

  return (
    <Card style={{marginTop: 10, marginBottom: 10}}>
      <CardItem header bordered>
        <Text>Services</Text>
      </CardItem>
      {services ? (
        <List>
          <ServiceItem title="Plex" logo={plexLogo} service={services.plex} />
          <ServiceItem title="Sonarr" logo={sonarrLogo} service={services.sonarr} />
          <ServiceItem title="Radarr" logo={radarrLogo} service={services.radarr} />
          <ServiceItem title="Transmission" logo={transmissionLogo} service={services.transmission} />
          <ServiceItem title="Jackett" logo={jackettLogo} service={services.jackett} />
          <ServiceItem title="Ombi" logo={ombiLogo} service={services.ombi} />
          <ServiceItem title="Tautulli" logo={tautulliLogo} service={services.tautulli} />
        </List>
      ) : (
        <CardItem style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text>Loading disks...</Text>
          <ActivityIndicator />
        </CardItem>
      )}
    </Card>
  )
}
