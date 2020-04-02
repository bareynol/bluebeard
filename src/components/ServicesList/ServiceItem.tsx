
import React from "react";
import moment from "moment";

import { ListItem, Left, Thumbnail, Text, Body, Right } from "native-base";
import { View } from "react-native";

export default function ServiceItem({logo, service, title}: Props){
  return (
    <ListItem avatar>
      <Left>
        {logo ? <Thumbnail square small source={logo} /> : <View style={{width: 36, height: 36}}></View> }
      </Left>
      <Body style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text>{title}</Text>
          <Text note>{`Status: ${service.running ? 'Up' : 'Down'}`}</Text>
        </View>
        <View>
          <Text note>{
            service.running ? (
              `Uptime: ${moment.duration(service.uptime, 'seconds').humanize()}`
            ): (
              `Downtime: ${moment.duration(service.downtime, 'seconds').humanize()}`
            )
          }</Text>
        </View>
      </Body>
    </ListItem>
  )
}

export interface Props {
  logo?: any;
  service: any;
  title: string;
}
