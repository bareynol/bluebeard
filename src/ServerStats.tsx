
const logo = require('images/BrianTV.png');
import React, { useEffect } from 'react';
import { getServerStats } from 'services/serverStats';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text } from 'react-native';


export default function ServerStats() {
  const isFetching = useSelector(state => state.serverStats.isFetching);
  const stats = useSelector(state => 
    state.serverStats.stats
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServerStats)
  }, []);

  return (
    <View>
      <Text>Server Stats</Text>
      <Text>{JSON.stringify(stats)}</Text>
    </View>
  );
}
