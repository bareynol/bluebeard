import React from 'react';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import moment from 'moment';

import CpuTemperature from 'components/CpuTemperature';
import MemUsage from 'components/MemUsage';

import { Text, Title } from 'native-base';
import ServicesList from 'components/ServicesList';


export default function ServerStats() {
  const isFetchingStats = useSelector(state => state.serverStats.isFetching);
  const cpu = useSelector(state => state.serverStats.stats?.cpu);
  const mem = useSelector(state => state.serverStats.stats?.mem);
  const statsError = useSelector(state => state.serverStats.error);

  // if (!stats && isFetchingStats) {
  //   return (
  //     <View  style={{alignItems: 'center'}}>
  //       <ActivityIndicator color="white" size={100} />
  //       <Title>Loading Server Stats...</Title>
  //     </View>
  //   )
  // } else if ((!stats && !isFetchingStats) || statsError) {
  //   return (
  //     <View style={{alignItems: 'center'}}>
  //       <Title>Error Loading Server Stats</Title>
  //       <Title style={{color: 'red', fontSize: 30}}>¯\_(ツ)_/¯</Title>
  //     </View>
  //   )
  // } else {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{alignItems: 'center', flex: 1}}>
        <CpuTemperature temperature={cpu?.temperature || 0} />
        <Text>CPU Temp.</Text>
      </View>
      <View style={{alignItems: 'center', flex: 1}}>
        <MemUsage memUsed={mem?.percentUsed || 0} />
        <Text>Mem. Usage</Text>
      </View>
      
    </View>
  );
  // }
}

/* <UptimeDisplay uptime={stats.hardware.uptime} /> */

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
