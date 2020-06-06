import React from 'react';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import moment from 'moment';

import CpuTemperature from 'components/CpuTemperature';
import MemUsage from 'components/MemUsage';
import DiskInfo from 'components/DiskInfo';

import { Text, Title } from 'native-base';
import ServicesList from 'components/ServicesList';


export default function ServerStats() {
  const isFetchingStats = useSelector(state => state.serverStats.isFetching);
  const stats = useSelector(state => state.serverStats.stats);
  const statsError = useSelector(state => state.serverStats.error);

  if (!stats && isFetchingStats) {
    return (
      <View  style={{alignItems: 'center'}}>
        <ActivityIndicator color="white" size={100} />
        <Title>Loading Server Stats...</Title>
      </View>
    )
  } else if ((!stats && !isFetchingStats) || statsError) {
    return (
      <View style={{alignItems: 'center'}}>
        <Title>Error Loading Server Stats</Title>
        <Title style={{color: 'red', fontSize: 30}}>¯\_(ツ)_/¯</Title>
      </View>
    )
  } else {
    return (
      <>
        {/* <View>
          <Text>Disks</Text>
          <View style={{flexDirection: 'row'}}>
            {stats.hardware.disk.map((d, index) => (
              <DiskInfo
                disk={d}
                key={d.label}
                index={index}
              />
            ))}
          </View>
        </View> */}

        <View style={{marginTop: 40}}>
          <Text>Hardware</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'center', flex: 1}}>
              <CpuTemperature temperature={stats.hardware.cpu.temperature} />
              <Text>CPU Temp.</Text>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <MemUsage memUsed={stats.hardware.mem.percentUsed} />
              <Text>Mem. Usage</Text>
            </View>
            
          </View>
        </View>

        <ServicesList />
        {/* <UptimeDisplay uptime={stats.hardware.uptime} /> */}
      </>
    );
  }
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
