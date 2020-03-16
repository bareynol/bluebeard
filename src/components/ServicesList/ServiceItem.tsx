import { ListItem, Left, Thumbnail, Text, Body, Right } from "native-base";
import React from "react";
import moment from "moment";
import { View } from "react-native";

export default function ServiceItem({logo, service, title}: Props){
  return (
    <ListItem avatar>
      <Left>
        {logo ? <Thumbnail source={logo} /> : <View style={{width: 56, height: 56}}></View> }
      </Left>
      <Body>
        <Text>{title}</Text>
        <Text note>{`Status: ${service.running ? 'Up' : 'Down'}`}</Text>
      </Body>
      <Right>
        <Text note>{
          service.running ? (
            `Uptime: ${moment.duration(service.uptime, 'seconds').humanize()}`
          ): (
            `Downtime: ${moment.duration(service.downtime, 'seconds').humanize()}`
          )
        }</Text>
      </Right>
    </ListItem>
  )
}

export interface Props {
  logo?: any;
  service: any;
  title: string;
}
