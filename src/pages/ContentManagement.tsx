import React, { useEffect } from 'react';
import { Container, Text, Accordion, Left, Icon, Body, Right, Button } from 'native-base';
import AppHeader from 'components/AppHeader';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { prettySize } from 'utils/formatters';
import DiskHeader from './Dashboard/Disks/DiskHeader';

import theme from 'theme';

export default function ContentManagement(/*{disk}*/) {
  const diskIndex = useSelector(state => state.ui.contentManagementDiskIndex)
  const disk = useSelector(state => state.serverStats.stats?.hardware.disks[diskIndex]);

  return (
    <Container>
      <AppHeader title={disk ? disk.label : "Content"} />
      <DiskHeader disk={disk} expanded={false} />
      {!disk ? (
        <View><Text>No content to display</Text></View>
      ) : (
        <Accordion
          dataArray={disk.data}
          renderHeader={(content, expanded) => ContentHeader(content, expanded, disk.hasTvSeries)}
          renderContent={disk.hasTvSeries? ContentBody : () => (<></>)}
          contentStyle={disk.hasMovies ? {padding: 0} : {}}
        />
      )}
    </Container>
  )
}

function ContentHeader(content, expanded, hasTvSeries) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
      <View style={{flexShrink: 1}}>
        <Text numberOfLines={1} ellipsizeMode="tail">{content.title}</Text>
        <Text note>{prettySize(content.sizeOnDisk)}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button danger transparent style={{paddingRight: 10}} onPress={() => console.log('delete')}>
          <Icon
            style={{ fontSize: 18, textAlign: 'right'}}
            name="md-trash"
          />
        </Button>
        {hasTvSeries ? (
          <Icon style={{fontSize: 18}} name={expanded ? 'ios-arrow-down' : 'ios-arrow-forward'} />
        ) : null }
      </View>
    </View>
  )
}

function ContentBody(content) {
  return (
    <View style={{paddingHorizontal: 20, backgroundColor: theme.variables.brandPrimary}}>
      {content.seasons.filter(season => season.statistics.sizeOnDisk > 0).map(season => (
        <View key={`${content.id}-${season.seasonNumber}`} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text note style={{color: theme.variables.inverseTextColor}}>{`Season ${season.seasonNumber}`}</Text>
          <Text note style={{color: theme.variables.inverseTextColor}}>{prettySize(season.statistics.sizeOnDisk)}</Text>
        </View>
      ))}
    </View>
  )
}