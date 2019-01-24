import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NewCampaignSummary() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Here is the summary of your new campaign. You'll probably be able to invite people who are already registered here, and maybe copy/share an invite link to your friends... Who knows???</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'wheat',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'fuchsia'
  },
});
