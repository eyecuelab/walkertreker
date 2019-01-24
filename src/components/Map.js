import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Map() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is a map where you can see how far you've traveled. Maybe you can press on a safehouse location to see what you did there?</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'green'
  },
});
