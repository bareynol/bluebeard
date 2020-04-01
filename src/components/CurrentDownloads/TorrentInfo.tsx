import React from 'react';
import { View } from "react-native"
import {Text, Icon} from 'native-base';
import { prettySize } from "utils/formatters";
import moment from "moment";

export default function TorrentInfo({torrent}) {
  return (
    <View style={{flex: 1}}>
      <Text numberOfLines={1} style={{alignSelf: 'flex-start'}}>{torrent.name}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        {torrent.percentDone === 1 && (
          <>
            <Text note>{`Seeding to ${torrent.peersGettingFromUs} of ${torrent.peersConnected} peers`}</Text>
            <Text note><Icon name="arrow-up" style={{fontSize: 14}} /> {`${prettySize(torrent.rateUpload)}/s`}</Text>
          </>
        )}
        {torrent.percentDone < 1 && (
          <>
            <Text note>{`Downloading from ${torrent.peersGettingFromUs} of ${torrent.peersConnected} peers`}</Text>
            <Text note><Icon name="arrow-down" style={{fontSize: 14}} /> {`${prettySize(torrent.rateUpload)}/s`}</Text>
          </>
        )}
      </View>
      <ProgressBar percentage={torrent.percentDone * 100} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        {torrent.percentDone === 1 && (
          <Text note style={{fontSize: 12}}>{`${prettySize(torrent.totalSize)}, uploaded ${prettySize(torrent.uploadedEver)} (Ratio ${torrent.uploadRatio})`}</Text>
        )}
        {torrent.percentDone < 1 && (
          <Text note style={{fontSize: 12}}>{`${prettySize(torrent.totalSize - torrent.leftUntilDone)} of ${prettySize(torrent.totalSize)} (${torrent.percentDone * 100}%)`}</Text>
        )}
        {torrent.eta < 0 && (
          <Text note style={{fontSize: 12}}>unknown time remaining</Text>
        )}
        {torrent.eta >= 0 && (
          <Text note style={{fontSize: 12}}>{`${moment.duration(torrent.eta, 'seconds').humanize()} remaining`}</Text>
        )}
      </View>
    </View>
  )
}


function ProgressBar(props) {
  return (
    <View style={{width: props.width || "100%", borderColor: 'white', borderWidth: 2, borderRadius: 10, height: 20}}>
      <View style={{backgroundColor: 'white', width: `${props.percentage}%`, height: '100%', borderRadius: 5, justifyContent: 'center'}} />
    </View>
  )
}
