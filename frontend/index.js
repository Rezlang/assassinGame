/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebaseConfig from './firebaseConfig';
import firebase from '@react-native-firebase/app';

AppRegistry.registerComponent(appName, () => App);
firebase.initializeApp(firebaseConfig);