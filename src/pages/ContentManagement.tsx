import React, { useCallback } from 'react';
import { Container, Text, Accordion, Icon, Button, } from 'native-base';
import AppHeader from 'components/AppHeader';
import { useSelector, useDispatch } from 'react-redux';
import { View, Alert } from 'react-native';
import { prettySize } from 'utils/formatters';
import DiskSummary from 'components/Disks/DiskSummary';

import theme from 'theme';
import { deleteTvSeries, deleteMovie } from 'services/serverStats';

export default function ContentManagement() {
  const dispatch = useDispatch()
  const diskIndex = useSelector(state => state.ui.contentManagementDiskIndex)
  const disk = useSelector(state => state.serverStats.stats?.disks?.[diskIndex]);

  function confirmDelete(contentId: number, contentTitle: string): any {
    Alert.alert(
      "Warning: About to delete files",
      `Are you sure you would like to delete ${contentTitle}?`,

      [
        {
          text: "Cancel",
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: "Yes",
          onPress: () => handleDeleteItem(contentId),
        }
      ]
    );
  }

  const handleDeleteItem = useCallback((contentId) => {
    if (disk.hasTvSeries) {
      return dispatch(deleteTvSeries(contentId));
    } else {
      return dispatch(deleteMovie(contentId));
    }
  }, [dispatch, disk.hasTvSeries])

  return (
    <Container>
      <AppHeader title={disk ? disk.label : "Content"} useBackButton={true} />
      <DiskSummary disk={disk} fixedToTop={true} />
      {!disk ? (
        <View><Text>No content to display</Text></View>
      ) : (
        <Accordion
          dataArray={disk.data}
          renderHeader={(content, expanded) => ContentItem(content, expanded, disk.hasTvSeries, confirmDelete)}
          renderContent={disk.hasTvSeries? SeasonData : () => (<></>)}
          contentStyle={disk.hasMovies ? {padding: 0} : {}}
        />
      )}
    </Container>
  )
}

function ContentItem(content, expanded, hasTvSeries, onDelete) {

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderTopWidth: 2, borderTopColor: theme.variables.accordionBorderColor}}>
      {hasTvSeries ? (
        <View style={{width: 20}}>
          <Icon style={{fontSize: 18}} name={expanded ? 'ios-arrow-down' : 'ios-arrow-forward'} />
        </View>
      ) : null }
      <View style={{flexGrow: 1, maxWidth: '80%'}}>
        <Text numberOfLines={1} ellipsizeMode="tail">{content.title}</Text>
        <Text note>{prettySize(content.sizeOnDisk)}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button danger transparent style={{paddingRight: 10}} onPress={() => onDelete(content.id, content.title)}>
          <Icon
            style={{ fontSize: 18, textAlign: 'right'}}
            name="md-trash"
          />
        </Button>
        
      </View>
    </View>
  )
}

function SeasonData(content) {
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