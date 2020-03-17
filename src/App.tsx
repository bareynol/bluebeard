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

import configureStore from './store';

import getTheme from '../native-base-theme/components';
import customTheme from '../native-base-theme/variables/customTheme';

import AppRouter from './AppRouter';

import Background from 'components/ui/Background';
import ServerStats from 'pages/ServerStats';
import { StyleProvider } from 'native-base';

export const {store, persistor} = configureStore()

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StyleProvider style={getTheme(customTheme)}>
          <AppRouter />
        </StyleProvider>
      </PersistGate>
    </StoreProvider>
  )
};

// for firebase later
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);