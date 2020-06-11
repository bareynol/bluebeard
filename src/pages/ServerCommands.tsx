import React, { useCallback } from 'react';
import { View, Alert } from 'react-native';
import AppHeader from 'components/AppHeader';
import { Container, List, ListItem, Text, Left, Body, Right, Icon } from 'native-base';
import { useDispatch } from 'react-redux';
import { restartServer, updateDockerServices, updateServerPackages, restartDockerServices } from 'services/serverStats';

export default function ServerCommands() {

  const dispatch = useDispatch();

  const serverCommands = [
    {title: "Restart Server", onPress: () => dispatch(restartServer)},
    {title: "Restart Docker Services", onPress: () => dispatch(restartDockerServices())},
    {title: "Update Docker Services", subtitle: "Stops, re-pulls, and starts all services", onPress: () => dispatch(updateDockerServices())},
    {title: "Update OS packages", subtitle: "apt update && apt upgrade", onPress: () => dispatch(updateServerPackages)},
  ]

  return (
    <Container>
      <AppHeader title="Server Commands" useBackButton={true} />
      <List dataArray={serverCommands} keyExtractor={item => item.title} renderRow={(commandConfig) => (
        <Command key={commandConfig.title} {...commandConfig} />
        
      )} />

    </Container>
  )
}

function Command({title, subtitle, onPress}) {

  const commandPressed = useCallback(() => {
    Alert.alert(
      `${title}?`,
      "",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: "OK",
          onPress: onPress,
        }
      ]
    )
  }, [title, onPress])

  return (
    <ListItem onPress={commandPressed}>
      <View>
        <Text style={{alignSelf: 'flex-start'}}>{title}</Text>
        {subtitle ? (
          <Text note style={{alignSelf: 'flex-start'}}>{subtitle}</Text>
        ) : null}
      </View>
    </ListItem>
  )
}