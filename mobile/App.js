import React from 'react';
import {StatusBar, YellowBox} from 'react-native';

import Routes from './src/Routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection'
]);

export default function App() {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
    <Routes/>
    </>
  );
}
