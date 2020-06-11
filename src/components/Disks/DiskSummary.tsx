import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'native-base';
import DiskUsageBar from './DiskUsageBar';
import { prettySize } from 'utils/formatters';
import theme from 'theme';

export default function DiskSummary({disk, fixedToTop=false}: DiskSummaryProps) {

  return (
    <View style={[styles.header, fixedToTop ? styles.fixedHeader : {}]}>
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
      <Icon
        style={{ fontSize: 18, textAlign: 'right'}}
        name={(!fixedToTop && (disk.hasTvSeries || disk.hasMovies)) ?
          "ios-arrow-forward" : undefined
        }
      />
    </View>
  )
}

export interface DiskSummaryProps {
  disk: any,
  fixedToTop?: boolean,
} 

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fixedHeader: {
    borderRadius: theme.variables.cardBorderRadius,
    borderColor: theme.variables.cardBorderColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3
  }
});
