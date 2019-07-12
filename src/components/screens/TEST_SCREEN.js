import React, { Component } from 'react';
import { Text } from 'react-native';
import ToggleContainer from './ToggleContainer'; 
export default class TestScreen extends Component {
  render() {
    return (
      <ToggleContainer> 
      
        <Text>Text in TEST SCREEN</Text>
        <Text>Text in TEST SCREEN</Text>
        <Text>Text in TEST SCREEN</Text>

      </ToggleContainer>
    );
  }
}

