import ServerStats from './ServerStats';

import React, { useEffect, useCallback } from 'react';
import { getServerStats } from 'services/serverStats/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Image, View, Text, ScrollView, Button, ProgressBarAndroid, ActivityIndicator } from 'react-native';
import moment from 'moment';

import CpuTemperature from 'components/CpuTemperature';
import MemUsage from 'components/MemUsage';
import DiskInfo from 'components/DiskInfo';
import Section from 'components/ui/Section';

import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Text as NativeText, Title } from 'native-base';
import ServicesList from 'components/ServicesList';
import { TorrentSummaryCard }from 'components/TorrentInfo';
import AppHeader from 'components/AppHeader';
import { getTorrents } from 'services/torrents/actions';

import SplashScreen from 'react-native-splash-screen'


export default function Dashboard({navigation}) {

  useEffect(() => {
    console.log("hiding splash")
    SplashScreen.hide();
  }, [])

  return (
    <Container>
      <AppHeader title="Dashboard" />
      <Content padder>
        <View style={{marginVertical: 40}}>
          <Button title="Request Movies" onPress={() => {navigation.navigate('Ombi')}} />
        </View>

        <TorrentSummaryCard />

        <ServerStats />
      </Content>
    </Container>
  );
}