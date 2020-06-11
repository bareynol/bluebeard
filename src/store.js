import AsyncStorage from '@react-native-community/async-storage';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import {apiMiddleware} from 'redux-api-middleware';

import rootReducer from 'services/rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings']       // planned inclusion of app settings
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    {},
    applyMiddleware(apiMiddleware, thunkMiddleware)
  )
  const persistor = persistStore(store);

  return {store, persistor}
}
