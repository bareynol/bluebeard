import React from 'react';
import { createSelector } from 'reselect'
import { CardItem, Text, Body, Title, Icon } from "native-base";
import { View, ActivityIndicator,} from 'react-native';
import { useSelector } from 'react-redux';
import { prettySize } from 'utils/formatters';

export default function TorrentSummary(props) {
  const isFetching = useSelector(state => state.torrents?.isFetching)
  const torrentStats = useSelector(state => state.torrents?.torrentStats);
  const torrentSummary = useSelector(getTorrentSummary);

  return (
    <>
      <CardItem header bordered style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap"}}>
        <Text>Torrents</Text>
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
      <CardItem style={{backgroundColor: 'transparent'}} bordered>
        <Body>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap"}}>
            <Text>{`Total Torrents: ${torrentSummary.total}`}</Text>
            {torrentSummary.downloading > 0 && <Text>{`Downloading: ${torrentSummary.downloading}`}</Text>}
            {torrentSummary.seeding > 0 && <Text>{`Seeding: ${torrentSummary.seeding}`}</Text>}
            {torrentSummary.paused > 0 && <Text>{`Paused: ${torrentSummary.paused}`}</Text>}
            {torrentSummary.queued > 0 && <Text>{`Queued: ${torrentSummary.queued}`}</Text>}
            {torrentSummary.other > 0 && <Text>{`Other: ${torrentSummary.other}`}</Text>}
          </View>
        </Body>
      </CardItem>
    </>
  )
}

const getTorrentSummary = createSelector(
  [state => state.torrents?.torrents],
  (torrents) => {
    const torrentSummary = {total: 0, paused: 0, queued: 0, downloading: 0, seeding: 0, other: 0};
    if (!torrents) return torrentSummary;
    for (let i=0; i < torrents.length; i++) {
      torrentSummary.total++;
      switch(torrents[i].status) {
        case 0:
          torrentSummary.paused++;
          break;
        case 3:
          torrentSummary.queued++;
          break;
        case 4:
          torrentSummary.downloading++;
          break;
        case 5:
        case 6:
          torrentSummary.seeding++;
          break;
        default:
          torrentSummary.other++;
      }
    }
    return torrentSummary
  }
)
