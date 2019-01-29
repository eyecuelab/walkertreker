import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NewCampaignPartyView() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Campaign party view goes here.</Text>
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
