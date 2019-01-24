import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CreateCampaign() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Create your campaign here.</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'fuchsia'
  },
});
