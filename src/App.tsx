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

import ServerStats from 'pages/ServerStats';


import configureStore from './store';
import Background from 'components/ui/Background';

export const {store, persistor} = configureStore()

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Background>
          <ServerStats />
        </Background>
      </PersistGate>
    </StoreProvider>
  )
};

// for firebase later
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);