import React from 'react';
import { Card, CardItem, Text, Body, List, ListItem, Button,} from "native-base";
import { View } from 'react-native';
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
    <Card style={{marginTop: 10, marginBottom: 10}}>
      <TorrentSummary />
      <CardItem>
        <Body>
          <View style={{alignSelf: 'center'}}>
            <Button primary rounded small onPress={() => {navigator.navigate('Transmission')}}>
              <Text>View Details</Text>
            </Button>
          </View>
        </Body>
      </CardItem>
    </Card>
  )
}

export {TorrentSummaryCard};
