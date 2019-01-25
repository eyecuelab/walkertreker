import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Inventory() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is a place where you can see the shared inventory for your team. That includes food, medicine, and weapons.</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkorange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'skyblue'
  },
});
