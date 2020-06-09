import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'native-base';
import DiskUsageBar from './DiskUsageBar';
import { prettySize } from 'utils/formatters';

export default function DiskHeader({disk, showIcon}) {

  return (
    <View style={{width: '100%', flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flexGrow: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{disk.label}</Text>
          <Text>{`${Math.round(disk.percentUsed)}%`}</Text>
        </View>
        <DiskUsageBar disk={disk} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text note>{`Free: ${prettySize(disk.size - disk.used)}`}</Text>
          <Text note>{`Total: ${prettySize(disk.size)}`}</Text>
        </View>
      </View>
      {(showIcon && (disk.hasTvSeries || disk.hasMovies)) ? (
        <Icon
          style={{ fontSize: 18, textAlign: 'right'}}
          name="ios-arrow-forward"
        />
      ) : null}
    </View>
  )
}