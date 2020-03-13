
const logo = require('images/BrianTV.png');
import React, { useEffect, useCallback } from 'react';
import { getServerStats } from 'services/serverStats/actions';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import moment from 'moment';

import CpuTemperature from 'components/CpuTemperature';
import MemUsage from 'components/MemUsage';
import DiskUsage from 'components/DiskUsage';


export default function ServerStats() {
  const isFetching = useSelector(state => state.serverStats.isFetching);
  const stats = useSelector(state => state.serverStats.stats);

  const dispatch = useDispatch();

  const getStats = useCallback(() => dispatch(getServerStats), [dispatch]);

  useEffect(() => {
    getStats();
  }, []);

  if (!stats) return null;

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text>Server Stats</Text>
        <CpuTemperature temperature={stats.hardware.cpu.temperature} />
        {stats.hardware.disk.map(d => (
          <DiskUsage
            key={d.label}
            percentage={d.percentUsed}
            valueLabel={`${d.percentUsed}%`}
            label={`${d.label} ${d.size}`}
            width="30%"
          />
        ))}
        <MemUsage memUsed={stats.hardware.mem.percentUsed} />
        <UptimeDisplay uptime={stats.hardware.uptime} />
        <CPUDisplay temperature={stats.hardware.cpu.temperature} />
        <DiskDisplay disks={stats.hardware.disk} />
      </ScrollView>
    </View>
  );
}

function CPUDisplay({temperature}) {
  return (
    <View style={{marginTop: 32, flexDirection: 'row'}}>
      <Text>CPU Temperature:</Text>
      <Text>{` ${temperature} °C`}</Text>
    </View>
  )
}

function DiskDisplay({disks}) {
  return (
    <View style={{marginTop: 32}}>
      <Text>Disks</Text>
      {disks.map(disk => (
        <View key={disk.label} style={{flexDirection: 'row', justifyContent: "space-between"}}>
          <Text>{disk.label}</Text>
          <Text>{`${disk.used}/${disk.size}`}</Text>
          <Text>{`${disk.percentUsed}%`}</Text>
        </View>
      ))}
    </View>
  )
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
