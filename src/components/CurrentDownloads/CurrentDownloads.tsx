import React from 'react';
import { Card, CardItem, Text, Body, Right, List, ListItem, Grid, Row, Col, Title, Icon } from "native-base";
import { View, ActivityIndicator, NativeModules, Button } from 'react-native';
import { useSelector } from 'react-redux';
import TorrentInfo from './TorrentInfo';
import { prettySize } from 'utils/formatters';
import { useNavigation } from '@react-navigation/native';

export default function CurrentDownloads(props) {
  const isFetching = useSelector(state => state.torrents?.isFetching)
  const torrents = useSelector(state => state.torrents?.torrents);


  return (
    <Card>
      <CardItem header bordered>
        <Text>Current Downloads</Text>
      </CardItem>
      {!torrents && isFetching && (
        <CardItem>
          <Body style={{alignItems: 'center'}}>
            <ActivityIndicator color="white" size={100} />
            <Title>Loading</Title>
          </Body>
        </CardItem>
      )}
      <List>
        {!torrents && !isFetching && (
          <ListItem>
            <Text>No torrents to display</Text>
          </ListItem>
        )}
        {torrents.map(t => (
          <ListItem key={t.id}>
            <TorrentInfo torrent={t} />
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

function CurrentDownloadsSummary(props) {
  const isFetching = useSelector(state => state.torrents?.isFetching)
  const torrentStats = useSelector(state => state.torrents?.torrentStats);
  const navigator = useNavigation();

  return (
    <Card>
      <CardItem header bordered style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Current Downloads</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text note style={{marginRight: 20}}>
            <Icon name="arrow-down" style={{fontSize: 14}} /> {`${prettySize(torrentStats.downloadSpeed)}/s`}
          </Text>
          <Text note>
            <Icon name="arrow-up" style={{fontSize: 14}} /> {`${prettySize(torrentStats.uploadSpeed)}/s`}
          </Text>
        </View>
      </CardItem>
      {!torrentStats && isFetching && (
        <CardItem>
          <Body style={{alignItems: 'center'}}>
            <ActivityIndicator color="white" size={100} />
            <Title>Loading</Title>
          </Body>
        </CardItem>
      )}
      <CardItem>
        <Body>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text>{`Active Torrents: ${torrentStats?.activeTorrentCount}`}</Text>
            <Text>{`Paused Torrents: ${torrentStats?.pausedTorrentCount}`}</Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Button title="View Details" onPress={() => {navigator.navigate('Transmission (torrents)')}} />
          </View>
        </Body>
      </CardItem>
    </Card>
  )
}

export {CurrentDownloadsSummary};
