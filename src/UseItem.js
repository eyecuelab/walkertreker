import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UseItem() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is the screen where you can use an item on a person in your group... or maybe just on yourself.  But this same screen can handle both food and medicine, depending on which one brought you here. That can get passed in as props.</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'hotpink'
  },
});
