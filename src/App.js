import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Splash from './Splash';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>Welcome to App!</Text>
        <Splash/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
