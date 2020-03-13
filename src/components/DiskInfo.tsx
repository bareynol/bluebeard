import React from 'react';
import { View, Text } from 'react-native';
import DiskUsageChart from './DiskUsageChart';

export default function DiskInfo({disk}) {
  return (
    <View style={{flexDirection: 'row', width: '50%'}}>
      <DiskUsageChart
        key={disk.label}
        percentage={disk.percentUsed}
        valueLabel={`${disk.percentUsed}%`}
        width={100}
      />
      <View>
        <Text style={{fontSize: 18, color: 'white'}}>{disk.label}</Text>
        <Text style={{fontSize: 14, color: 'white'}}>{`Used: ${disk.used}`}</Text>
        <Text style={{fontSize: 14, color: 'white'}}>{`Total: ${disk.size}`}</Text>
      </View>
    </View>
  )
}
