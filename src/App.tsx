/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { PersistGate } from 'redux-persist/es/integration/react';

import ServerStats from 'ServerStats';


import configureStore from './store';
export const {store, persistor} = configureStore()

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ServerStats />
      </PersistGate>
    </StoreProvider>
  )
};

// for firebase later
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);