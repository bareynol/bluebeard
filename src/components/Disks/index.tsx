import React, { useCallback } from 'react';
import { Text, Card, CardItem } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableWithoutFeedback, ActivityIndicator, } from 'react-native';
import DiskSummary from './DiskSummary';

import { useNavigation } from '@react-navigation/native';
import { setCMDiskIndex } from 'services/ui/actions';

export default function Disks() {
  const disks = useSelector(state => state.serverStats.stats?.disks);

  return (
    <Card style={{marginBottom: 10}}>
      <CardItem header bordered>
        <Text>Disks</Text>
      </CardItem>
      {disks ? (
        disks.map((d, index) => <DiskItem key={d.label} disk={d} index={index} />)
      ) : (
        <CardItem style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text>Loading disks...</Text>
          <ActivityIndicator />
        </CardItem>
      )}
    </Card>
    
  )
}

function DiskItem({disk, index}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateToDiskInfo = useCallback(() => {
    if (disk.hasMovies || disk.hasTvSeries) {
      dispatch(setCMDiskIndex(index));
      navigation.navigate("ContentManagement");
    }
  }, [dispatch, disk, index, navigation])

  return (
    <CardItem bordered style={{flexDirection: 'column', paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0}}>
      <TouchableWithoutFeedback onPress={navigateToDiskInfo}>
        <View style={{flex: 1}}>
          <DiskSummary disk={disk} fixedToTop={false} />
        </View>
      </TouchableWithoutFeedback>
    </CardItem>
  )
}
