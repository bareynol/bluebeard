import ServerStats from './ServerStats';

import React, { useEffect, useCallback } from 'react';
import { getServerStats } from 'services/serverStats/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Image, View, ScrollView, ProgressBarAndroid, ActivityIndicator } from 'react-native';
import moment from 'moment';

import CpuTemperature from 'components/CpuTemperature';
import MemUsage from 'components/MemUsage';
import DiskInfo from 'components/DiskInfo';
import Section from 'components/ui/Section';

import { Button, Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Text, Title } from 'native-base';
import ServicesList from 'components/ServicesList';
import { TorrentSummaryCard }from 'components/TorrentInfo';
import AppHeader from 'components/AppHeader';
import { getTorrents } from 'services/torrents/actions';

import SplashScreen from 'react-native-splash-screen'
import Disks from './Disks';


export default function Dashboard({navigation}) {

  useEffect(() => {
    console.log("hiding splash")
    SplashScreen.hide();
  }, [])

  return (
    <Container>
      <AppHeader title="Dashboard" />
      <Content padder>
        <View>
          <Button
            block
            rounded
            onPress={() => {navigation.navigate('Ombi')}}
          >
            <Text>Request Movies/TV</Text>
          </Button>
          <Button
            block
            rounded
            info
            style={{marginTop: 10}}
            onPress={() => {navigation.navigate('Sonarr')}}
          >
            <Text>Manage TV Series</Text>
          </Button>
          <Button
            block
            rounded
            success
            style={{marginTop: 10, marginBottom: 10}}
            onPress={() => {navigation.navigate('Radarr')}}
          >
            <Text>Manage Movies</Text>
          </Button>
        </View>

        <Disks />

        <TorrentSummaryCard />

        <ServerStats />
      </Content>
    </Container>
  );
}