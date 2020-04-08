
const appLogo = require('images/BrianTV.png');
import React, { useEffect, useCallback } from 'react';
import { getServerStats } from 'services/serverStats/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Image, View, Text, ScrollView, Button, ProgressBarAndroid } from 'react-native';
import moment from 'moment';

import CpuTemperature from 'components/CpuTemperature';
import MemUsage from 'components/MemUsage';
import DiskInfo from 'components/DiskInfo';
import Section from 'components/ui/Section';

import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Text as NativeText } from 'native-base';
import ServicesList from 'components/ServicesList';
import { CurrentDownloadsSummary }from 'components/CurrentDownloads/CurrentDownloads';
import AppHeader from 'components/AppHeader';
import { getTorrents } from 'services/torrents/actions';

import SplashScreen from 'react-native-splash-screen'


export default function ServerStats({navigation}) {
  const isFetchingStats = useSelector(state => state.serverStats.isFetching);
  const stats = useSelector(state => state.serverStats.stats);
  

  useEffect(() => {
    console.log("hiding splash")
    SplashScreen.hide();
  }, [])

  if (!stats) return null;

  const {docker} = stats.services;

  return (
    <Container>
      <AppHeader title="Dashboard" />
      <Content padder>
        

        <View style={{marginVertical: 40}}>
          <Button title="Request Movies" onPress={() => {navigation.navigate('Ombi')}} />
        </View>

        <CurrentDownloadsSummary />

        <View style={{marginTop: 20}}>
          <NativeText>Disks</NativeText>
          <View style={{flexDirection: 'row'}}>
            {stats.hardware.disk.map((d, index) => (
              <DiskInfo
                disk={d}
                key={d.label}
                index={index}
              />
            ))}
          </View>
        </View>

        <View style={{marginTop: 40}}>
          <NativeText>Hardware</NativeText>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'center', flex: 1}}>
              <CpuTemperature temperature={stats.hardware.cpu.temperature} />
              <Text style={{ color: 'white', fontSize: 16}}>CPU Temp.</Text>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <MemUsage memUsed={stats.hardware.mem.percentUsed} />
              <Text style={{color: 'white', fontSize: 16}}>Mem. Usage</Text>
            </View>
            
          </View>
        </View>

        <ServicesList />
        {/* <UptimeDisplay uptime={stats.hardware.uptime} /> */}
      </Content>
    </Container>
  );
}

function UptimeDisplay({uptime}) {
  const duration = moment.duration(uptime, 'seconds');

  return (
    <View style={{marginTop: 32}}>
      <Text>{`Server uptime (~${duration.humanize()}):`}</Text>
      <View style={{marginLeft: 50}}>
        {duration.years() > 0 && <Text>{`${duration.years()}\tyears`}</Text>}
        {duration.months() > 0 && <Text>{`${duration.months()}\tmonths`}</Text>}
        {duration.weeks() > 0 && <Text>{`${duration.weeks()}\tweeks`}</Text>}
        {duration.days() > 0 && <Text>{`${duration.days()}\tdays`}</Text>}
        {duration.hours() > 0 && <Text>{`${duration.hours()}\thours`}</Text>}
        {duration.minutes() > 0 && <Text>{`${duration.minutes()}\tminutes`}</Text>}
        {duration.seconds() > 0 && <Text>{`${duration.seconds()}\tseconds`}</Text>}
      </View>
    </View>
  )
}
