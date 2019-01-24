import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MorningModal() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is a modal for the morning briefing. Once the night has ended for all players, this modal gets queued up and sends a push. Users pressing the push notification OR simply accessing the app once the night is over will see this modal on app load. It can be dismissed with no action needing to be taken.</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  },
});
