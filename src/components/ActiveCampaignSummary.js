import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ActiveCampaignSummary() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is where you can see summary details of your active campaign. I don't think you can do more than one at a time.</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  },
});
