
const logo = require('images/BrianTV.png');
import React, { useEffect, useCallback } from 'react';
import { getServerStats } from 'services/serverStats/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Image, View, Text, ScrollView, Button, ProgressBarAndroid } from 'react-native';
import moment from 'moment';

import CpuTemperature from 'components/CpuTemperature';
import MemUsage from 'components/MemUsage';
import DiskInfo from 'components/DiskInfo';
import Section from 'components/ui/Section';



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

        <Image source={logo} style={{width: '50%', height: 200, alignSelf: 'center'}} resizeMode="contain" />

        <View>
          <Button title="Request Movies" onPress={() => {}} />
        </View>

        <Section label="">
          <View style={{flexDirection: 'row'}}>
            {stats.hardware.disk.map(d => (
              <DiskInfo
                disk={d}
                key={d.label}
              />
            ))}
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', width: '50%'}}>
              <CpuTemperature temperature={stats.hardware.cpu.temperature} />
              <Text style={{ color: 'white', fontSize: 16}}>CPU Temp.</Text>
            </View>
            <View style={{justifyContent: 'center', width: '50%'}}>
              <MemUsage memUsed={stats.hardware.mem.percentUsed} />
              <Text style={{color: 'white', fontSize: 16}}>Mem. Usage</Text>
            </View>
            
          </View>
        </Section>

        <Section label="Current Downloads">
          <ProgressBar width="75%" />
          <ProgressBar width="75%" />
        </Section>

        <Section label="Services">
          <View>

          </View>
        </Section>

        <UptimeDisplay uptime={stats.hardware.uptime} />
      </ScrollView>
    </View>
  );
}

function ServiceInfo({service, serviceTitle}) {
  return (
    <View>
      <Text style={{color: "white", fontSize: 18}}>{serviceTitle}</Text>
    </View>
  )
}

function ProgressBar(props) {
  return (
    <View style={{width: props.width || "100%", borderColor: 'white', borderWidth: 2, borderRadius: 10, height: 30}}>
      <View style={{backgroundColor: 'white', width: '75%', height: '100%', borderRadius: 5}}></View>
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
