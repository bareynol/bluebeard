import React, { useState } from 'react';
import { ListItem, Picker, List, Left, Text, Right, Radio, Card, CardItem } from 'native-base';
import { Modal, View } from 'react-native';

export default function ListItemPicker({label, selectedValue, options, onValueChange}: ListItemPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <ListItem noIndent onPress={() => setModalVisible(true)} style={{justifyContent: 'space-between'}}>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'center', padding: 10}}>
          <Card>
            <CardItem header bordered><Text>{`Choose ${label}`}</Text></CardItem>
            <List>
              {options.map(o => (
                <ListItem key={o.name} onPress={() => {onValueChange(o.value); setModalVisible(false)}}>
                  <Left><Text>{o.name}</Text></Left>
                  <Right><Radio selected={selectedValue === o.value} onPress={() => {onValueChange(o.value); setModalVisible(false)}} /></Right>
                </ListItem>
              ))}
            </List>
          </Card>
        </View>
      </Modal>
      <Text>{label}</Text>
      <Text note>{options.find( i => i.value === selectedValue)?.name}</Text>
    </ListItem>
  )
}

export interface ListItemPickerProps {
  label: string,
  selectedValue: any,
  options: Array<{name: string, value: any}>,
  onValueChange: Function,
}
