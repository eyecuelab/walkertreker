import React from 'react';
import { Text, View } from 'react-native';

export default function DateShower(props) {

    return (
      <View>
        <Text>day = {props.day}</Text>
        <Text>start = {props.start}</Text>
        <Text>end = {props.end}</Text>
        <Text>steps = {props.steps}</Text>
        <Text>===========================</Text>
      </View>
    );

}
