import React from 'react';
import { Card, CardItem, Text, Body, Right, List, ListItem, Grid, Row, Col } from "native-base";
import { View } from 'react-native';

export default function CurrentDownloads(props) {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Current Downloads</Text>
      </CardItem>
      <List>
        <ListItem>
          <DownloadItem
            title="One Piece Episode 906"
            percentage={75}
            timeRemaining="5 mins"
          />
        </ListItem>
        <ListItem>
          <DownloadItem
            title="One Piece Episode 907"
            percentage={33}
            timeRemaining="22 mins"
          />
          
        </ListItem>
        <ListItem>
          <DownloadItem
            title="One Piece Episode 905"
            percentage={25}
            timeRemaining="15 mins"
          />
        </ListItem>
      </List>
    </Card>
  )
}

function DownloadItem(props) {
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{props.title}</Text>
        <Text note>{props.timeRemaining}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{width: '75%'}}>
          <ProgressBar percentage={props.percentage} />
        </View>
        <View><Text>{`${props.percentage}%`}</Text></View>
      </View>
    </View>
  )
}


function ProgressBar(props) {
  return (
    <View style={{width: props.width || "100%", borderColor: 'white', borderWidth: 2, borderRadius: 10, height: 30}}>
      <View style={{backgroundColor: 'white', width: `${props.percentage}%`, height: '100%', borderRadius: 5, justifyContent: 'center'}} />
    </View>
  )
}
