import React from 'react';
import { Card, CardItem, Text, Body, Right, List, ListItem, Grid, Row, Col, Title } from "native-base";
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import TorrentInfo from './TorrentInfo';

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
