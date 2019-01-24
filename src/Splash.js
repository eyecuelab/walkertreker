import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>I am a splash page.</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lime',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'fuchsia'
  },
});
