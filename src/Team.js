import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Team() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Here you can see the members of your team at a glance, including their current steps and health.</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  },
});
