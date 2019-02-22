import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WaitForStart() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>WAIT FOR START SCREEN</Text>
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
    fontFamily: 'gore',
    color: 'green'
  },
});
