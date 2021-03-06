import React from 'react';
import { useCurrentTheme } from 'theme';
import { StyleSheet, View } from 'react-native';

export default function DiskUsageBar({disk}) {
  const theme = useCurrentTheme();
  const barColor = disk.percentUsed > 85 ? theme.variables.brandDanger :
    disk.percentUsed > 50 ? theme.variables.brandWarning :
    theme.variables.brandPrimary

  return (
    <View style={[styles.diskUsageContainer, {borderColor: barColor}]}>
      <View style={[styles.diskUsage, {backgroundColor: barColor, width: `${disk.percentUsed}%`}]} />
    </View>
  )
}

const styles = StyleSheet.create({
  diskUsageContainer: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    height: 20,
  },
  diskUsage: {
    height: '100%',
    borderRadius: 5,
  }
})
