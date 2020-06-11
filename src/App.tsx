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

import configureStore from './store';
import {useCurrentTheme} from 'theme';


import AppRouter from './AppRouter';

import { StyleProvider } from 'native-base';

export const {store, persistor} = configureStore()

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <CustomStyleProvider>
          <AppRouter />
        </CustomStyleProvider>
      </PersistGate>
    </StoreProvider>
  )
};

function CustomStyleProvider({children}) {
  const theme = useCurrentTheme();
  
  return (
    <StyleProvider style={theme}>
      {children}
    </StyleProvider>
  )
}

// for firebase later
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
