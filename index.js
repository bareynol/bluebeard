/**
 * @format
 */
// instructed by react-navigation (v5.x) to put this line at the very top of the app entry file
import 'react-native-gesture-handler';


import {AppRegistry} from 'react-native';
// import App from './App';
import App from "./src/App";
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
