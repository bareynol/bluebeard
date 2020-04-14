import React from 'react';
import { Card, CardItem, Text, Body, List, ListItem,} from "native-base";
import { View, Button } from 'react-native';
import { useSelector } from 'react-redux';
import TorrentItemInfo from './TorrentItemInfo';
import { useNavigation } from '@react-navigation/native';
import TorrentSummary from './TorrentSummary';

export default function TorrentInfo(props) {
  const isFetching = useSelector(state => state.torrents?.isFetching)
  const torrents = useSelector(state => state.torrents?.torrents);

  return (
    <Card>
      <TorrentSummary />
      <List>
        {!torrents && !isFetching && (
          <ListItem>
            <Text>No torrents to display</Text>
          </ListItem>
        )}
        {torrents.map(t => (
          <ListItem key={t.id}>
            <TorrentItemInfo torrent={t} />
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

function TorrentSummaryCard(props) {
  const navigator = useNavigation();

  return (
    <Card>
      <TorrentSummary />
      <CardItem>
        <Body>
          <View style={{alignSelf: 'center'}}>
            <Button title="View Details" onPress={() => {navigator.navigate('Transmission')}} />
          </View>
        </Body>
      </CardItem>
    </Card>
  )
}

export {TorrentSummaryCard};
