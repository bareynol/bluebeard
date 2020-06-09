import React, { useCallback } from 'react';
import { Text, Card, CardItem } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableWithoutFeedback, } from 'react-native';
import DiskHeader from './DiskHeader';

import { useNavigation } from '@react-navigation/native';
import { setCMDiskIndex } from 'services/ui/actions';

export default function Disks() {
  const disks = useSelector(state => state.serverStats.stats?.hardware.disks);

  if (!disks) {
    return (
      <View>
        <Text>No items to display</Text>
      </View>
    )
  }

  return (
    <Card>
      <CardItem header bordered>
        <Text>Disks</Text>
      </CardItem>
      {disks.map((d, index) => <DiskItem key={d.label} disk={d} index={index} />)}
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
          <DiskHeader disk={disk} showIcon={true} />
        </View>
      </TouchableWithoutFeedback>
    </CardItem>
  )
}
