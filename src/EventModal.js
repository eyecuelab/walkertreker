import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EventModal() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is a modal for events. Users will see this modal either from pressing a push notification, or from accessing the app during the event window (the ten minutes or however long an event lasts). Once you are here there are only two ways to access the rest of the app: 1) take action (vote), or 2) the event window expires. Otherwise the modal is non-dismissable.</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  },
});
