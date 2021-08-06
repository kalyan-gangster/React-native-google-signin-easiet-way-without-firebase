import React from 'react';
import { View } from 'react-native';
import GoogleLogin from './components/GoogleLogin';

export default function App() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <GoogleLogin />
    </View>
  );
}
