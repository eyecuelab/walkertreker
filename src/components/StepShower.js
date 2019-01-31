import React from 'react';
import { Text, View } from 'react-native';

export default function StepShower(props) {

    return (
      <View style={{paddingTop: 15}}>
        <Text>{props.steps} steps taken on {props.start.toString().substring(0, 10)} (day {props.day})</Text>
        <Text>================================</Text>
      </View>
    );

}
