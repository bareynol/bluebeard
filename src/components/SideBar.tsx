import React from 'react';
import { Text } from 'native-base';
import { Image, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const logo = require('images/BrianTV.png');

export default function SideBar(props) {
  return (
    <LinearGradient colors={['#0c1121', '#09163c', '#203064']} style={{height: '100%', flex: 1}}>
      <DrawerContentScrollView {...props}>
        <Image
          square
          style={{height: 200, width: '50%', alignSelf: 'center'}}
          source={logo}
          resizeMode="contain"
        />
        {props.state.routes.map((route, i) => <SideBarItem key={route.key} {...props} route={route} i={i} />)}
      </DrawerContentScrollView>
    </LinearGradient>
  )
}

function SideBarItem({state, navigation, descriptors, route, i}) {
  const focused = i === state.index;
  const { title, drawerLabel, drawerIcon, serviceName } = descriptors[route.key].options;

  const label = (
    drawerLabel !== undefined
      ? drawerLabel
      : title !== undefined
      ? title
      : route.name
  )

  return (
    <DrawerItem
      key={route.key}
      label={({focused, color}) => <SideBarItemLabel focused={focused} color={color} label={label} serviceName={serviceName} />}
      icon={drawerIcon}
      focused={focused}
      activeTintColor="#298fff"
      inactiveTintColor="#007aff"
      onPress={() => {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate(route.name)),
          target: state.key,
        });
      }}
    />
  )
}

function SideBarItemLabel({focused, color, label, serviceName=""}) {
  const service = useSelector(state => state.serverStats.stats?.services?.docker?.[serviceName]);

  return (
    <View style={{}}>
      <Text style={{color}}>{label}</Text>
      {service && !service.running && (
        <Text note style={{color: 'red'}}>Down</Text>
      )}
    </View>
  )
}
