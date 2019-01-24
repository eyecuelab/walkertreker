import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is where you can see your profile.  You can see your current steps for the day, your health, your hunger level, and any injuries you have.</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'darkgray'
  },
});
