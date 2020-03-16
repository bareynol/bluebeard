import React from 'react';
import { View, Text } from 'react-native';
import DiskUsageChart from './DiskUsageChart';

export default function DiskInfo({disk, index=0}) {
  return (
    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
      {isEven(index) && (
        <DiskInfoLabel name={disk.label} used={disk.used} size={disk.size} />
      )}
      <DiskUsageChart
        key={disk.label}
        percentage={disk.percentUsed}
        valueLabel={`${disk.percentUsed}%`}
        width={100}
      />
      {!isEven(index) && (
        <DiskInfoLabel name={disk.label} used={disk.used} size={disk.size} style={{alignItems: 'flex-end'}} />
      )}
    </View>
  )
}

function DiskInfoLabel({name, used, size, style}) {
  return (
    <View style={[style]}>
      <Text style={{fontSize: 18, color: 'white'}}>{name}</Text>
      <Text style={{fontSize: 14, color: 'white'}}>{used}</Text>
      <Text style={{fontSize: 14, color: 'white', borderTopColor: 'white', borderTopWidth: 2 }}>{size}</Text>
    </View>
  )
}

function isEven(num: number) {
  return (num & 1) == 0;
}