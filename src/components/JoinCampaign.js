import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function JoinCampaign() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Join a campaign from this screen!  Maybe this is where you paste an invite link?</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'maroon',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  },
});
